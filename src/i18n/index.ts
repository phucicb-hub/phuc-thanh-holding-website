import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import messages from './local/index';
import { resolveLocale } from '@/lib/routes';

i18n.use(initReactI18next).init({
  lng: resolveLocale(),
  fallbackLng: 'vi',
  debug: false,
  resources: messages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;