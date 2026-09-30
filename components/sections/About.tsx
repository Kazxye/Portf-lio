import { SectionLabel } from "@/components/ui/SectionLabel";
import { about } from "@/data/about";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-gutter border-t border-line py-[clamp(6rem,12vw,10rem)]">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <SectionLabel index="001" className="lg:col-span-12">
          About
        </SectionLabel>

        <h2 id="about-title" data-reveal="" className="text-title lg:col-span-10">
          {/* Designed line breaks on wide screens; natural wrapping on narrow ones. */}
          {about.title.map((line, index) => (
            <span key={line} className="lg:block">
              {index > 0 ? " " : null}
              {line}
            </span>
          ))}
        </h2>

        <div data-reveal="" className="text-lead max-w-[60ch] space-y-6 lg:col-span-6 lg:mt-8">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl data-reveal="" className="border-t border-line lg:col-span-4 lg:col-start-9 lg:mt-8">
          {about.facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
              <dt className="text-label pt-0.5 text-muted">{fact.label}</dt>
              <dd className="text-[0.9375rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
