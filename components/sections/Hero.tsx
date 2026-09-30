import { ButtonLink } from "@/components/ui/ButtonLink";
import { profile } from "@/data/profile";
import { PortraitFigure } from "./PortraitFigure";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero px-gutter grid min-h-[max(640px,100svh)] grid-cols-1 gap-10 pb-12 pt-[calc(var(--header-h)+1.5rem)] md:grid-cols-12 md:items-end md:gap-x-8 lg:grid-rows-[1fr] lg:pt-[calc(var(--header-h)+2.5rem)]"
    >
      <span className="hero-scan" aria-hidden="true" />
      <div className="hero-copy md:col-span-6 lg:pb-9">
        <p className="text-label text-muted">{profile.role}</p>
        <h1 id="hero-title" className="text-display mt-6">
          <span className="hero-line"><span>{profile.firstName}</span></span>
          <span className="hero-line"><span>{profile.lastName}</span></span>
        </h1>
        <p className="text-lead mt-8 max-w-[44ch] text-muted">{profile.summary}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#work">View Projects</ButtonLink>
          <ButtonLink href={profile.links.github} variant="outline">
            GitHub
          </ButtonLink>
          <ButtonLink href={profile.links.linkedin} variant="outline">
            LinkedIn
          </ButtonLink>
        </div>
      </div>

      {/* Phones: the portrait leads, it is the site's signature. Tablets: two columns with a
          4:5 portrait, so the name and CTAs stay above the fold. Desktop: full height. */}
      <div className="hero-portrait order-first w-full max-w-[640px] md:order-none md:col-span-6 md:max-w-none lg:col-span-5 lg:col-start-8 lg:self-stretch">
        <PortraitFigure />
      </div>
    </section>
  );
}
