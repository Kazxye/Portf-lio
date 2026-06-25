import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import SocialLinks from '../ui/SocialLinks'
import { ArrowUpRight, Check } from '../ui/Icon'

/** Web3Forms submission endpoint. */
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Contact — a structured enquiry form with topic chips and direct social
 * links. Submissions are sent through Web3Forms (no backend required); the
 * access key is read from VITE_WEB3FORMS_KEY at build time.
 */
export default function Contact() {
  const { t } = useTranslation()
  const topics = t('contact.topics', { returnObjects: true }) as string[]
  const [topic, setTopic] = useState(topics[0])
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('access_key', ACCESS_KEY ?? '')
    data.append('topic', topic)
    data.append('subject', `Portfolio contact: ${topic}`)

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        form.reset()
        setTopic(topics[0])
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-3 text-sm text-white placeholder:text-sand/40 transition-colors focus:border-ember-500'

  // Success state replaces the form with a confirmation + reset affordance.
  if (status === 'sent') {
    return (
      <Section id="contact" inner="max-w-2xl">
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} align="left" />
        <div className="surface mt-8 p-6 text-center sm:p-8">
          <p className="flex items-center justify-center gap-2 text-lg font-medium text-emerald-400">
            <Check width={20} height={20} />
            {t('contact.sent')}
          </p>
          <p role="status" className="mt-2 text-sm text-sand/65">
            {t('contact.sentNote')}
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-6 text-sm text-ember-400 underline-offset-4 transition-colors hover:text-ember-300 hover:underline"
          >
            {t('contact.sendAnother')}
          </button>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-xs uppercase tracking-widest text-sand/40">
            {t('contact.orReach')}
          </p>
          <SocialLinks variant="pill" />
        </div>
      </Section>
    )
  }

  const sending = status === 'sending'

  return (
    <Section id="contact" inner="max-w-2xl">
      <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} align="left" />
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/65">
        {t('contact.lead')}
      </p>

      <form onSubmit={handleSubmit} className="surface mt-8 p-6 sm:p-8">
        {/* Honeypot — bots fill hidden fields; real users never see this. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-sand/70">
              {t('contact.name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={t('contact.namePlaceholder')}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-sand/70">
              {t('contact.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('contact.emailPlaceholder')}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="mb-1.5 block text-sm text-sand/70">
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder={t('contact.messagePlaceholder')}
            className={`${fieldClass} resize-none`}
          />
        </div>

        {/* Topic chips */}
        <fieldset className="mt-5">
          <legend className="mb-2 text-sm text-sand/70">{t('contact.topicLegend')}</legend>
          <div className="flex flex-wrap gap-2">
            {topics.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={topic === option}
                onClick={() => setTopic(option)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  topic === option
                    ? 'border-ember-500 bg-ember-500/15 text-white'
                    : 'border-white/10 text-sand/60 hover:border-white/25'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={sending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-12px_rgba(242,88,29,0.8)] transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? t('contact.sending') : t('contact.send')}
          {!sending && <ArrowUpRight width={16} height={16} />}
        </button>

        {status === 'error' && (
          <p role="alert" className="mt-3 text-center text-sm text-red-400">
            {t('contact.errorNote')}
          </p>
        )}
      </form>

      {/* Direct links */}
      <div className="mt-8">
        <p className="mb-3 text-xs uppercase tracking-widest text-sand/40">
          {t('contact.orReach')}
        </p>
        <SocialLinks variant="pill" />
      </div>
    </Section>
  )
}
