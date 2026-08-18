import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroCarousel from './components/HeroCarousel';
import ServiceCards from './components/ServiceCards';
import BrandBar from './components/BrandBar';
import QuickLinks from './components/QuickLinks';
import PartnersSection from './components/PartnersSection';
import LatestNews from './components/LatestNews';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <BrandBar />
        <ServiceCards />
        <QuickLinks />
        <LatestNews />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}