import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RelatedFieldsSection from '@/components/feature/RelatedFieldsSection';
import Reveal from '@/components/base/Reveal';
import FaqPageSeo from '@/components/feature/FaqPageSeo';
import { trainingFaq } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import TrainingHero from './components/TrainingHero';
import TrainingContextSection from './components/TrainingContextSection';
import TrainingPillarsSection from './components/TrainingPillarsSection';
import TrainingProgramsSection from './components/TrainingProgramsSection';
import CompetencyFrameworkSection from './components/CompetencyFrameworkSection';
import TrainingMethodSection from './components/TrainingMethodSection';
import LearningModelsSection from './components/LearningModelsSection';
import CorporateTrainingSection from './components/CorporateTrainingSection';
import TrainingPartnershipSection from './components/TrainingPartnershipSection';
import TeamSection from './components/TeamSection';
import FeaturedProgramsSection from './components/FeaturedProgramsSection';
import TrainingFaqSection from './components/TrainingFaqSection';
import TrainingCTASection from './components/TrainingCTASection';

export default function Training() {
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <FaqPageSeo items={trainingFaq[lang]} scriptId="faq-training-jsonld" />
      <Navbar />
      <main className="flex-1">
        <Reveal><TrainingHero /></Reveal>
        <Reveal><TrainingContextSection /></Reveal>
        <Reveal><TrainingPillarsSection /></Reveal>
        <Reveal><TrainingProgramsSection /></Reveal>
        <Reveal><CompetencyFrameworkSection /></Reveal>
        <Reveal><TrainingMethodSection /></Reveal>
        <Reveal><LearningModelsSection /></Reveal>
        <Reveal><CorporateTrainingSection /></Reveal>
        <Reveal><TrainingPartnershipSection /></Reveal>
        <Reveal><TeamSection /></Reveal>
        <Reveal><FeaturedProgramsSection /></Reveal>
        <Reveal><TrainingFaqSection /></Reveal>
        <Reveal><TrainingCTASection /></Reveal>
        <RelatedFieldsSection currentHref="/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc" />
      </main>
      <Footer />
    </div>
  );
}