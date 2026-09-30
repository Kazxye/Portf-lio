"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { RevealToggle } from "@/components/ui/RevealToggle";
import { ProjectShot } from "./ProjectShot";

type Props = Pick<Project, "name" | "image" | "sequence"> & { index: number };

export function ProjectCard({ name, image, sequence, index }: Props) {
  const [original, setOriginal] = useState(false);


  return (
    <figure className="project-figure" data-original={original ? "true" : undefined}>
      <div
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
