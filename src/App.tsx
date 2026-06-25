import { useTranslation } from 'react-i18next'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import FeaturedWork from './components/sections/FeaturedWork'
import Services from './components/sections/Services'
import Story from './components/sections/Story'
import TechStack from './components/sections/TechStack'
import Brands from './components/sections/Brands'
import WorkProcess from './components/sections/WorkProcess'
import Education from './components/sections/Education'
import Faq from './components/sections/Faq'
import CtaBanner from './components/sections/CtaBanner'
import Contact from './components/sections/Contact'

/**
 * Page composition. Section order:
 * hero → stats → about → projects → expertise → approach → tech → tools →
 * process → education → faq → cta → contact → footer.
 */
export default function App() {
  const { t } = useTranslation()

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ember-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t('nav.skip')}
      </a>

      <Navbar />

      <main>
        <Hero />
        <Stats />
        <About />
        <FeaturedWork />
        <Services />
        <Story />
        <TechStack />
        <Brands />
        <WorkProcess />
        <Education />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
