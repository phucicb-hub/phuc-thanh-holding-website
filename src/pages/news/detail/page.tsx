import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useNews, useNewsDetail } from '@/hooks/useContent';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';
import { FLAGSHIP_LINKS } from '@/lib/content';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function renderParagraphWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#046842] font-semibold underline underline-offset-2 hover:text-[#025938] inline-flex items-center gap-0.5 mx-0.5"
        >
          {part}
          <i className="ri-external-link-line text-xs" />
        </a>
      );
    }
    return part;
  });
}

export default function NewsDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = useLang();
  const articleId = Number(id);
  const { item: article, loading, error, retry } = useNewsDetail(articleId);
  const { items: allArticles } = useNews();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
            <p className="text-sm text-foreground-600">{t('detail.loadingNews')}</p>
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

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-file-unknow-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <h1 className="text-xl font-bold text-foreground-900 mb-2">{t('detail.newsNotFound')}</h1>
            <p className="text-sm text-foreground-600 mb-6">
              {t('detail.newsNotFoundDesc')}
            </p>
            <a
              href={getLocalizedPath('news', lang)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              {t('detail.backToNews')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = allArticles.filter((a) => a.id !== articleId).slice(0, 3);
  const fullText = (article.title + ' ' + (article.content || []).join(' ') + ' ' + (article.tags || []).join(' ')).toLowerCase();
  const matchedPlatform = Object.entries(FLAGSHIP_LINKS).find(([key, url]) => {
    return fullText.includes(key) || fullText.includes(url.toLowerCase().replace('https://', ''));
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={article.category.toUpperCase()}
          badgeIcon="ri-newspaper-line"
          title={article.title}
          breadcrumb={[
            { label: t('common.home'), href: getLocalizedPath('home', lang) },
            { label: t('detail.newsCategory'), href: getLocalizedPath('news', lang) },
            { label: article.title },
          ]}
          image={article.image}
        />

        <article className="py-12 md:py-16 bg-background-50">
          <div className="container-main max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-500 mb-6">
              <span className="inline-flex items-center gap-1">
                <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent-100 text-accent-900 font-medium">
                {article.category}
              </span>
            </div>

            {matchedPlatform && (
              <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-[#f0fdf4] to-white border-2 border-[#046842]/20 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#046842] uppercase tracking-wider mb-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#046842]" />
                      </span>
                      <span>{lang === 'vi' ? 'Trải nghiệm nền tảng trực tuyến' : 'Live Cloud Platform'}</span>
                    </div>
                    <div className="text-base font-bold text-gray-900">
                      {matchedPlatform[1].replace('https://', '')}
                    </div>
                  </div>
                  <a
                    href={matchedPlatform[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#046842] hover:bg-[#025938] text-white rounded-lg transition-all shadow-[0_4px_14px_rgba(4,104,66,0.25)] hover:shadow-[0_6px_20px_rgba(4,104,66,0.35)] whitespace-nowrap"
                  >
                    <span>{lang === 'vi' ? 'Khám phá ngay' : 'Launch Platform'}</span>
                    <i className="ri-external-link-line" />
                  </a>
                </div>
              </div>
            )}

            {article.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sm md:text-base text-foreground-700 leading-relaxed mb-4"
              >
                {renderParagraphWithLinks(paragraph)}
              </p>
            ))}

            {matchedPlatform && (
              <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    {lang === 'vi' ? 'Bắt đầu sử dụng giải pháp này ngay hôm nay' : 'Deploy This Solution Today'}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {lang === 'vi' ? 'Truy cập cổng ứng dụng chính thức của Phúc Thành Holding' : 'Access the official application portal of Phuc Thanh Holding'}
                  </p>
                </div>
                <a
                  href={matchedPlatform[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold bg-[#046842] hover:bg-[#025938] text-white rounded-lg transition-all whitespace-nowrap"
                >
                  <span>{matchedPlatform[1].replace('https://', '')}</span>
                  <i className="ri-external-link-line" />
                </a>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-background-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-background-100 text-foreground-600 rounded-full whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-12 md:py-16 bg-background-100">
            <div className="container-main">
              <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-6 md:mb-8">
                {t('detail.relatedNews')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {related.map((item) => (
                  <a
                    key={item.id}
                    href={detailHref('news', item.id, lang)}
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
                      <span className="text-xs text-foreground-500 mb-2">
                        {formatDate(item.date)}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {item.title}
                      </span>
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