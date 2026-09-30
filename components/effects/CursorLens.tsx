"use client";

import { useEffect } from "react";
import { clearPointer, setPointerReducedMotion, setPointerTarget } from "./pointer";

/**
 * Drives the cursor lens. Mounted once in the root layout; renders nothing.
 *
 * Mouse and pen feed the shared smoothed pointer that every <DitherImage lensEnabled>
 * reads. The native cursor is kept everywhere except over lens images, where the lens
 * itself is the cursor (see [data-lens] in globals.css). Touch is handled per image.
 */
export function CursorLens() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setPointerReducedMotion(motion.matches);
    applyMotion();

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      setPointerTarget(event.clientX, event.clientY);
    };

    const root = document.documentElement;
    motion.addEventListener("change", applyMotion);
    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", clearPointer);
    window.addEventListener("blur", clearPointer);

    return () => {
      motion.removeEventListener("change", applyMotion);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
    };
  }, []);

  return null;
}
