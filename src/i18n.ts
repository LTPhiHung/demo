import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/common/en.json'
import commonVi from './locales/common/en.json'
import questEn from './locales/quest/en.json'
import questVi from './locales/quest/vi.json'
import questRequestEn from './locales/quest-request/en.json'
import questRequestVi from './locales/quest-request/en.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { 
      common: commonEn,
      quest: questEn,
      request: questRequestEn
    },
    vi: { 
      common: commonVi,
      quest: questVi,
      request: questRequestVi
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'quest', 'request'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
