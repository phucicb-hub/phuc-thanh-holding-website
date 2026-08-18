import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import Reveal from '@/components/base/Reveal';
import PtDatalakeHero from './components/PtDatalakeHero';
import PtDatalakeIslands from './components/PtDatalakeIslands';
import PtDatalakeGovernance from './components/PtDatalakeGovernance';
import PtDatalakeLayers from './components/PtDatalakeLayers';
import PtDatalakeSources from './components/PtDatalakeSources';
import PtDatalakeQuality from './components/PtDatalakeQuality';
import PtDatalakeCatalog from './components/PtDatalakeCatalog';
import PtDatalakeSecurity from './components/PtDatalakeSecurity';
import PtDatalakeReports from './components/PtDatalakeReports';
import PtDatalakeAi from './components/PtDatalakeAi';
import PtDatalakeUseCases from './components/PtDatalakeUseCases';
import PtDatalakeRoadmap from './components/PtDatalakeRoadmap';
import PtDatalakeAudience from './components/PtDatalakeAudience';
import PtDatalakeCta from './components/PtDatalakeCta';

export default function PtDatalake() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PtDatalakeHero />
        <Reveal>
          <PtDatalakeIslands />
        </Reveal>
        <Reveal>
          <PtDatalakeGovernance />
        </Reveal>
        <Reveal>
          <PtDatalakeLayers />
        </Reveal>
        <Reveal>
          <PtDatalakeSources />
        </Reveal>
        <Reveal>
          <PtDatalakeQuality />
        </Reveal>
        <Reveal>
          <PtDatalakeCatalog />
        </Reveal>
        <Reveal>
          <PtDatalakeSecurity />
        </Reveal>
        <Reveal>
          <PtDatalakeReports />
        </Reveal>
        <Reveal>
          <PtDatalakeAi />
        </Reveal>
        <Reveal>
          <PtDatalakeUseCases />
        </Reveal>
        <Reveal>
          <PtDatalakeRoadmap />
        </Reveal>
        <Reveal>
          <PtDatalakeAudience />
        </Reveal>
        <Reveal>
          <PtDatalakeCta />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}