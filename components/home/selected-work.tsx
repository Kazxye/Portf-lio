import Link from 'next/link'
import Image from 'next/image'
import { projects, otherProjects } from '@/content/projects'
import { profile } from '@/content/profile'
import { ProjectDiagram } from '@/components/projects/project-diagram'
import { ExternalLink } from '@/components/ui/external-link'

export function SelectedWork() {
  return (
    <section
      id="work"
      tabIndex={-1}
      aria-labelledby="work-title"
      className="section container-page"
    >
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2 id="work-title">Systems, in practice.</h2>
        </div>
        <p className="section-intro">
          From browser trust boundaries
          <br />
          to Windows process internals.
        </p>
      </div>
      <div className="featured-work">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={project.slug}
            className={`project-showcase reveal ${index === 0 ? 'project-featured' : 'project-split'}`}
          >
            <div className="project-copy">
              <p className="eyebrow project-category">
                <span>{project.index}</span>
                <span>{project.category}</span>
              </p>
              <h3>
                <Link href={`/projects/${project.slug}`}>
                  {project.name}
                  <span aria-hidden="true" className="project-name-arrow">
                    ↗
                  </span>
                </Link>
              </h3>
              <p className="project-headline">{project.headline}</p>
              <p className="project-summary">{project.summary}</p>
              <ul
                className="stack-inline"
                aria-label={`${project.name} technologies`}
              >
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="project-actions">
                <Link className="case-link" href={`/projects/${project.slug}`}>
                  View case study <span aria-hidden="true">↗</span>
                </Link>
                <ExternalLink href={project.repo}>Source</ExternalLink>
              </div>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="project-visual"
              aria-label={`Explore ${project.name} architecture`}
            >
              <ProjectDiagram slug={project.slug} />
            </Link>
          </article>
        ))}
      </div>
      <div className="other-work reveal">
        <div className="other-work-heading">
          <h3 className="eyebrow">Other work</h3>
          <ExternalLink href={profile.links.github}>
            All repositories
          </ExternalLink>
        </div>
        {otherProjects.map((project, index) => (
          <article key={project.slug} id={project.slug} className="other-row">
            <span className="mono-small other-index">0{index + 4}</span>
            <div className="other-title">
              <h4>
                <ExternalLink href={project.repo}>{project.name}</ExternalLink>
              </h4>
              <p>{project.category}</p>
            </div>
            <p className="other-stack mono-small">{project.stack}</p>
            <div className="other-actions">
              <ExternalLink href={project.repo}>Source</ExternalLink>
              {project.demo && (
                <ExternalLink href={project.demo}>Live</ExternalLink>
              )}
            </div>
            <div className="other-preview" aria-hidden="true">
              {project.slug === 'solarhub' ? (
                <Image
                  src="/projects/solarhub.webp"
                  width={600}
                  height={308}
                  alt=""
                  sizes="280px"
                />
              ) : (
                <div className="radar-preview">
                  <span />
                  <span />
                  <span />
                  <i />
                  <b>ARP → API → WebSocket</b>
                </div>
              )}
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
