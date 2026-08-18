import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import Reveal from '@/components/base/Reveal';
import PtLmsHero from './components/PtLmsHero';
import PtLmsProblem from './components/PtLmsProblem';
import PtLmsVision from './components/PtLmsVision';
import PtLmsPillars from './components/PtLmsPillars';
import PtLmsFeatures from './components/PtLmsFeatures';
import PtLmsAi from './components/PtLmsAi';
import PtLmsRoles from './components/PtLmsRoles';
import PtLmsIntegration from './components/PtLmsIntegration';
import PtLmsRoadmap from './components/PtLmsRoadmap';
import PtLmsAudience from './components/PtLmsAudience';
import PtLmsPhilosophy from './components/PtLmsPhilosophy';
import PtLmsCta from './components/PtLmsCta';

export default function PtLms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PtLmsHero />
        <Reveal><PtLmsProblem /></Reveal>
        <Reveal><PtLmsVision /></Reveal>
        <Reveal><PtLmsPillars /></Reveal>
        <Reveal><PtLmsFeatures /></Reveal>
        <Reveal><PtLmsAi /></Reveal>
        <Reveal><PtLmsRoles /></Reveal>
        <Reveal><PtLmsIntegration /></Reveal>
        <Reveal><PtLmsRoadmap /></Reveal>
        <Reveal><PtLmsAudience /></Reveal>
        <Reveal><PtLmsPhilosophy /></Reveal>
        <Reveal><PtLmsCta /></Reveal>
      </main>
      <Footer />
    </div>
  );
}