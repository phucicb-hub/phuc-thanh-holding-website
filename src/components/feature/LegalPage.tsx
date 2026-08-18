import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  badge: string;
  badgeIcon: string;
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  image: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({
  badge,
  badgeIcon,
  title,
  description,
  breadcrumb,
  image,
  intro,
  sections,
}: LegalPageProps) {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={badge}
          badgeIcon={badgeIcon}
          title={title}
          description={description}
          breadcrumb={breadcrumb}
          image={image}
        />

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main max-w-3xl">
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-10 pb-6 border-b border-background-200">
              {intro}
            </p>

            <div className="space-y-9">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-lg md:text-xl font-bold text-foreground-900 mb-3">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm md:text-base text-foreground-600 leading-relaxed mb-3"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <p className="mt-10 text-xs text-foreground-500 pt-4 border-t border-background-200">
              {t('legal.lastUpdated')} {t('legal.updatedDate')}
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-background-50">
          <div className="container-main">
            <div className="relative bg-primary-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-2xl">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                    {t('legal.supportTitle')}
                  </h2>
                  <p className="text-sm md:text-base text-background-200 leading-relaxed">
                    {t('legal.supportDesc')}
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