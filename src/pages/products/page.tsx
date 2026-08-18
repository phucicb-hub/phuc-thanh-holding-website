import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ProductsHero from './components/ProductsHero';
import ProductsSection from './components/ProductsSection';
import ProductsCTA from './components/ProductsCTA';
import FaqSection from '@/components/feature/FaqSection';

export default function Products() {
  const { t } = useTranslation();

  const productFaq = [
    { question: t('products.faq1.q'), answer: t('products.faq1.a') },
    { question: t('products.faq2.q'), answer: t('products.faq2.a') },
    { question: t('products.faq3.q'), answer: t('products.faq3.a') },
    { question: t('products.faq4.q'), answer: t('products.faq4.a') },
    { question: t('products.faq5.q'), answer: t('products.faq5.a') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProductsHero />

        {/* Intro */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main text-center max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4">
              {t('products.introTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('products.introDesc')}
            </p>
          </div>
        </section>

        <ProductsSection />
        <FaqSection
          items={productFaq}
          scriptId="faq-products-jsonld"
          title={t('products.faqTitle')}
          description={t('products.faqDesc')}
        />
        <ProductsCTA />
      </main>
      <Footer />
    </div>
  );
}