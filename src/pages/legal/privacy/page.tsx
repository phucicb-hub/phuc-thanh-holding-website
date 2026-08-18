import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import LegalPage from '@/components/feature/LegalPage';

export default function Privacy() {
  const { t } = useTranslation();
  const lang = useLang();
  const sections = t('legal.privacy.sections', { returnObjects: true }) as {
    heading: string;
    paragraphs: string[];
  }[];

  return (
    <LegalPage
      badge={t('legal.privacy.badge')}
      badgeIcon="ri-shield-check-line"
      title={t('legal.privacy.title')}
      description={t('legal.privacy.description')}
      breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('legal.privacy.title') }]}
      image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20privacy%20and%20security%20themed%20background%20with%20protective%20shield%20and%20lock%20motifs%20formed%20by%20geometric%20shapes%2C%20soft%20golden%20data%20lines%20and%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=privacy-hero-1&orientation=landscape"
      intro={t('legal.privacy.intro')}
      sections={sections}
    />
  );
}