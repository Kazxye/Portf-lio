"use client";

import { useCallback, useRef, useState } from "react";
import portrait from "@/assets/images/portrait.jpg";
import { DitherImage, type LensPoint } from "@/components/effects/DitherImage";
import { RevealToggle } from "@/components/ui/RevealToggle";
import { profile } from "@/data/profile";

const IDLE_READOUT = "X ----  Y ----";
const pad = (n: number) => String(Math.max(0, n)).padStart(4, "0");

export function PortraitFigure() {
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Real data, not decoration: where the lens sits in the source photo, in pixels.
  // Written straight to the DOM so pointer movement never re-renders React.
  const onLensMove = useCallback((point: LensPoint) => {
    const el = readoutRef.current;
    if (el) el.textContent = point ? `X ${pad(point.x)}  Y ${pad(point.y)}` : IDLE_READOUT;
  }, []);

  return (
    <figure className="flex flex-col lg:h-full">
      <DitherImage
        src={portrait}
        alt={`Portrait of ${profile.name}`}
        sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
        priority
        focusX={0.5}
        focusY={0.22}
        pixelSize={2}
        lensRadius={88}
        revealed={revealed}
        onLensMove={onLensMove}
        className="aspect-square w-full sm:aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1"
      />
      <figcaption className="text-label mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-muted">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>1-bit / Bayer 8×8</span>
          <RevealToggle pressed={revealed} onToggle={() => setRevealed((value) => !value)} />
        </span>
        <span ref={readoutRef} aria-hidden="true" className="hidden whitespace-pre tabular-nums sm:inline">
          {IDLE_READOUT}
        </span>
      </figcaption>
    </figure>
  );
}
