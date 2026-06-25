import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pt from './locales/pt.json'

export const SUPPORTED_LANGUAGES = ['en', 'pt'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = 'portfolio.lang'

/** Pick an initial language from storage, then the browser, then English. */
function resolveInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'pt') return stored
    if (navigator.language?.toLowerCase().startsWith('pt')) return 'pt'
  }
  return 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

// Persist the choice and keep <html lang> in sync for a11y / SEO.
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lng)
    document.documentElement.lang = lng === 'pt' ? 'pt-BR' : 'en-US'
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language === 'pt' ? 'pt-BR' : 'en-US'
}

export default i18n
