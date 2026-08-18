import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import ZaloIcon from '@/components/base/ZaloIcon';

export default function Footer() {
  const { t } = useTranslation();
  const lang = useLang();

  const quickNav = [
    { title: t('footer.about'), href: getLocalizedPath('overview', lang) },
    { title: t('footer.products'), href: getLocalizedPath('products', lang) },
    { title: t('footer.fields'), href: getLocalizedPath('fields', lang) },
    { title: t('footer.contactCta'), href: getLocalizedPath('partnership', lang) },
  ];

  return (
    <footer className="w-full">
      {/* Quick nav widgets */}
      <div className="bg-background-100 border-t border-background-200">
        <div className="container-main py-6 md:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {quickNav.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group relative block overflow-hidden rounded-md bg-primary-500 hover:bg-primary-600 transition-colors py-4 px-4 text-center"
              >
                <span className="relative z-10 text-xs md:text-sm font-semibold text-background-50 tracking-wide">
                  {item.title}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-primary-100">
        <div className="container-main py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Terms */}
            <div>
              <h4 className="text-sm font-semibold text-primary-800 mb-4 uppercase tracking-wide">
                {t('footer.terms')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href={getLocalizedPath('terms', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.termsConditions')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('service-terms', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.serviceTerms')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('privacy', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.privacy')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('disclaimer', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.disclaimer')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-sm font-semibold text-primary-800 mb-4 uppercase tracking-wide">
                {t('footer.explore')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href={getLocalizedPath('news', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.news')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('projects', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.projects')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('careers', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.careers')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-primary-800 mb-4 uppercase tracking-wide">
                {t('footer.support')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href={getLocalizedPath('sitemap', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.sitemap')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('contact', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.contact')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('network', lang)} className="text-sm text-foreground-700 hover:text-primary-700 transition-colors">
                    {t('footer.network')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-primary-800 mb-4 uppercase tracking-wide">
                {t('footer.connect')}
              </h4>
              <div className="flex items-center gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://facebook.com/phucthanhholding"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-200 text-primary-800 hover:bg-accent-500 hover:text-foreground-950 transition-colors"
                  aria-label={t('footer.facebook')}
                >
                  <i className="ri-facebook-fill w-4 h-4 flex items-center justify-center" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://youtube.com/phucthanhholding"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-200 text-primary-800 hover:bg-accent-500 hover:text-foreground-950 transition-colors"
                  aria-label={t('footer.youtube')}
                >
                  <i className="ri-youtube-fill w-4 h-4 flex items-center justify-center" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://zalo.me/phucthanhholding"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-200 text-primary-800 hover:bg-accent-500 hover:text-foreground-950 transition-colors"
                  aria-label={t('footer.zalo')}
                >
                  <ZaloIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary-200 border-t border-primary-300">
        <div className="container-main py-5 md:py-6">
          <div className="text-center">
            <h5 className="text-xs md:text-sm font-semibold text-primary-900 mb-3">
              {t('footer.portal')}
            </h5>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-foreground-700 mb-3">
              <li className="flex items-center gap-1">
                <i className="ri-file-list-line w-3 h-3 flex items-center justify-center" />
                {t('footer.license')}
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-user-line w-3 h-3 flex items-center justify-center" />
                {t('footer.responsible')}
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-map-pin-line w-3 h-3 flex items-center justify-center" />
                {t('footer.address')}
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-phone-line w-3 h-3 flex items-center justify-center" />
                <a
                  href="tel:0343089666"
                  className="text-foreground-700 hover:text-primary-700 transition-colors"
                >
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-mail-line w-3 h-3 flex items-center justify-center" />
                <a
                  href="mailto:phucthanhholding@gmail.com"
                  className="text-foreground-700 hover:text-primary-700 transition-colors"
                >
                  {t('footer.email')}
                </a>
              </li>
            </ul>
            <p className="text-xs text-foreground-600">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}