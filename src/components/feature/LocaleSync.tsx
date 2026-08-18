import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocaleFromPath, resolveLocaleFromStorage } from '@/lib/routes';

export default function LocaleSync() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const urlLocale = getLocaleFromPath(location.pathname);
    const locale = urlLocale ?? resolveLocaleFromStorage();

    if (!i18n.language?.startsWith(locale)) {
      i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale;

    if (urlLocale) {
      try {
        window.localStorage.setItem('i18nextLng', locale);
      } catch {
        /* ignore */
      }
    }
  }, [location.pathname, i18n]);

  return null;
}