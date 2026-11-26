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
    <div className="min-h-screen flex flex-col bg-[#07080a] text-[#f5f5f7]">
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
        <div className="bg-[#0a0c10] border-t border-white/[0.06]">
          <CompanyIdentity />
        </div>

        {/* Latest Announcements & News */}
        <div className="bg-[#07080a] border-t border-white/[0.06]">
          <LatestNews />
        </div>

        {/* Ecosystem Partners */}
        <div className="bg-[#0a0c10] border-t border-white/[0.06]">
          <PartnersSection />
        </div>

        {/* Act 6: Minimalist Partnership Terminal & CTA */}
        <AppleTerminalCTA />
      </main>
      <Footer />
    </div>
  );
}
