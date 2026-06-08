import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { LanguageDetector } from 'i18next-http-middleware'

i18next
  .use(Backend) // Loads translation JSON files from disk
  .use(LanguageDetector) // Detects language from the request
  .init(
    {
      fallbackLng: 'cs', // Language to use when a key is missing in the requested language
      preload: ['cs', 'sk'], // Load these locales into memory on startup
      supportedLngs: ['cs', 'sk'], // Only these language codes are accepted
      load: 'languageOnly', // Skip regional variants
      ns: ['common', 'tools'], // Translation file names
      defaultNS: 'tools', // The namespace used when no namespace is specified in a t() call
      debug: false, // Only true during development
      interpolation: {
        escapeValue: false, // Pug already escapes HTML
      },
      // i18next-fs-backend config
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json', // Should work on both dev and production on Rosti
      },
    },
    (error) => {
      if (error) console.error('i18next failed to initialise:', error)
    },
  )

// Exporting the instance, not the promise
export default i18next
