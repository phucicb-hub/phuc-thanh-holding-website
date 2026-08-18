import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import LegalPage from '@/components/feature/LegalPage';

export default function ServiceTerms() {
  const { t } = useTranslation();
  const lang = useLang();
  const sections = t('legal.serviceTerms.sections', { returnObjects: true }) as {
    heading: string;
    paragraphs: string[];
  }[];

  return (
    <LegalPage
      badge={t('legal.serviceTerms.badge')}
      badgeIcon="ri-file-text-line"
      title={t('legal.serviceTerms.title')}
      description={t('legal.serviceTerms.description')}
      breadcrumb={[
        { label: t('common.home'), href: getLocalizedPath('home', lang) },
        { label: t('legal.serviceTerms.title') },
      ]}
      image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20service%20agreement%20themed%20background%20with%20flowing%20document%20ribbons%20and%20handshake%20motifs%20made%20of%20geometric%20lines%2C%20golden%20light%20accents%20and%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=service-terms-hero-1&orientation=landscape"
      intro={t('legal.serviceTerms.intro')}
      sections={sections}
    />
  );
}