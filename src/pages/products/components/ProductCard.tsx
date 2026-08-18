import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { productHref, type ProductItem } from '@/lib/content';

export default function ProductCard({ product, style }: { product: ProductItem; style?: CSSProperties }) {
  const { t } = useTranslation();
  const href = productHref(product);
  return (
    <article
      style={style}
      className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
    >
      <a href={href} className="relative block overflow-hidden aspect-[16/10]">
        <img
          src={product.image}
          alt={product.title}
          title={product.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold bg-accent-500 text-foreground-950 rounded-sm">
            {t('products.featured')}
          </span>
        )}
      </a>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <a
          href={href}
          className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2"
        >
          {product.title}
        </a>
        <p className="text-xs md:text-sm text-foreground-600 mb-4 flex-1 line-clamp-3">
          {product.description}
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
        >
          {t('common.viewDetail')}
          <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
        </a>
      </div>
    </article>
  );
}