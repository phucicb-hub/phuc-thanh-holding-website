import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { heroSlides } from '@/mocks/home';
import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';

export default function HeroCarousel() {
  const { t } = useTranslation();
  const lang = useLang();
  const slides = heroSlides[lang];
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden bg-background-200">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt={slide.title}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container-main">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg text-white/90 mb-6">
                  {slide.subtitle}
                </p>
                <a
                  href={localizeLegacyHref(slide.href, lang)}
                  className="inline-block px-6 py-3 bg-accent-500 text-foreground-950 font-semibold rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
                >
                  {slide.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <div className="absolute bottom-6 right-4 md:right-8 z-20 flex items-center gap-3">
        {/* Dots with numbers */}
        <div className="flex items-center gap-2 mr-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`text-sm font-medium transition-colors ${
                index === current
                  ? 'text-accent-500'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center border border-white/40 text-white hover:bg-white/20 transition-colors rounded-sm"
          aria-label={t('hero.prev')}
        >
          <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center border border-white/40 text-white hover:bg-white/20 transition-colors rounded-sm"
          aria-label={t('hero.next')}
        >
          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center" />
        </button>
      </div>
    </section>
  );
}
