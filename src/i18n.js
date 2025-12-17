import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {}, // We'll load translations dynamically
    fallbackLng: 'fr', // Default language for Morocco
    supportedLngs: ['en', 'fr', 'ar'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

// Load translations
const loadTranslations = async (lng) => {
  try {
    const response = await fetch(`/locales/${lng}/translation.json`);
    const translations = await response.json();
    i18n.addResourceBundle(lng, 'translation', translations);
  } catch (error) {
    console.error(`Failed to load ${lng} translations:`, error);
  }
};

// Load all supported languages
['en', 'fr', 'ar'].forEach(lng => {
  loadTranslations(lng);
});

// Set document direction based on language
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lng);
});

// Set initial direction
const currentLang = i18n.language || 'fr';
const initialDir = currentLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.setAttribute('dir', initialDir);
document.documentElement.setAttribute('lang', currentLang);

export default i18n;
