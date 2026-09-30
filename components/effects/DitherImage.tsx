"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { log } from "@/lib/log";
import { cn } from "@/lib/utils";
import { coverTransform, DitherRenderer, type DitherTone, parseHexColor } from "./DitherShader";
import { getPointer, getPointerTarget, subscribePointer } from "./pointer";

export type LensPoint = { x: number; y: number } | null;

type DitherImageProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Above the fold: load eagerly and start WebGL immediately. */
  priority?: boolean;
  /** Same semantics as CSS object-position, 0..1 on each axis. */
  focusX?: number;
  focusY?: number;
  /** Size of one dither dot in CSS px. */
  pixelSize?: number;
  lensEnabled?: boolean;
  /** Lens radius in CSS px on wide images; narrow images get a proportionally smaller lens. */
  lensRadius?: number;
  ditherStrength?: number;
  /** Tone curve: "photo" for portraits, "interface" for UI screenshots. */
  tone?: DitherTone;
  foreground?: string;
  background?: string;
  className?: string;
  /** Show the original image in full (controlled). Works with keyboard, touch and fallback. */
  revealed?: boolean;
  /** Lens centre in source-photo pixels, or null when the lens is closed. */
  onLensMove?: (point: LensPoint) => void;
};

const REVEAL_MS = 1100;
const TOUCH_HOLD_MS = 700;
// Off-screen images create their WebGL context shortly before they scroll into view,
// so only the canvases near the viewport ever exist.
const LAZY_INIT_MARGIN = "600px 0px";

// WebGL setup (context, shader compile, texture upload) is the heaviest thing this page
// does. Running it when the main thread is idle keeps it out of hydration and away from
// the first user input; the print-in animation hides the short delay.
function whenIdle(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, 1);
  });
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => reject(new Error("image-load-failed")), { once: true });
  });
}

export function DitherImage({
  src,
  alt,
  sizes,
  priority = false,
  focusX = 0.5,
  focusY = 0.5,
  pixelSize = 2,
  lensEnabled = true,
  lensRadius = 88,
  ditherStrength = 1,
  tone = "photo",
  foreground = "#e8e5dc",
  background = "#0b0b0a",
  className,
  revealed = false,
  onLensMove,
}: DitherImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  // Latest callback without re-creating the WebGL context when the parent re-renders.
  const onLensMoveRef = useRef(onLensMove);
  useEffect(() => {
    onLensMoveRef.current = onLensMove;
  }, [onLensMove]);

  // `revealed` is read by the render loop through a ref, so toggling it animates the
  // reveal without tearing down the WebGL context.
  const revealedRef = useRef(revealed);
  const scheduleRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    revealedRef.current = revealed;
    scheduleRef.current?.();
  }, [revealed]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!root || !canvas || !image) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: DitherRenderer | null = null;
    let disposed = false;
    let initStarted = false;
    let raf = 0;
    let previous = 0;
    let touchTimer = 0;
    let lastReadout = "";

    // Everything per-frame lives here, outside React state.
    const state = {
      width: 0,
      height: 0,
      visible: false,
      lensX: 0,
      lensY: 0,
      lensRadius: 0,
      iris: 0,
      hover: 0,
      revealStart: -1,
      touch: { active: false, x: 0, y: 0 },
    };

    const fallback = (reason: string, detail: Record<string, unknown> = {}) => {
      log("warn", "DitherImage", "fallback", { reason, src: src.src, ...detail });
      root.dataset.fallback = "true";
      renderer?.dispose();
      renderer = null;
    };

    const maxLensRadius = () => Math.min(lensRadius, state.width * 0.22);

    const reportLens = (open: boolean) => {
      const callback = onLensMoveRef.current;
      if (!callback) return;
      if (!open) {
        if (lastReadout !== "") {
          lastReadout = "";
          callback(null);
        }
        return;
      }
      // Report in the original photo's pixels (src.width/height), not the resized variant
      // next/image served, so the numbers don't change with screen size or DPR.
      const cover = coverTransform(state.width, state.height, src.width, src.height, { x: focusX, y: focusY });
      const x = Math.round((cover.offsetX + (state.lensX / state.width) * cover.scaleX) * src.width);
      const y = Math.round((cover.offsetY + (state.lensY / state.height) * cover.scaleY) * src.height);
      const key = `${x},${y}`;
      if (key !== lastReadout) {
        lastReadout = key;
        callback({ x, y });
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!renderer || !state.visible) {
        previous = 0;
        return;
      }
      const dt = previous ? Math.min(0.05, (now - previous) / 1000) : 1 / 60;
      previous = now;
      // Software WebGL: skip the print-in so the page doesn't burn ~60 CPU-rendered frames.
      const still = reduceMotion.matches || renderer.isSoftware;

      // Where is the lens? A touch press wins over the mouse.
      let inside = false;
      if (state.touch.active) {
        inside = true;
        state.lensX = state.touch.x;
        state.lensY = state.touch.y;
      } else if (lensEnabled) {
        const rect = root.getBoundingClientRect();
        const target = getPointerTarget();
        inside =
          target.present &&
          target.x >= rect.left &&
          target.x <= rect.right &&
          target.y >= rect.top &&
          target.y <= rect.bottom;
        if (inside || state.lensRadius > 0) {
          const pointer = getPointer();
          state.lensX = pointer.x - rect.left;
          state.lensY = pointer.y - rect.top;
        }
      }

      const k = still ? 1 : 1 - Math.exp(-dt * 12);
      const radiusTarget = inside ? maxLensRadius() : 0;
      state.lensRadius += (radiusTarget - state.lensRadius) * k;
      if (Math.abs(radiusTarget - state.lensRadius) < 0.05) state.lensRadius = radiusTarget;
      const hoverTarget = inside ? 1 : 0;
      state.hover += (hoverTarget - state.hover) * k;
      if (Math.abs(hoverTarget - state.hover) < 0.002) state.hover = hoverTarget;

      // "View original": an iris that opens from the centre, slower than the lens.
      const irisTarget = revealedRef.current ? 1 : 0;
      state.iris += (irisTarget - state.iris) * (still ? 1 : 1 - Math.exp(-dt * 6));
      if (Math.abs(irisTarget - state.iris) < 0.002) state.iris = irisTarget;
      const irisMax = Math.hypot(state.width, state.height) / 2 + 2;

      let reveal = state.revealStart < 0 ? 0 : 1;
      if (!still && state.revealStart >= 0) {
        const t = Math.min(1, (now - state.revealStart) / REVEAL_MS);
        reveal = 1 - Math.pow(1 - t, 3);
      }
      if (still) reveal = 1;

      renderer.render({
        x: state.lensX,
        y: state.lensY,
        lensRadius: state.lensRadius,
        irisRadius: state.iris * irisMax,
        hover: state.hover,
        reveal: reveal * 1.001,
      });
      reportLens(inside);

      const animating =
        reveal < 1 ||
        state.lensRadius !== radiusTarget ||
        state.hover !== hoverTarget ||
        state.iris !== irisTarget;
      if (animating) schedule();
      else previous = 0; // idle: the next frame starts with a fresh dt
    };

    function schedule() {
      if (raf || !renderer || !state.visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    }

    const startRevealIfVisible = () => {
      if (renderer && state.visible && state.revealStart < 0) state.revealStart = performance.now();
    };

    const layout = () => {
      if (!renderer) return;
      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width < 2 || height < 2) return;
      state.width = width;
      state.height = height;
      renderer.resize({
        width,
        height,
        dpr: renderer.isSoftware ? 1 : Math.min(window.devicePixelRatio || 1, 2),
        pixelSize,
        objectPosition: { x: focusX, y: focusY },
      });
      schedule();
    };

    // Scrolling moves the image under a still cursor, so the lens must follow.
    const onScroll = () => {
      if (state.lensRadius > 0 || state.hover > 0 || getPointerTarget().present) schedule();
    };

    const toLocal = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || !lensEnabled) return;
      window.clearTimeout(touchTimer);
      state.touch = { active: true, ...toLocal(event) };
      schedule();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || !state.touch.active) return;
      state.touch = { active: true, ...toLocal(event) };
      schedule();
    };
    // Keep the reveal briefly after lifting the finger so a quick tap still shows it.
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || !state.touch.active) return;
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(() => {
        state.touch.active = false;
        schedule();
      }, TOUCH_HOLD_MS);
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      fallback("context-lost");
    };

    const unsubscribe = lensEnabled ? subscribePointer(schedule) : () => {};
    scheduleRef.current = schedule;
    const resizeObserver = new ResizeObserver(layout);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      startRevealIfVisible();
      if (state.visible) schedule();
    });

    const init = async () => {
      if (initStarted) return;
      initStarted = true;
      try {
        await waitForImage(image);
      } catch (error) {
        fallback("image-load-failed", { error: String(error) });
        return;
      }
      await whenIdle(priority ? 800 : 2000);
      if (disposed) return;

      let created: DitherRenderer;
      try {
        created = new DitherRenderer(canvas, {
          foreground: parseHexColor(foreground),
          background: parseHexColor(background),
          ditherStrength,
          tone,
        });
      } catch (error) {
        fallback("webgl-init-failed", { error: error instanceof Error ? error.message : String(error) });
        return;
      }

      // Texture upload in its own task, so compile + upload never form one long task.
      await nextFrame();
      if (disposed) {
        created.dispose();
        return;
      }
      try {
        // The texture is the <img> next/image already downloaded: no second request.
        created.setImage(image);
        renderer = created;
      } catch (error) {
        created.dispose();
        fallback("webgl-init-failed", { error: error instanceof Error ? error.message : String(error) });
        return;
      }

      root.dataset.ready = "true";
      resizeObserver.observe(root);
      layout();
      startRevealIfVisible();
      schedule();
    };

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        nearObserver.disconnect();
        init();
      },
      { rootMargin: LAZY_INIT_MARGIN },
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        previous = 0;
      } else schedule();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotion.addEventListener("change", schedule);
    if (lensEnabled) window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerEnd);
    root.addEventListener("pointercancel", onPointerEnd);
    canvas.addEventListener("webglcontextlost", onContextLost);
    visibilityObserver.observe(root);
    if (priority) init();
    else nearObserver.observe(root);

    return () => {
      disposed = true;
      scheduleRef.current = null;
      cancelAnimationFrame(raf);
      window.clearTimeout(touchTimer);
      unsubscribe();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      nearObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotion.removeEventListener("change", schedule);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerEnd);
      root.removeEventListener("pointercancel", onPointerEnd);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      renderer?.dispose();
      renderer = null;
    };
  }, [background, ditherStrength, focusX, focusY, foreground, lensEnabled, lensRadius, pixelSize, priority, src, tone]);

  return (
    <div
      ref={rootRef}
      data-dither=""
      data-lens={lensEnabled ? "" : undefined}
      data-revealed={revealed ? "" : undefined}
      className={cn("relative overflow-hidden bg-bg", className)}
    >
      {/* Real image: carries the alt text, is the WebGL texture source, stays visible under
          the canvas while it initialises, and is the fallback without WebGL or JavaScript. */}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="dither-fallback object-cover contrast-125 grayscale"
        style={{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
