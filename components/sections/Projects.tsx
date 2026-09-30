import type { ReactNode } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Value } from "@/components/ui/Value";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

function SheetRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3">
      <dt className="text-label pt-0.5 text-muted">{label}</dt>
      <dd className="text-[0.9375rem]">{children}</dd>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-gutter border-t border-line py-[clamp(6rem,12vw,10rem)]">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <SectionLabel index="002" className="lg:col-span-12">
          Work
        </SectionLabel>
        <h2 id="work-title" data-reveal="" className="text-title lg:col-span-8">
          Selected projects
        </h2>
        <p data-reveal="" className="text-lead max-w-[36ch] text-muted lg:col-span-4 lg:self-end">
          Things I designed and built. Most have public source code.
        </p>
      </div>

      <ol className="mt-20 border-t border-line">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <article
              aria-labelledby={`project-${project.slug}`}
              data-reveal=""
              className="project-entry grid grid-cols-1 gap-y-8 py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-24"
            >
              <div className="project-visual-column min-w-0 lg:col-span-7 lg:pr-6">
                <ProjectCard name={project.name} image={project.image} sequence={project.sequence} index={i} />
              </div>

              <div className="min-w-0 lg:col-span-5 lg:pl-4">
                <p className="text-label mb-4 text-muted">{String(i + 1).padStart(2, "0")} / {project.type}</p>
                <h3 id={`project-${project.slug}`} className="text-heading">{project.name}</h3>
                <p className="text-lead mt-5 max-w-[46ch]">{project.summary}</p>
                <ul className="project-highlights mt-6 space-y-3 text-sm leading-relaxed text-muted">
                  {project.highlights.map(point => <li key={point}>{point}</li>)}
                </ul>
                <details className="project-details my-7">
                  <summary className="text-label">
                    <span className="details-closed">Read implementation details</span>
                    <span className="details-open">Close implementation details</span>
                    <span className="sr-only"> — {project.name}</span>
                    <span className="details-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
                    {project.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </details>
                <dl className="border-t border-line">
                  <SheetRow label="Year">{project.year}</SheetRow>
                  <SheetRow label="Role">
                    <Value>{project.role}</Value>
                  </SheetRow>
                  <SheetRow label="Stack">
                    {project.stack.map((item, index) => (
                      <span key={item}>
                        {index > 0 ? " / " : null}
                        <Value>{item}</Value>
                      </span>
                    ))}
                  </SheetRow>
                  <SheetRow label="Type">{project.type}</SheetRow>
                </dl>
                <div className="mt-6 text-[0.9375rem]">
                  {project.href ? (
                    <ArrowLink href={project.href}>View source</ArrowLink>
                  ) : (
                    <p className="text-label text-muted">{project.note}</p>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
