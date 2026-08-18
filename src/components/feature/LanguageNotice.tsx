import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getLocalizedPath, type Locale } from '@/lib/routes';

interface LanguageNoticeProps {
  target: Locale;
  onClose: () => void;
}

export default function LanguageNotice({ target, onClose }: LanguageNoticeProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goHome = () => {
    navigate(getLocalizedPath('home', target));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background-50 rounded-lg p-6 md:p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-foreground-400 hover:text-foreground-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <i className="ri-close-line w-6 h-6 flex items-center justify-center text-xl" />
        </button>
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent-100 text-primary-700 mx-auto mb-4">
          <i className="ri-translate-2 w-7 h-7 flex items-center justify-center text-2xl" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-foreground-900 mb-2">
          {t('lang.missingTitle')}
        </h2>
        <p className="text-sm text-foreground-600 leading-relaxed mb-6">
          {t('lang.missingDesc')}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={goHome}
            className="w-full px-5 py-3 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t('lang.returnHomepage')}
          </button>
          <button
            onClick={onClose}
            className="w-full px-5 py-3 text-sm font-medium bg-background-100 text-foreground-700 rounded-md hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t('lang.continueReading')}
          </button>
        </div>
      </div>
    </div>
  );
}