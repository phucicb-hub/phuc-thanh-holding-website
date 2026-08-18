import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { productCategories } from '@/mocks/products';
import useLang from '@/hooks/useLang';
import { useProducts, useProductByParam } from '@/hooks/useContent';
import { productHref } from '@/lib/content';
import { detailHref, getLocalizedPath } from '@/lib/routes';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = useLang();
  const param = id ?? '';
  const isNumeric = /^\d+$/.test(param);
  const { item: product, loading, error, retry } = useProductByParam(param);
  const { items: allProducts } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
            <p className="text-sm text-foreground-600">{t('detail.loadingProduct')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <p className="text-sm text-foreground-600 mb-6">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
              {t('common.retry')}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-inbox-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <h1 className="text-xl font-bold text-foreground-900 mb-2">{t('detail.productNotFound')}</h1>
            <p className="text-sm text-foreground-600 mb-6">
              {t('detail.productNotFoundDesc')}
            </p>
            <a
              href={getLocalizedPath('products', lang)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              {t('detail.backToProducts')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isNumeric && product.slug) {
    return <Navigate to={detailHref('products', product.slug as string, lang)} replace />;
  }

  const categoryLabel =
    productCategories[lang].find((c) => c.id === product.categoryId)?.label || t('detail.fallbackCategory');

  const related = allProducts.filter((p) => p.id !== product.id && p.categoryId === product.categoryId);
  const relatedFinal = (related.length > 0 ? related : allProducts.filter((p) => p.id !== product.id)).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={categoryLabel.toUpperCase()}
          badgeIcon="ri-box-3-line"
          title={product.title}
          description={product.description}
          breadcrumb={[
            { label: t('common.home'), href: getLocalizedPath('home', lang) },
            { label: t('detail.productCategory'), href: getLocalizedPath('products', lang) },
            { label: product.title },
          ]}
          image={product.image}
        />

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
                  <img
                    src={product.image}
                    alt={product.title}
                    title={product.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {product.featured && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-accent-500 text-foreground-950 rounded-sm">
                      {t('products.featured')}
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-500 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent-100 text-accent-900 font-medium">
                    {categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                    {t('detail.updated')} {formatDate(product.date)}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-bold text-foreground-900 mb-4">
                  {t('detail.keyFeatures')}
                </h2>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-700">
                      <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  {t('common.contactConsult')}
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {relatedFinal.length > 0 && (
          <section className="py-12 md:py-16 bg-background-100">
            <div className="container-main">
              <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-6 md:mb-8">
                {t('detail.relatedProducts')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {relatedFinal.map((item) => (
                  <a
                    key={item.id}
                    href={productHref(item)}
                    className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 md:p-5 flex flex-col flex-1">
                      <span className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {item.title}
                      </span>
                      <p className="text-xs md:text-sm text-foreground-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}