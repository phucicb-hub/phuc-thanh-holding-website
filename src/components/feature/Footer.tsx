import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import ZaloIcon from '@/components/base/ZaloIcon';

export default function Footer() {
  const { t } = useTranslation();
  const lang = useLang();

  const quickNav = [
    { title: lang === 'en' ? 'Technology' : 'Công nghệ', href: getLocalizedPath('technology', lang) },
    { title: lang === 'en' ? 'Company Verification' : 'Xác minh doanh nghiệp', href: getLocalizedPath('verification', lang) },
    { title: 'AI Product / Claude Use Case', href: getLocalizedPath('ai-product', lang) },
    { title: t('footer.about'), href: getLocalizedPath('overview', lang) },
    { title: t('footer.products'), href: getLocalizedPath('products', lang) },
    { title: t('footer.fields'), href: getLocalizedPath('fields', lang) },
    { title: t('footer.contactCta'), href: getLocalizedPath('partnership', lang) },
  ];

  return (
    <footer className="w-full bg-[#f8fafc] text-[#4b5563] border-t border-gray-200">
      {/* Quick nav widgets */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-main py-6 md:py-8 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {quickNav.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group relative block overflow-hidden rounded-xl bg-[#f8fafc] hover:bg-white border border-gray-200 hover:border-[#046842]/40 transition-all py-3.5 px-4 text-center shadow-xs hover:shadow-sm"
              >
                <span className="relative z-10 text-xs md:text-sm font-bold text-gray-800 group-hover:text-[#046842] tracking-wide transition-colors">
                  {item.title}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#046842] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#f8fafc]">
        <div className="container-main py-10 md:py-14 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Terms */}
            <div>
              <h4 className="text-xs font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider">
                {t('footer.terms')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href={getLocalizedPath('terms', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.termsConditions')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('service-terms', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.serviceTerms')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('privacy', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.privacy')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('disclaimer', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.disclaimer')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-xs font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider">
                {t('footer.explore')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href={getLocalizedPath('news', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.news')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('projects', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.projects')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('careers', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.careers')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider">
                {t('footer.support')}
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href={getLocalizedPath('sitemap', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.sitemap')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('contact', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.contact')}
                  </a>
                </li>
                <li>
                  <a href={getLocalizedPath('network', lang)} className="text-xs sm:text-sm text-gray-600 hover:text-[#046842] transition-colors">
                    {t('footer.network')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs font-bold text-[#1d1d1f] mb-4 uppercase tracking-wider">
                {t('footer.connect')}
              </h4>
              <div className="flex items-center gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://facebook.com/phucthanhholding"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-[#046842] hover:text-white transition-all shadow-xs"
                  aria-label={t('footer.facebook')}
                >
                  <i className="ri-facebook-fill w-4 h-4 flex items-center justify-center" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://youtube.com/phucthanhholding"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-[#046842] hover:text-white transition-all shadow-xs"
                  aria-label={t('footer.youtube')}
                >
                  <i className="ri-youtube-fill w-4 h-4 flex items-center justify-center" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://zalo.me/phucthanhholding"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-[#046842] hover:text-white transition-all shadow-xs"
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
      <div className="bg-[#f1f5f9] border-t border-gray-200">
        <div className="container-main py-6 max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h5 className="text-xs font-bold text-gray-800 mb-3 uppercase tracking-wider">
              {t('footer.portal')}
            </h5>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-gray-600 mb-3">
              <li className="flex items-center gap-1">
                <i className="ri-file-list-line text-[#046842]" />
                {t('footer.license')}
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-user-line text-[#046842]" />
                {t('footer.responsible')}
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-map-pin-line text-[#046842]" />
                {t('footer.address')}
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-phone-line text-[#046842]" />
                <a
                  href="tel:0343089666"
                  className="text-gray-800 hover:text-[#046842] font-semibold transition-colors"
                >
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center gap-1">
                <i className="ri-mail-line text-[#046842]" />
                <a
                  href="mailto:info@phucthanhholding.com"
                  className="text-gray-800 hover:text-[#046842] font-semibold transition-colors"
                >
                  {t('footer.email')}
                </a>
              </li>
            </ul>
            <p className="text-[11px] text-[#8b949e]/80">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
