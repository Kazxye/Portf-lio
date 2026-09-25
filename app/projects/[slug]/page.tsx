import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { projects } from '@/content/projects'
import { profile } from '@/content/profile'
import { ExternalLink } from '@/components/ui/external-link'
import { ProjectDiagram } from '@/components/projects/project-diagram'

export const dynamicParams = false
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return {}
  const url = `/projects/${slug}`
  return {
    title: `${project.name} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} — ${profile.name}`,
      description: project.summary,
      url,
      type: 'article',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${profile.name} — Security-minded software engineer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.summary,
      images: ['/opengraph-image'],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <div className="case-page container-page">
      <div className="case-breadcrumb">
        <Link href="/#work" className="text-link">
          ← Selected work
        </Link>
        <span className="mono-small">CASE STUDY / {project.index}</span>
      </div>
      <header className="case-header enter">
        <p className="eyebrow">{project.category}</p>
        <h1>
          {project.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="case-headline">{project.headline}</p>
        <div className="case-header-grid">
          <p className="case-summary">{project.summary}</p>
          <div>
            <p className="mono-small case-status">{project.status}</p>
            <ExternalLink href={project.repo}>
              View source on GitHub
            </ExternalLink>
          </div>
        </div>
        <ul className="stack-inline" aria-label="Main technologies">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>
      <div id="system-diagram" className="case-hero-diagram enter">
        <ProjectDiagram slug={project.slug} />
      </div>
      <div className="case-body">
        <aside className="case-sidebar">
          <nav aria-label="Case study contents">
            <p className="eyebrow">In this study</p>
            <a href="#context">01 / Context</a>
            <a href="#architecture">02 / Architecture</a>
            <a href="#decisions">03 / Decisions</a>
            <a href="#implementation">04 / Implementation</a>
            <a href="#tradeoffs">05 / Trade-offs</a>
            <a href="#project-stack">06 / Stack & source</a>
          </nav>
        </aside>
        <div className="case-content">
          <section id="context" className="case-section">
            <p className="eyebrow">01 / Context</p>
            <h2>The problem behind the project.</h2>
            <p>{project.context}</p>
            <h3>The engineering challenge</h3>
            <p>{project.challenge}</p>
            {project.credit && (
              <p className="credit-note">
                {project.credit.text}{' '}
                <ExternalLink href={project.credit.url}>
                  {project.credit.name}
                </ExternalLink>
                .
              </p>
            )}
          </section>
          <section id="architecture" className="case-section">
            <p className="eyebrow">02 / Architecture</p>
            <h2>Follow the boundaries.</h2>
            <p>{project.architecture}</p>
            <div className="architecture-principle">
              <span className="signal-dot" />
              <p>
                {project.slug === 'vaultkeeper'
                  ? 'The server authenticates the user. The browser decrypts the vault.'
                  : project.slug === 'kazz-injector'
                    ? 'The interface selects and reports. The engine validates and loads.'
                    : 'Collect signals independently. Explain the combined result.'}
              </p>
            </div>
            <a href="#system-diagram" className="text-link">
              Revisit the architecture diagram ↑
            </a>
          </section>
          <section id="decisions" className="case-section">
            <p className="eyebrow">03 / Technical decisions</p>
            <h2>Choices that shape the system.</h2>
            <div className="decision-list">
              {project.decisions.map((item, index) => (
                <div className="decision" key={item.title}>
                  <span className="mono-small">0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section id="implementation" className="case-section">
            <p className="eyebrow">04 / Implementation</p>
            <h2>From design to working code.</h2>
            {project.implementation.map((item) => (
              <div className="case-prose-block" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
            {project.screen && (
              <figure
                className={`case-screen ${project.slug === 'phishguard' ? 'case-screen-portrait' : ''}`}
              >
                <div className="screen-label mono-small">
                  INTERFACE / CAPTURED FROM SOURCE
                </div>
                <div className="screen-image">
                  <Image
                    src={project.screen.src}
                    width={project.screen.width}
                    height={project.screen.height}
                    alt={project.screen.alt}
                    sizes={
                      project.slug === 'phishguard'
                        ? '(max-width: 480px) 80vw, 300px'
                        : '(max-width: 767px) 90vw, 800px'
                    }
                  />
                </div>
                <figcaption>{project.screen.caption}</figcaption>
              </figure>
            )}
          </section>
          <section id="tradeoffs" className="case-section">
            <p className="eyebrow">05 / Trade-offs & limitations</p>
            <h2>What the design does—and doesn’t.</h2>
            {project.tradeoffs.map((item) => (
              <div className="case-prose-block" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>
          <section id="project-stack" className="case-section">
            <p className="eyebrow">06 / Stack & source</p>
            <h2>Inspect the implementation.</h2>
            <div className="case-stack">
              {project.groups.map((group) => (
                <div key={group.name}>
                  <h3 className="eyebrow">{group.name}</h3>
                  <p>{group.items.join(' / ')}</p>
                </div>
              ))}
            </div>
            <div className="source-list">
              {project.sources.map((source) => (
                <ExternalLink
                  key={source.path}
                  href={`${project.repo}/blob/main/${source.path}`}
                >
                  {source.label}
                  <span className="source-path mono-small">{source.path}</span>
                </ExternalLink>
              ))}
            </div>
            <ExternalLink className="btn" href={project.repo}>
              Explore repository
            </ExternalLink>
          </section>
        </div>
      </div>
      <Link className="next-project" href={`/projects/${nextProject.slug}`}>
        <div>
          <p className="eyebrow">Next case study / {nextProject.index}</p>
          <h2>{nextProject.name}</h2>
          <p>{nextProject.category}</p>
        </div>
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  )
}
