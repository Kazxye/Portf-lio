import { profile } from '@/content/profile'
import { Hero } from '@/components/home/hero'
import { SelectedWork } from '@/components/home/selected-work'
import { About } from '@/components/home/about'
import { EngineeringStack } from '@/components/home/engineering-stack'

export default function HomePage() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: profile.siteUrl,
    description: profile.summary,
    sameAs: [profile.links.github, profile.links.linkedin],
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <SelectedWork />
      <About />
      <EngineeringStack />
    </>
  )
}
