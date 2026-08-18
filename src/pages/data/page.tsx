import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RelatedFieldsSection from '@/components/feature/RelatedFieldsSection';
import Reveal from '@/components/base/Reveal';
import FaqPageSeo from '@/components/feature/FaqPageSeo';
import { dataFaq } from '@/mocks/data';
import useLang from '@/hooks/useLang';
import DataHero from './components/DataHero';
import DataContextSection from './components/DataContextSection';
import DataServicesSection from './components/DataServicesSection';
import DataProcessSection from './components/DataProcessSection';
import DataPrinciplesSection from './components/DataPrinciplesSection';
import DataFaqSection from './components/DataFaqSection';
import DataCTASection from './components/DataCTASection';

export default function Data() {
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <FaqPageSeo items={dataFaq[lang]} scriptId="faq-data-jsonld" />
      <Navbar />
      <main className="flex-1">
        <Reveal><DataHero /></Reveal>
        <Reveal><DataContextSection /></Reveal>
        <Reveal><DataServicesSection /></Reveal>
        <Reveal><DataProcessSection /></Reveal>
        <Reveal><DataPrinciplesSection /></Reveal>
        <Reveal><DataFaqSection /></Reveal>
        <Reveal><DataCTASection /></Reveal>
        <RelatedFieldsSection currentHref="/linh-vuc/quan-tri-phan-tich-du-lieu" />
      </main>
      <Footer />
    </div>
  );
}