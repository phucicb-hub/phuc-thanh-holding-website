import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RelatedFieldsSection from '@/components/feature/RelatedFieldsSection';
import Reveal from '@/components/base/Reveal';
import FaqPageSeo from '@/components/feature/FaqPageSeo';
import { digitalFaq } from '@/mocks/digital';
import useLang from '@/hooks/useLang';
import DigitalHero from './components/DigitalHero';
import DigitalContextSection from './components/DigitalContextSection';
import DigitalRoadmapSection from './components/DigitalRoadmapSection';
import DigitalServicesSection from './components/DigitalServicesSection';
import DigitalPrinciplesSection from './components/DigitalPrinciplesSection';
import DigitalFaqSection from './components/DigitalFaqSection';
import DigitalCTASection from './components/DigitalCTASection';

export default function Digital() {
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <FaqPageSeo items={digitalFaq[lang]} scriptId="faq-digital-jsonld" />
      <Navbar />
      <main className="flex-1">
        <Reveal><DigitalHero /></Reveal>
        <Reveal><DigitalContextSection /></Reveal>
        <Reveal><DigitalRoadmapSection /></Reveal>
        <Reveal><DigitalServicesSection /></Reveal>
        <Reveal><DigitalPrinciplesSection /></Reveal>
        <Reveal><DigitalFaqSection /></Reveal>
        <Reveal><DigitalCTASection /></Reveal>
        <RelatedFieldsSection currentHref="/linh-vuc/chuyen-doi-so-doanh-nghiep" />
      </main>
      <Footer />
    </div>
  );
}