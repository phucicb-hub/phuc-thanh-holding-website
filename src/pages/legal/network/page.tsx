import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import LegalPage from '@/components/feature/LegalPage';

export default function Network() {
  const { t } = useTranslation();
  const lang = useLang();
  const sections = t('legal.network.sections', { returnObjects: true }) as {
    heading: string;
    paragraphs: string[];
  }[];

  return (
    <LegalPage
      badge={t('legal.network.badge')}
      badgeIcon="ri-global-line"
      title={t('legal.network.title')}
      description={t('legal.network.description')}
      breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('legal.network.title') }]}
      image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20network%20connectivity%20themed%20background%20with%20interconnected%20nodes%20and%20flowing%20golden%20data%20lines%20across%20a%20map-like%20geometric%20pattern%2C%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=network-hero-1&orientation=landscape"
      intro={t('legal.network.intro')}
      sections={sections}
    />
  );
}