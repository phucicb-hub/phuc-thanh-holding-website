import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import OverviewHero from './components/OverviewHero';
import FactsStrip from './components/FactsStrip';
import AboutSection from './components/AboutSection';
import FieldsSection from './components/FieldsSection';
import ValuesSection from './components/ValuesSection';
import OverviewCTA from './components/OverviewCTA';

export default function Overview() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <OverviewHero />
        <FactsStrip />
        <AboutSection />
        <FieldsSection />
        <ValuesSection />
        <OverviewCTA />
      </main>
      <Footer />
    </div>
  );
}