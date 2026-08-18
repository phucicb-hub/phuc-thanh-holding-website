import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RelatedFieldsSection from '@/components/feature/RelatedFieldsSection';
import Reveal from '@/components/base/Reveal';
import FaqPageSeo from '@/components/feature/FaqPageSeo';
import { investmentFaq } from '@/mocks/investment';
import useLang from '@/hooks/useLang';
import InvestmentHero from './components/InvestmentHero';
import InvestmentContextSection from './components/InvestmentContextSection';
import InvestmentServicesSection from './components/InvestmentServicesSection';
import InvestmentProcessSection from './components/InvestmentProcessSection';
import InvestmentPrinciplesSection from './components/InvestmentPrinciplesSection';
import InvestmentFaqSection from './components/InvestmentFaqSection';
import InvestmentCTASection from './components/InvestmentCTASection';

export default function Investment() {
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <FaqPageSeo items={investmentFaq[lang]} scriptId="faq-investment-jsonld" />
      <Navbar />
      <main className="flex-1">
        <Reveal><InvestmentHero /></Reveal>
        <Reveal><InvestmentContextSection /></Reveal>
        <Reveal><InvestmentServicesSection /></Reveal>
        <Reveal><InvestmentProcessSection /></Reveal>
        <Reveal><InvestmentPrinciplesSection /></Reveal>
        <Reveal><InvestmentFaqSection /></Reveal>
        <Reveal><InvestmentCTASection /></Reveal>
        <RelatedFieldsSection currentHref="/linh-vuc/dau-tu-cong-nghe" />
      </main>
      <Footer />
    </div>
  );
}