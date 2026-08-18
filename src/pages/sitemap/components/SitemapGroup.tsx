import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { SitemapGroup } from '@/mocks/sitemap';
import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function highlightText(text: string, query: string): ReactNode {
  const q = normalize(query.trim());
  if (!q) return text;

  const idx = normalize(text).indexOf(q);
  if (idx === -1) return text;

  const matchLength = query.trim().length;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + matchLength);
  const after = text.slice(idx + matchLength);

  return (
    <>
      {before}
      <mark className="bg-accent-200 text-foreground-950 rounded-sm px-0.5">{match}</mark>
      {after}
    </>
  );
}

interface SitemapGroupProps {
  group: SitemapGroup;
  query: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export default function SitemapGroupCard({
  group,
  query,
  isOpen,
  onToggle,
}: SitemapGroupProps) {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => onToggle(group.id)}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer hover:bg-background-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors"
      >
        <span className="w-10 h-10 flex items-center justify-center rounded-md bg-primary-100 text-primary-600 shrink-0">
          <i className={`${group.icon} w-5 h-5 flex items-center justify-center text-lg`} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm md:text-base font-semibold text-foreground-900">
            {highlightText(group.title, query)}
          </span>
          <span className="block text-xs text-foreground-500 mt-0.5">
            {t('sitemap.linkCount', { count: group.links.length })}
          </span>
        </span>
        <span
          className={`w-6 h-6 flex items-center justify-center shrink-0 rounded-full ${
            isOpen ? 'bg-primary-500 text-background-50' : 'bg-secondary-100 text-secondary-700'
          } transition-colors`}
        >
          <i
            className={`${
              isOpen ? 'ri-subtract-line' : 'ri-add-line'
            } w-4 h-4 flex items-center justify-center text-base`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-background-200/60">
          <p className="text-xs md:text-sm text-foreground-600 leading-relaxed pt-3 mb-3">
            {highlightText(group.description, query)}
          </p>

          <ul className="space-y-1">
            {group.links.map((link) => {
              const isSub = link.level === 2;
              const content = highlightText(link.label, query);

              if (!link.href) {
                return (
                  <li key={link.label} className={isSub ? 'ml-4 pl-4 border-l-2 border-background-200' : ''}>
                    <span
                      className={`flex items-start flex-wrap gap-x-2 gap-y-1 px-3 py-2 rounded-md text-sm text-foreground-500 ${
                        isSub ? '' : 'font-medium'
                      }`}
                    >
                      {isSub ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-background-300 shrink-0" />
                      ) : (
                        <i className="ri-file-line w-4 h-4 flex items-center justify-center text-foreground-400 shrink-0" />
                      )}
                      <span className="flex-1 min-w-0 leading-snug">{content}</span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={link.label} className={isSub ? 'ml-4 pl-4 border-l-2 border-background-200' : ''}>
                  <a
                    href={localizeLegacyHref(link.href as string, lang)}
                    className={`group flex items-start flex-wrap gap-x-2 gap-y-1 px-3 py-2 rounded-md text-sm transition-colors ${
                      isSub
                        ? 'text-foreground-700 hover:text-primary-600 hover:bg-background-100'
                        : 'font-medium text-foreground-800 hover:text-primary-600 hover:bg-background-100'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 active:bg-background-200`}
                  >
                    {isSub ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-300 group-hover:bg-primary-500 shrink-0 transition-colors" />
                    ) : (
                      <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-primary-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    )}
                    <span className="flex-1 min-w-0 leading-snug">{content}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}