import { SectionLabel } from "@/components/ui/SectionLabel";
import { Value } from "@/components/ui/Value";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-gutter border-t border-line py-[clamp(6rem,12vw,10rem)]">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <SectionLabel index="003" className="lg:col-span-12">
          Experience
        </SectionLabel>
        <h2 id="experience-title" data-reveal="" className="text-title lg:col-span-8">
          Professional experience
        </h2>
      </div>

      <ol className="mt-20 border-t border-line">
        {experience.map((role) => (
          <li key={role.company} data-reveal="" className="grid grid-cols-1 gap-y-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-x-8">
            <p className="text-label text-muted lg:col-span-3">
              <Value>{role.start}</Value> – {role.end}
            </p>
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-semibold tracking-tight">{role.company}</h3>
              <p className="mt-1 text-muted">
                <Value>{role.title}</Value>
              </p>
            </div>
            <div className="max-w-[56ch] space-y-3 text-[0.9375rem] leading-relaxed text-muted lg:col-span-5">
              {role.description.map((line) => (
                <p key={line}>
                  <Value>{line}</Value>
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
