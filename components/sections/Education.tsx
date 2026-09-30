import { SectionLabel } from "@/components/ui/SectionLabel";
import { education } from "@/data/experience";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="px-gutter pb-[clamp(6rem,12vw,10rem)]">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
        <SectionLabel className="lg:col-span-12">Education</SectionLabel>
        <h2 id="education-title" className="sr-only">
          Education
        </h2>
      </div>

      <ol className="mt-8 border-t border-line">
        {education.map((item) => (
          <li key={item.institution} data-reveal="" className="grid grid-cols-1 gap-y-3 border-b border-line py-10 lg:grid-cols-12 lg:gap-x-8">
            <p className="text-label text-muted lg:col-span-3">
              {item.start} – {item.end}
            </p>
            <div className="lg:col-span-9">
              <h3 className="text-2xl font-semibold tracking-tight">{item.institution}</h3>
              <p className="mt-1 text-muted">{item.program}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
