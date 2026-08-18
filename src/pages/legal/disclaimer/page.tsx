import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import LegalPage from '@/components/feature/LegalPage';

export default function Disclaimer() {
  const { t } = useTranslation();
  const lang = useLang();
  const sections = t('legal.disclaimer.sections', { returnObjects: true }) as {
    heading: string;
    paragraphs: string[];
  }[];

  return (
    <LegalPage
      badge={t('legal.disclaimer.badge')}
      badgeIcon="ri-alert-line"
      title={t('legal.disclaimer.title')}
      description={t('legal.disclaimer.description')}
      breadcrumb={[
        { label: t('common.home'), href: getLocalizedPath('home', lang) },
        { label: t('legal.disclaimer.title') },
      ]}
      image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20risk%20awareness%20themed%20background%20with%20warning%20geometric%20symbols%20and%20subtle%20caution%20motifs%2C%20golden%20light%20accents%20and%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=disclaimer-hero-1&orientation=landscape"
      intro={t('legal.disclaimer.intro')}
      sections={sections}
    />
  );
}