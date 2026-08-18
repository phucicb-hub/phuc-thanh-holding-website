import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RelatedFieldsSection from '@/components/feature/RelatedFieldsSection';
import Reveal from '@/components/base/Reveal';
import FaqPageSeo from '@/components/feature/FaqPageSeo';
import { mediaFaq } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import MediaHero from './components/MediaHero';
import MediaProblemsSection from './components/MediaProblemsSection';
import MediaPillarsSection from './components/MediaPillarsSection';
import MediaSolutionGroupsSection from './components/MediaSolutionGroupsSection';
import MediaAiSection from './components/MediaAiSection';
import MediaProcessSection from './components/MediaProcessSection';
import MediaMetricsSection from './components/MediaMetricsSection';
import MediaPrinciplesSection from './components/MediaPrinciplesSection';
import MediaAudienceSection from './components/MediaAudienceSection';
import MediaFaqSection from './components/MediaFaqSection';
import MediaCTASection from './components/MediaCTASection';

export default function Media() {
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <FaqPageSeo items={mediaFaq[lang]} scriptId="faq-media-jsonld" />
      <Navbar />
      <main className="flex-1">
        <Reveal><MediaHero /></Reveal>
        <Reveal><MediaProblemsSection /></Reveal>
        <Reveal><MediaPillarsSection /></Reveal>
        <Reveal><MediaSolutionGroupsSection /></Reveal>
        <Reveal><MediaAiSection /></Reveal>
        <Reveal><MediaProcessSection /></Reveal>
        <Reveal><MediaMetricsSection /></Reveal>
        <Reveal><MediaPrinciplesSection /></Reveal>
        <Reveal><MediaAudienceSection /></Reveal>
        <Reveal><MediaFaqSection /></Reveal>
        <Reveal><MediaCTASection /></Reveal>
        <RelatedFieldsSection currentHref="/linh-vuc/truyen-thong-noi-dung-so" />
      </main>
      <Footer />
    </div>
  );
}