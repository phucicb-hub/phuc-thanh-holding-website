import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import Reveal from '@/components/base/Reveal';
import PtClinicHero from './components/PtClinicHero';
import PtClinicJourney from './components/PtClinicJourney';
import PtClinicFeatures from './components/PtClinicFeatures';
import PtClinicDashboard from './components/PtClinicDashboard';
import PtClinicOperations from './components/PtClinicOperations';
import PtClinicAi from './components/PtClinicAi';
import PtClinicSecurity from './components/PtClinicSecurity';
import PtClinicRoles from './components/PtClinicRoles';
import PtClinicIntegration from './components/PtClinicIntegration';
import PtClinicRoadmap from './components/PtClinicRoadmap';
import PtClinicAudience from './components/PtClinicAudience';
import PtClinicPhilosophy from './components/PtClinicPhilosophy';
import PtClinicCta from './components/PtClinicCta';

export default function PtClinic() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PtClinicHero />
        <Reveal>
          <PtClinicJourney />
        </Reveal>
        <Reveal>
          <PtClinicFeatures />
        </Reveal>
        <Reveal>
          <PtClinicDashboard />
        </Reveal>
        <Reveal>
          <PtClinicOperations />
        </Reveal>
        <Reveal>
          <PtClinicAi />
        </Reveal>
        <Reveal>
          <PtClinicSecurity />
        </Reveal>
        <Reveal>
          <PtClinicRoles />
        </Reveal>
        <Reveal>
          <PtClinicIntegration />
        </Reveal>
        <Reveal>
          <PtClinicRoadmap />
        </Reveal>
        <Reveal>
          <PtClinicAudience />
        </Reveal>
        <Reveal>
          <PtClinicPhilosophy />
        </Reveal>
        <Reveal>
          <PtClinicCta />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}