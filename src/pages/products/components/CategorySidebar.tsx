import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProductCategory } from '@/mocks/products';

interface CategorySidebarProps {
  categories: ProductCategory[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export default function CategorySidebar({ categories, activeCategory, onSelect }: CategorySidebarProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeLabel = categories.find((c) => c.id === activeCategory)?.label || categories[0]?.label || '';

  const renderList = () => (
    <ul className="divide-y divide-background-100">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <li key={cat.id}>
            <button
              onClick={() => {
                onSelect(cat.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-foreground-700 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="truncate whitespace-nowrap">{cat.label}</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {isActive && <span className="w-1 h-5 bg-accent-500 rounded-full" />}
                <i
                  className={`ri-arrow-right-s-line w-4 h-4 flex items-center justify-center ${
                    isActive ? 'text-white' : 'text-foreground-400'
                  }`}
                />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block rounded-xl border border-background-200 bg-background-50 overflow-hidden h-fit">
        <div className="px-4 py-3 border-b border-background-200">
          <h2 className="text-sm font-bold text-foreground-900 tracking-wide">{t('products.categoryTitle')}</h2>
        </div>
        {renderList()}
      </aside>

      {/* Mobile / tablet dropdown */}
      <div className="lg:hidden rounded-xl border border-background-200 bg-background-50 overflow-hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground-900 cursor-pointer"
        >
          <span className="flex items-center gap-2 min-w-0">
            <i className="ri-menu-3-line w-4 h-4 flex items-center justify-center text-primary-600 shrink-0" />
            <span className="truncate whitespace-nowrap">{activeLabel}</span>
          </span>
          <i
            className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform shrink-0 ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {mobileOpen && <div className="border-t border-background-200">{renderList()}</div>}
      </div>
    </>
  );
}