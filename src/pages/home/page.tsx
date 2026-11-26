import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import AppleHero from './components/AppleHero';
import AppleEcosystem from './components/AppleEcosystem';
import AppleMetrics from './components/AppleMetrics';
import AppleSecurityArchitecture from './components/AppleSecurityArchitecture';
import AppleVentures from './components/AppleVentures';
import AppleTerminalCTA from './components/AppleTerminalCTA';
import PartnersSection from './components/PartnersSection';
import LatestNews from './components/LatestNews';
import CompanyIdentity from './components/CompanyIdentity';
import { useScrollCraft } from '@/lib/scrollcraft/useScrollCraft';

export default function Home() {
  const scrollRef = useScrollCraft();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd] text-[#1d1d1f]">
      <Navbar />
      <main ref={scrollRef} className="flex-1 overflow-x-hidden">
        {/* Act 1: The Dimensional Hero */}
        <AppleHero />

        {/* Act 2: The Sovereign Matrix Unfold (Bento Grid) */}
        <AppleEcosystem />

        {/* Act 3: Live Kinetic Capabilities & Numbers Bloom */}
        <AppleMetrics />

        {/* Act 4: Enterprise Security & Architectural Proof (The Peak) */}
        <AppleSecurityArchitecture />

        {/* Act 5: Proven Ventures & Capability Execution */}
        <AppleVentures />

        {/* Sovereign Entity Verification */}
        <div className="bg-[#f8fafc] border-t border-gray-200/80">
          <CompanyIdentity />
        </div>

        {/* Latest Announcements & News */}
        <div className="bg-[#ffffff] border-t border-gray-200/80">
          <LatestNews />
        </div>

        {/* Ecosystem Partners */}
        <div className="bg-[#f8fafc] border-t border-gray-200/80">
          <PartnersSection />
        </div>

        {/* Act 6: Minimalist Partnership Terminal & CTA */}
        <AppleTerminalCTA />
      </main>
      <Footer />
    </div>
  );
}
