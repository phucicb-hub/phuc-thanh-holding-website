import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useTranslation } from 'react-i18next';
import { capabilities } from '@/mocks/projects';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';
import { useProjects } from '@/hooks/useContent';
import RevealStagger from '@/components/base/RevealStagger';

export default function Projects() {
  const { t } = useTranslation();
  const lang = useLang();
  const { items: projects, loading, error, retry } = useProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('projects.badge')}
          badgeIcon="ri-folders-line"
          title={t('projects.title')}
          description={t('projects.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('projects.title') }]}
          image="https://readdy.ai/api/search-image?query=Modern%20digital%20project%20and%20capability%20concept%2C%20abstract%20blueprint%20network%20with%20connected%20architecture%20and%20technology%20nodes%2C%20deep%20emerald%20green%20gradient%20with%20warm%20golden%20light%20highlights%2C%20clean%20minimalist%20corporate%20style&width=1600&height=600&seq=projects-hero-1&orientation=landscape"
        />

        {/* Projects */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
                <i className="ri-projector-line w-3.5 h-3.5 flex items-center justify-center" />
                {t('projects.sectionBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
                {t('projects.sectionTitle')}
              </h2>
              <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
                {t('projects.sectionDesc')}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
                <p className="text-sm text-foreground-600">{t('projects.loading')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-3 text-3xl" />
                <p className="text-sm text-foreground-600 mb-4">{error}</p>
                <button
                  onClick={retry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
                  {t('common.retry')}
                </button>
              </div>
            ) : (
              <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
                  >
                    <a href={detailHref('projects', project.id, lang)} className="relative block overflow-hidden aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.title}
                        title={project.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold bg-accent-500 text-foreground-950 rounded-sm">
                        {project.category}
                      </span>
                    </a>
                    <div className="p-4 md:p-5 flex flex-col flex-1">
                      <a
                        href={detailHref('projects', project.id, lang)}
                        className="block text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors"
                      >
                        {project.title}
                      </a>
                      <p className="text-xs md:text-sm text-foreground-600 mb-4 flex-1 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-foreground-500 mb-4">
                        <span className="inline-flex items-center gap-1">
                          <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                          {project.year}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background-100 text-foreground-600">
                          <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center" />
                          {project.status}
                        </span>
                      </div>
                      <a
                        href={detailHref('projects', project.id, lang)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
                      >
                        {t('common.viewDetail')}
                        <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                      </a>
                    </div>
                  </article>
                ))}
              </RevealStagger>
            )}
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-14 md:py-20 bg-background-100">
          <div className="container-main">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
                <i className="ri-award-line w-3.5 h-3.5 flex items-center justify-center" />
                {t('projects.capabilitiesBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
                {t('projects.capabilitiesTitle')}
              </h2>
              <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
                {t('projects.capabilitiesDesc')}
              </p>
            </div>

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {capabilities[lang].map((cap) => (
                <div
                  key={cap.id}
                  className="group bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-primary-700 mb-4 group-hover:bg-accent-500 group-hover:text-foreground-950 transition-colors">
                    <i className={`${cap.icon} w-6 h-6 flex items-center justify-center text-xl`} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground-900 mb-2">{cap.title}</h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 bg-background-50">
          <div className="container-main">
            <div className="relative bg-primary-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-2xl">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                    {t('projects.ctaTitle')}
                  </h2>
                  <p className="text-sm md:text-base text-background-200 leading-relaxed">
                    {t('projects.ctaDesc')}
                  </p>
                </div>
                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap shrink-0"
                >
                  {t('nav.contactCta')}
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}