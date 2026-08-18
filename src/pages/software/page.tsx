import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RelatedFieldsSection from '@/components/feature/RelatedFieldsSection';
import Reveal from '@/components/base/Reveal';
import FaqPageSeo from '@/components/feature/FaqPageSeo';
import { softwareFaq } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import SoftwareHero from './components/SoftwareHero';
import SoftwareWhenSection from './components/SoftwareWhenSection';
import SoftwareServicesSection from './components/SoftwareServicesSection';
import SoftwareApproachSection from './components/SoftwareApproachSection';
import SoftwareProcessSection from './components/SoftwareProcessSection';
import SoftwareTechSection from './components/SoftwareTechSection';
import SoftwareIntegrationSection from './components/SoftwareIntegrationSection';
import SoftwareAiSection from './components/SoftwareAiSection';
import SoftwareOwnershipSection from './components/SoftwareOwnershipSection';
import SoftwareAcceptanceSection from './components/SoftwareAcceptanceSection';
import SoftwareAudienceSection from './components/SoftwareAudienceSection';
import SoftwareValuesSection from './components/SoftwareValuesSection';
import SoftwareFaqSection from './components/SoftwareFaqSection';
import SoftwareCTASection from './components/SoftwareCTASection';

export default function Software() {
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <FaqPageSeo items={softwareFaq[lang]} scriptId="faq-software-jsonld" />
      <Navbar />
      <main className="flex-1">
        <Reveal><SoftwareHero /></Reveal>
        <Reveal><SoftwareWhenSection /></Reveal>
        <Reveal><SoftwareServicesSection /></Reveal>
        <Reveal><SoftwareApproachSection /></Reveal>
        <Reveal><SoftwareProcessSection /></Reveal>
        <Reveal><SoftwareTechSection /></Reveal>
        <Reveal><SoftwareIntegrationSection /></Reveal>
        <Reveal><SoftwareAiSection /></Reveal>
        <Reveal><SoftwareOwnershipSection /></Reveal>
        <Reveal><SoftwareAcceptanceSection /></Reveal>
        <Reveal><SoftwareAudienceSection /></Reveal>
        <Reveal><SoftwareValuesSection /></Reveal>
        <Reveal><SoftwareFaqSection /></Reveal>
        <Reveal><SoftwareCTASection /></Reveal>
        <RelatedFieldsSection currentHref="/linh-vuc/phat-trien-phan-mem" />
      </main>
      <Footer />
    </div>
  );
}