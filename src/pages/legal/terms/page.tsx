import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import LegalPage from '@/components/feature/LegalPage';

export default function TermsConditions() {
  const { t } = useTranslation();
  const lang = useLang();
  const sections = t('legal.terms.sections', { returnObjects: true }) as {
    heading: string;
    paragraphs: string[];
  }[];

  return (
    <LegalPage
      badge={t('legal.terms.badge')}
      badgeIcon="ri-scales-3-line"
      title={t('legal.terms.title')}
      description={t('legal.terms.description')}
      breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('legal.terms.title') }]}
      image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20legal%20and%20governance%20themed%20background%20with%20balanced%20geometric%20scales%20and%20document%20motifs%2C%20subtle%20golden%20light%20lines%20and%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=terms-hero-1&orientation=landscape"
      intro={t('legal.terms.intro')}
      sections={sections}
    />
  );
}