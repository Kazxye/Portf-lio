import type { StaticImageData } from "next/image";
import { DitherImage } from "@/components/effects/DitherImage";

export function ProjectShot({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <DitherImage
      src={src}
      alt={alt}
      sizes="(min-width: 1024px) 52vw, 100vw"
      pixelSize={2}
      lensEnabled={false}
      tone="interface"
      className="project-shot aspect-[16/10] w-full"
    />
  );
}
