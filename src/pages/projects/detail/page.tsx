import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useProjects, useProjectDetail } from '@/hooks/useContent';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';

export default function ProjectDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = useLang();
  const projectId = Number(id);
  const { item: project, loading, error, retry } = useProjectDetail(projectId);
  const { items: allProjects } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
            <p className="text-sm text-foreground-600">{t('detail.loadingProject')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <p className="text-sm text-foreground-600 mb-6">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
              {t('common.retry')}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-folder-unknow-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <h1 className="text-xl font-bold text-foreground-900 mb-2">{t('detail.projectNotFound')}</h1>
            <p className="text-sm text-foreground-600 mb-6">
              {t('detail.projectNotFoundDesc')}
            </p>
            <a
              href={getLocalizedPath('projects', lang)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              {t('detail.backToProjects')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = allProjects.filter((p) => p.id !== projectId).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={project.category.toUpperCase()}
          badgeIcon="ri-folders-line"
          title={project.title}
          description={project.description}
          breadcrumb={[
            { label: t('common.home'), href: getLocalizedPath('home', lang) },
            { label: t('detail.projectCategory'), href: getLocalizedPath('projects', lang) },
            { label: project.title },
          ]}
          image={project.image}
        />

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-500 mb-8">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent-100 text-accent-900 font-medium">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                {project.year}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background-100 text-foreground-600">
                <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center" />
                {project.status}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-foreground-900 mb-4">
              {t('detail.projectOverview')}
            </h2>
            {project.content.map((paragraph, idx) => (
              <p key={idx} className="text-sm md:text-base text-foreground-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-20 bg-background-50">
          <div className="container-main">
            <div className="relative bg-primary-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-2xl">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                    {t('detail.projectCtaTitle')}
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

        {related.length > 0 && (
          <section className="py-12 md:py-16 bg-background-100">
            <div className="container-main">
              <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-6 md:mb-8">
                {t('detail.relatedProjects')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {related.map((item) => (
                  <a
                    key={item.id}
                    href={detailHref('projects', item.id, lang)}
                    className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold bg-accent-500 text-foreground-950 rounded-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 md:p-5 flex flex-col flex-1">
                      <span className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {item.title}
                      </span>
                      <span className="text-xs text-foreground-500">{item.year}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}