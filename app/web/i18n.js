import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import resources from './locales'

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
    react: { wait: true }
  })

export default i18n
