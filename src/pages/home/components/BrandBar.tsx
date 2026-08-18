import { useTranslation } from 'react-i18next';
import ZaloIcon from '@/components/base/ZaloIcon';

export default function BrandBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-primary-600 py-2.5">
      <div className="container-main flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-bold text-accent-400 tracking-wider">PT</span>
          <span className="text-xs md:text-sm text-background-50/80 hidden sm:inline">
            {t('brand.name')}
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="tel:0343089666"
            className="flex items-center gap-2 text-sm md:text-base font-medium text-background-50 hover:text-accent-300 transition-colors"
          >
            <i className="ri-phone-line w-4 h-4 flex items-center justify-center" />
            <span className="whitespace-nowrap">{t('brand.hotline')}</span>
          </a>
          <a
            href="mailto:phucthanhholding@gmail.com"
            className="hidden md:flex items-center gap-2 text-sm md:text-base font-medium text-background-50 hover:text-accent-300 transition-colors"
          >
            <i className="ri-mail-line w-4 h-4 flex items-center justify-center" />
            <span className="whitespace-nowrap">{t('brand.email')}</span>
          </a>
          <a
            href="tel:0343089666"
            className="flex items-center gap-1.5 bg-accent-400 text-foreground-950 text-sm font-bold px-3 py-1.5 rounded-full hover:bg-accent-300 transition-colors whitespace-nowrap"
          >
            <i className="ri-phone-fill w-4 h-4 flex items-center justify-center" />
            <span>{t('brand.callNow')}</span>
          </a>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://facebook.com/phucthanhholding"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 text-sm font-medium text-background-50 hover:text-accent-300 transition-colors whitespace-nowrap"
              aria-label={t('footer.facebook')}
            >
              <i className="ri-facebook-fill w-4 h-4 flex items-center justify-center" />
              <span>{t('footer.facebook')}</span>
            </a>
            <a
              href="https://zalo.me/phucthanhholding"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 text-sm font-medium text-background-50 hover:text-accent-300 transition-colors whitespace-nowrap"
              aria-label={t('footer.zalo')}
            >
              <ZaloIcon className="w-4 h-4" />
              <span>{t('footer.zalo')}</span>
            </a>
            <a
              href="https://youtube.com/phucthanhholding"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 text-sm font-medium text-background-50 hover:text-accent-300 transition-colors whitespace-nowrap"
              aria-label={t('footer.youtube')}
            >
              <i className="ri-youtube-fill w-4 h-4 flex items-center justify-center" />
              <span>{t('footer.youtube')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}