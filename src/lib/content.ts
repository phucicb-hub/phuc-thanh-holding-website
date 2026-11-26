import { apiRequest } from '@/lib/api';
import i18n from '@/i18n';
import { detailHref, type Locale } from '@/lib/routes';

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  content: string[];
  tags: string[];
}

export interface ProductItem {
  id: number;
  categoryId: string;
  slug: string | null;
  title: string;
  description: string;
  image: string;
  featured: boolean;
  date: string;
  features: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
  year: string;
  content: string[];
}

function isEnglish(): boolean {
  return i18n.language?.startsWith('en') ?? false;
}

export type ContentSection = 'news' | 'products' | 'projects';

function hasEnglish(row: { title_en?: string | null }): boolean {
  return Boolean(row.title_en && row.title_en.trim().length > 0);
}

export async function checkContentTranslation(section: ContentSection, param: string, targetLocale: Locale): Promise<boolean> {
  if (targetLocale === 'vi') return true;
  const row = await apiRequest<{ title_en?: string | null } | null>('/content/content_' + section + '/' + encodeURIComponent(param));
  return !row || hasEnglish(row);
}

interface NewsRow {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  content: string[];
  tags: string[];
  title_en?: string | null;
  category_en?: string | null;
  excerpt_en?: string | null;
  content_en?: string[] | null;
  tags_en?: string[] | null;
}

function mapNews(row: NewsRow): NewsItem {
  const en = isEnglish();
  return {
    id: row.id,
    title: en && row.title_en ? row.title_en : row.title,
    category: en && row.category_en ? row.category_en : row.category,
    excerpt: en && row.excerpt_en ? row.excerpt_en : row.excerpt,
    date: row.date,
    image: row.image,
    content: en && row.content_en ? row.content_en : row.content,
    tags: en && row.tags_en ? row.tags_en : row.tags,
  };
}

interface ProductRow {
  id: number;
  category_id: string;
  slug?: string | null;
  title: string;
  description: string;
  image: string;
  featured: boolean;
  date: string;
  features: string[];
  title_en?: string | null;
  description_en?: string | null;
  features_en?: string[] | null;
}

function mapProduct(row: ProductRow): ProductItem {
  const en = isEnglish();
  return {
    id: row.id,
    categoryId: row.category_id,
    slug: row.slug ?? null,
    title: en && row.title_en ? row.title_en : row.title,
    description: en && row.description_en ? row.description_en : row.description,
    image: row.image,
    featured: row.featured,
    date: row.date,
    features: en && row.features_en ? row.features_en : row.features,
  };
}

interface ProjectRow {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
  year: string;
  content: string[];
  title_en?: string | null;
  category_en?: string | null;
  description_en?: string | null;
  status_en?: string | null;
  content_en?: string[] | null;
}

function mapProject(row: ProjectRow): ProjectItem {
  const en = isEnglish();
  return {
    id: row.id,
    title: en && row.title_en ? row.title_en : row.title,
    category: en && row.category_en ? row.category_en : row.category,
    description: en && row.description_en ? row.description_en : row.description,
    image: row.image,
    status: en && row.status_en ? row.status_en : row.status,
    year: row.year,
    content: en && row.content_en ? row.content_en : row.content,
  };
}

export async function fetchNews(): Promise<NewsItem[]> {
  const rows = await apiRequest<NewsRow[]>('/content/content_news');
  return (isEnglish() ? rows.filter(hasEnglish) : rows).map(mapNews).sort((a,b) => b.date.localeCompare(a.date));
}
export async function fetchNewsById(id: number): Promise<NewsItem | null> {
  const row = await apiRequest<NewsRow | null>('/content/content_news/' + id);
  return row ? mapNews(row) : null;
}
export function productHref(product: ProductItem): string {
  const locale: Locale = isEnglish() ? 'en' : 'vi';
  return detailHref('products', product.slug ?? String(product.id), locale);
}
export async function fetchProducts(): Promise<ProductItem[]> {
  const rows = await apiRequest<ProductRow[]>('/content/content_products');
  return (isEnglish() ? rows.filter(hasEnglish) : rows).map(mapProduct);
}
export async function fetchProductById(id: number): Promise<ProductItem | null> { return fetchProductByParam(String(id)); }
export async function fetchProductBySlug(slug: string): Promise<ProductItem | null> { return fetchProductByParam(slug); }
export async function fetchProductByParam(param: string): Promise<ProductItem | null> {
  const row = await apiRequest<ProductRow | null>('/content/content_products/' + encodeURIComponent(param));
  return row ? mapProduct(row) : null;
}
export async function fetchProjects(): Promise<ProjectItem[]> {
  const rows = await apiRequest<ProjectRow[]>('/content/content_projects');
  return (isEnglish() ? rows.filter(hasEnglish) : rows).map(mapProject);
}
export async function fetchProjectById(id: number): Promise<ProjectItem | null> {
  const row = await apiRequest<ProjectRow | null>('/content/content_projects/' + id);
  return row ? mapProject(row) : null;
}

export type SearchResultType = 'news' | 'products' | 'projects';

export interface SearchResult {
  id: number;
  type: SearchResultType;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
}

async function searchContentLocally(query: string, locale: Locale): Promise<SearchResult[]> {
  const q = query.toLowerCase();
  const [news, products, projects] = await Promise.all([
    fetchNews(),
    fetchProducts(),
    fetchProjects(),
  ]);

  const matches = (...texts: (string | string[])[]): boolean =>
    texts.some((text) => {
      if (Array.isArray(text)) return text.some((x) => x.toLowerCase().includes(q));
      return text.toLowerCase().includes(q);
    });

  const results: SearchResult[] = [];
  news.forEach((n) => {
    if (matches(n.title, n.excerpt, n.category, n.tags)) {
      results.push({ id: n.id, type: 'news', title: n.title, excerpt: n.excerpt, date: n.date, image: n.image, href: detailHref('news', n.id, locale) });
    }
  });
  products.forEach((p) => {
    if (matches(p.title, p.description, p.features)) {
      results.push({ id: p.id, type: 'products', title: p.title, excerpt: p.description, date: p.date, image: p.image, href: detailHref('products', p.slug ?? p.id, locale) });
    }
  });
  projects.forEach((pr) => {
    if (matches(pr.title, pr.description, pr.category)) {
      results.push({ id: pr.id, type: 'projects', title: pr.title, excerpt: pr.description, date: pr.year, image: pr.image, href: detailHref('projects', pr.id, locale) });
    }
  });
  return results;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];
  const locale: Locale = isEnglish() ? 'en' : 'vi';
  return searchContentLocally(q, locale);
}
