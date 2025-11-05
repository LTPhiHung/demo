import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/common/en.json'
import commonVi from './locales/common/vi.json'
import questEn from './locales/quest/en.json'
import questVi from './locales/quest/vi.json'
import questRequestEn from './locales/quest-request/en.json'
import questRequestVi from './locales/quest-request/vi.json'
import welcomeQuestEn from './locales/welcome-quest/en.json'
import welcomeQuestVi from './locales/welcome-quest/vi.json'
import redeemEn from './locales/redeem/en.json'
import redeemVi from './locales/redeem/vi.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { 
      common: commonEn,
      quest: questEn,
      request: questRequestEn,
      redeem: redeemEn,
      'welcome-quest': welcomeQuestEn,
    },
    vi: { 
      common: commonVi,
      quest: questVi,
      request: questRequestVi,
      redeem: redeemVi,
      'welcome-quest': welcomeQuestVi,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'quest', 'request', 'welcome-quest', 'redeem', ],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
