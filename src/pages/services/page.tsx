import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useTranslation } from 'react-i18next';
import { serviceDetails } from '@/mocks/services';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, localizeLegacyHref } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function Services() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('services.badge')}
          badgeIcon="ri-service-line"
          title={t('services.title')}
          description={t('services.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('services.title') }]}
          image="/assets/services/services-hero-illustration.svg"
        />

        <section className="py-12 md:py-16 bg-background-50 border-b border-gray-200/80">
          <div className="container-main text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100/70 border border-primary-200/80 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-800">
                {lang === 'vi' ? 'Hạ Tầng Năng Lực Cốt Lõi' : 'Core Strategic Disciplines'}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground-900 mb-4">
              {lang === 'vi' ? 'Bốn Trụ Cột Dịch Vụ Chiến Lược' : 'Four Core Service Disciplines'}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('services.introDesc')}
            </p>
          </div>
        </section>

        {/* Apple-Style Glassmorphic Disciplines Showcase */}
        <section className="py-16 md:py-20 bg-[#fbfbfd]">
          <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Pillar 1: Enterprise Software & AI */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                      Discipline 01
                    </span>
                    <span className="text-xs font-medium text-gray-500">Cloud &amp; Autonomous AI</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3 group-hover:text-primary-700 transition-colors">
                    {lang === 'vi' ? 'Phần Mềm Doanh Nghiệp & Trí Tuệ Nhân Tạo' : 'Enterprise Software & Applied AI'}
                  </h3>
                  <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-4">
                    {lang === 'vi'
                      ? 'Thiết kế hệ sinh thái ERP, CRM chuyên biệt và pipeline AI Agents tự động hóa quy trình cho doanh nghiệp quy mô lớn.'
                      : 'Bespoke ERP, CRM platforms coupled with generative AI pipelines and autonomous workflow agents.'}
                  </p>
                  <div className="my-3 rounded-2xl overflow-hidden border border-gray-100 bg-[#f8fafc]/70 p-2 sm:p-3 group-hover:border-primary-200 transition-all duration-300">
                    <img
                      src="/assets/services/enterprise-software-ai.svg"
                      alt="Enterprise Software & AI Architecture"
                      className="w-full h-auto max-h-[260px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="lazy"
                      width="640"
                      height="400"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary-50 text-primary-700">Next.js • Edge API • AI Agents</span>
                  <a
                    href={localizeLegacyHref('/linh-vuc/phat-trien-phan-mem', lang)}
                    className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 group/link"
                  >
                    {t('common.viewDetail')}
                    <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Pillar 2: Digital Health & Clinic DataLake */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                      Discipline 02
                    </span>
                    <span className="text-xs font-medium text-gray-500">PT Clinic Ecosystem</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3 group-hover:text-primary-700 transition-colors">
                    {lang === 'vi' ? 'Y Tế Số & PT DataLake' : 'Digital Health & DataLake'}
                  </h3>
                  <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-4">
                    {lang === 'vi'
                      ? 'Nền tảng quản lý phòng khám thông minh (PT Clinic) kết hợp kho dữ liệu lâm sàng y tế đạt chuẩn an toàn bảo mật cao.'
                      : 'Intelligent clinical operations with PT Clinic, unified health data lakes, and predictive patient workflows.'}
                  </p>
                  <div className="my-3 rounded-2xl overflow-hidden border border-gray-100 bg-[#f8fafc]/70 p-2 sm:p-3 group-hover:border-primary-200 transition-all duration-300">
                    <img
                      src="/assets/services/digital-health-datalake.svg"
                      alt="Digital Health & Clinic DataLake"
                      className="w-full h-auto max-h-[260px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="lazy"
                      width="560"
                      height="380"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary-50 text-primary-700">HIPAA &amp; ISO • AES-256</span>
                  <a
                    href={localizeLegacyHref('/linh-vuc/quan-tri-phan-tich-du-lieu', lang)}
                    className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 group/link"
                  >
                    {t('common.viewDetail')}
                    <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Pillar 3: EdTech & Workforce LMS */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Discipline 03
                    </span>
                    <span className="text-xs font-medium text-gray-500">Continuous Upskilling</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3 group-hover:text-amber-700 transition-colors">
                    {lang === 'vi' ? 'Đào Tạo & Nhân Lực Số (PT LMS)' : 'EdTech & Workforce LMS'}
                  </h3>
                  <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-4">
                    {lang === 'vi'
                      ? 'Hạ tầng LMS trực tuyến đa kênh, chương trình đào tạo chuẩn hóa kỹ năng số hóa và nâng tầm năng lực quản trị doanh nghiệp.'
                      : 'Next-generation LMS infrastructure and targeted executive upskilling programs delivering continuous organizational competence.'}
                  </p>
                  <div className="my-3 rounded-2xl overflow-hidden border border-gray-100 bg-[#fffdfa]/70 p-2 sm:p-3 group-hover:border-amber-200 transition-all duration-300">
                    <img
                      src="/assets/services/edtech-workforce-lms.svg"
                      alt="EdTech & Workforce LMS Platform"
                      className="w-full h-auto max-h-[260px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="lazy"
                      width="560"
                      height="380"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800">SCORM/xAPI • Adaptive AI Tutor</span>
                  <a
                    href={localizeLegacyHref('/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc', lang)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group/link"
                  >
                    {t('common.viewDetail')}
                    <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Pillar 4: Venture Capital & Strategic Incubation */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      Discipline 04
                    </span>
                    <span className="text-xs font-medium text-gray-500">Strategic Incubation</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3 group-hover:text-blue-700 transition-colors">
                    {lang === 'vi' ? 'Đầu Tư Công Nghệ & Quỹ Phát Triển' : 'Venture Capital & Strategic Incubation'}
                  </h3>
                  <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed mb-4">
                    {lang === 'vi'
                      ? 'Đầu tư trực tiếp và bảo trợ hạ tầng kỹ thuật cho các giải pháp công nghệ tiềm năng cao, tăng tốc đưa sản phẩm ra thị trường.'
                      : 'Direct capital backing, technical architecture, and strategic scaffolding for high-conviction ventures scaling breakthrough solutions.'}
                  </p>
                  <div className="my-3 rounded-2xl overflow-hidden border border-gray-100 bg-[#f8fafc]/70 p-2 sm:p-3 group-hover:border-blue-200 transition-all duration-300">
                    <img
                      src="/assets/services/venture-capital-incubation.svg"
                      alt="Venture Capital & Strategic Incubation"
                      className="w-full h-auto max-h-[260px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="lazy"
                      width="640"
                      height="400"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">Seed &amp; Growth • 3.8x MOIC • Co-Founding</span>
                  <a
                    href={localizeLegacyHref('/linh-vuc/dau-tu-cong-nghe', lang)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 group/link"
                  >
                    {t('common.viewDetail')}
                    <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Services Catalog */}
        <section className="py-16 md:py-20 bg-background-100 border-t border-gray-200/70">
          <div className="container-main">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3">
                {lang === 'vi' ? 'Danh Mục Dịch Vụ Chuyên Sâu' : 'Comprehensive Service Portfolio'}
              </h3>
              <p className="text-sm md:text-base text-foreground-600">
                {lang === 'vi'
                  ? 'Cung cấp các gói giải pháp linh hoạt từ tư vấn chiến lược đến triển khai vận hành trọn gói'
                  : 'Flexible solution packages from strategic consulting to end-to-end operational execution'}
              </p>
            </div>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {serviceDetails[lang].map((service) => (
                <a
                  key={service.id}
                  href={localizeLegacyHref(service.href, lang)}
                  className="group bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors block"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                    <i className={`${service.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xl`} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 pt-3 border-t border-background-200 flex items-center justify-between gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                    {t('common.viewDetail')}
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            <div className="relative bg-primary-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-2xl">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                    {t('services.productsTitle')}
                  </h2>
                  <p className="text-sm md:text-base text-background-200 leading-relaxed">
                    {t('services.productsDesc')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <a
                    href={getLocalizedPath('products', lang)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
                  >
                    {t('services.viewProducts')}
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                  </a>
                  <a
                    href={getLocalizedPath('contact', lang)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
                  >
                    {t('nav.contactCta')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}