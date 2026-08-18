import { useTranslation } from 'react-i18next';
import Reveal from '@/components/base/Reveal';

export default function AboutSection() {
  const { t } = useTranslation();

  const highlights = [
    { id: 1, label: t('overview.highlight1') },
    { id: 2, label: t('overview.highlight2') },
    { id: 3, label: t('overview.highlight3') },
  ];

  return (
    <section id="ve-chung-toi" className="py-14 md:py-20 bg-background-50 scroll-mt-24">
      <div className="container-main">
        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Image column */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src="https://readdy.ai/api/search-image?query=Abstract%20representation%20of%20modern%20enterprise%20growth%20and%20technology%20integration%2C%20connected%20geometric%20nodes%20and%20ascending%20lines%20forming%20a%20rising%20structure%2C%20soft%20emerald%20green%20and%20warm%20gold%20gradient%20background%2C%20clean%20minimalist%20corporate%20illustration%2C%20symbolizes%20sustainable%20development%20and%20collaboration%2C%20elegant%20professional%20composition&width=900&height=680&seq=overview-about-1&orientation=landscape"
                alt={t('overview.imageAlt')}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold bg-background-50/90 text-foreground-700 rounded-sm">
                {t('overview.imagePlaceholder')}
              </span>
            </div>
            <div className="absolute -bottom-5 left-5 md:left-8 bg-primary-700 text-white rounded-lg px-5 py-4">
              <div className="text-2xl font-bold">2024</div>
              <div className="text-xs text-background-200">{t('overview.foundedYear')}</div>
            </div>
          </div>

          {/* Content column */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-double-quotes-l w-3.5 h-3.5 flex items-center justify-center" />
              {t('overview.aboutBadge')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-4 tracking-tight">
              {t('overview.aboutTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 mb-4 leading-relaxed">
              {t('overview.aboutP1')}
            </p>
            <p className="text-sm md:text-base text-foreground-600 mb-6 leading-relaxed">
              {t('overview.aboutP2')}
            </p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-primary-950 shrink-0">
                    <i className="ri-check-line w-3 h-3 flex items-center justify-center" />
                  </span>
                  <span className="text-sm font-medium text-foreground-800">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}