"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { RevealToggle } from "@/components/ui/RevealToggle";
import { ProjectShot } from "./ProjectShot";

type Props = Pick<Project, "name" | "image" | "sequence"> & { index: number };

export function ProjectCard({ name, image, sequence, index }: Props) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [original, setOriginal] = useState(false);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const enabled = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let visible = true;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || !visible || event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        // One layout read per frame, on the stationary wrapper rather than the tilted plane.
        const bounds = surface.getBoundingClientRect();
        const horizontal = Math.max(-1, Math.min(1, (x - bounds.left) / bounds.width * 2 - 1));
        const vertical = Math.max(-1, Math.min(1, (y - bounds.top) / bounds.height * 2 - 1));
        surface.style.setProperty("--tilt-x", `${-vertical * 8}deg`);
        surface.style.setProperty("--tilt-y", `${horizontal * 8}deg`);
        frame = 0;
      });
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    visibility.observe(surface);
    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerleave", reset);
    surface.addEventListener("pointercancel", reset);
    enabled.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    return () => {
      reset();
      visibility.disconnect();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", reset);
      surface.removeEventListener("pointercancel", reset);
      enabled.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <figure className="project-figure" data-original={original ? "true" : undefined}>
      <div
        ref={surfaceRef}
        className="project-perspective"
        tabIndex={image ? 0 : undefined}
        role={image ? "group" : undefined}
        aria-label={image ? `${name}: focus to preview original screenshot` : undefined}
      >
        <div className="project-plane">
          <div className="project-card-heading">
            <span className="text-label text-accent">{String(index + 1).padStart(2, "0")} /</span>
            <span>{name}</span>
            <span className="project-register" aria-hidden="true">+</span>
          </div>
          <div className="project-media">
            {image ? <ProjectShot src={image.src} alt={image.alt} /> : (
              <div className="telemetry-visual">
                <p className="text-label text-accent">Defensive telemetry / Sysmon</p>
                <ol>
                  {sequence.map((event, i) => (
                    <li key={event}>
                      <span className="telemetry-node" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      <span>{event}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-label text-muted">A sequence to investigate</p>
              </div>
            )}
          </div>
          <ol className="project-sequence" aria-label="Technical sequence">
            {sequence.map((step, i) => (
              <li key={step}>{i > 0 ? <span className="sequence-arrow" aria-hidden="true">→</span> : null}{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <figcaption className="project-caption text-label text-muted">
        <span>{image ? "Screenshot / 1-bit → original" : "Telemetry study / typographic diagram"}</span>
        {image ? <RevealToggle pressed={original} onToggle={() => setOriginal(value => !value)} /> : null}
      </figcaption>
    </figure>
  );
}
