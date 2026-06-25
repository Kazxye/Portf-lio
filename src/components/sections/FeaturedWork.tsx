import { useTranslation } from 'react-i18next'
import { projectMeta, type ProjectItem } from '../../data/content'
import Section from '../ui/Section'
import { ArrowUpRight, GitHub, Globe } from '../ui/Icon'

/**
 * Projects — the core section. Stacked cards pairing a real screenshot with the
 * project's name, category, description, tech-stack chips, and links to the
 * repository (and a live demo when available).
 */
export default function FeaturedWork() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as ProjectItem[]

  return (
    <Section id="work">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="mt-3 inline-flex items-start font-display text-3xl font-semibold text-white sm:text-4xl">
            {t('projects.title')}
            <ArrowUpRight className="ml-1.5 mt-1 text-ember-500" width={22} height={22} />
          </h2>
        </div>
        <a
          href="https://github.com/Kazxye"
          target="_blank"
          rel="noreferrer noopener"
          className="hidden shrink-0 items-center gap-1.5 text-sm text-sand/70 underline-offset-4 hover:text-white hover:underline sm:flex"
        >
          <GitHub width={16} height={16} />
          {t('projects.viewAll')}
        </a>
      </div>

      <div className="flex flex-col gap-5">
        {projects.map((project, i) => {
          const meta = projectMeta[i]
          return (
            <article
              key={project.title}
              className="surface group overflow-hidden p-3 transition-colors hover:border-white/15"
            >
              <a
                href={meta.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title}: ${t('projects.code')}`}
                className="block overflow-hidden rounded-2xl"
              >
                <img
                  src={meta.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-72"
                />
              </a>

              <div className="flex items-start justify-between gap-4 px-2 py-4">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-ember-300">
                    {project.category}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-sand/60">
                    {project.description}
                  </p>
                  <ul
                    className="mt-3 flex flex-wrap gap-1.5"
                    aria-label={t('projects.stackLabel')}
                  >
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-sand/70"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={meta.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-sand/80 transition-colors hover:border-ember-500/50 hover:text-white"
                    >
                      <GitHub width={14} height={14} />
                      {t('projects.code')}
                    </a>
                    {meta.live && (
                      <a
                        href={meta.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 px-3 py-1.5 text-xs text-ember-200 transition-colors hover:bg-ember-500/20 hover:text-white"
                      >
                        <Globe width={14} height={14} />
                        {t('projects.live')}
                      </a>
                    )}
                  </div>
                </div>

                <a
                  href={meta.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-hidden
                  tabIndex={-1}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white transition-all duration-300 group-hover:bg-ember-500"
                >
                  <ArrowUpRight />
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
