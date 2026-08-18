import { supabase } from '@/lib/supabase';
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

export async function checkContentTranslation(
  section: ContentSection,
  param: string,
  targetLocale: Locale,
): Promise<boolean> {
  if (targetLocale === 'vi') return true;

  const isId = /^\d+$/.test(param);
  let data: { title_en?: string | null } | null = null;

  if (section === 'news') {
    const res = await supabase
      .from('content_news')
      .select('title_en')
      .eq('id', Number(param))
      .maybeSingle();
    data = res.data as { title_en?: string | null } | null;
  } else if (section === 'products') {
    const query = supabase.from('content_products').select('title_en');
    const res = isId
      ? await query.eq('id', Number(param)).maybeSingle()
      : await query.eq('slug', param).maybeSingle();
    data = res.data as { title_en?: string | null } | null;
  } else {
    const res = await supabase
      .from('content_projects')
      .select('title_en')
      .eq('id', Number(param))
      .maybeSingle();
    data = res.data as { title_en?: string | null } | null;
  }

  if (!data) return true;
  return hasEnglish(data);
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
  const { data, error } = await supabase
    .from('content_news')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  const rows = (data as NewsRow[]) ?? [];
  const visible = isEnglish() ? rows.filter(hasEnglish) : rows;
  return visible.map(mapNews);
}

export async function fetchNewsById(id: number): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('content_news')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapNews(data as NewsRow) : null;
}

export function productHref(product: ProductItem): string {
  const locale = i18n.language?.startsWith('en') ? 'en' : 'vi';
  const param = product.slug ?? String(product.id);
  return detailHref('products', param, locale);
}

export async function fetchProducts(): Promise<ProductItem[]> {
  const { data, error } = await supabase
    .from('content_products')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  const rows = (data as ProductRow[]) ?? [];
  const visible = isEnglish() ? rows.filter(hasEnglish) : rows;
  return visible.map(mapProduct);
}

export async function fetchProductById(id: number): Promise<ProductItem | null> {
  const { data, error } = await supabase
    .from('content_products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : null;
}

export async function fetchProductBySlug(slug: string): Promise<ProductItem | null> {
  const { data, error } = await supabase
    .from('content_products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : null;
}

export async function fetchProductByParam(param: string): Promise<ProductItem | null> {
  if (/^\d+$/.test(param)) {
    return fetchProductById(Number(param));
  }
  return fetchProductBySlug(param);
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  const { data, error } = await supabase
    .from('content_projects')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  const rows = (data as ProjectRow[]) ?? [];
  const visible = isEnglish() ? rows.filter(hasEnglish) : rows;
  return visible.map(mapProject);
}

export async function fetchProjectById(id: number): Promise<ProjectItem | null> {
  const { data, error } = await supabase
    .from('content_projects')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProject(data as ProjectRow) : null;
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

interface SearchResultRow {
  id: number;
  type: SearchResultType;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string | null;
}

function mapSearchResult(row: SearchResultRow, locale: Locale): SearchResult {
  const param = row.type === 'products' && row.slug ? row.slug : row.id;
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    image: row.image,
    href: detailHref(row.type, param, locale),
  };
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

  const locale: Locale = i18n.language?.startsWith('en') ? 'en' : 'vi';
  const { data, error } = await supabase.rpc('search_site_content', {
    search_query: q,
    search_locale: locale,
    result_limit: 50,
  });

  if (!error) return ((data as SearchResultRow[]) ?? []).map((row) => mapSearchResult(row, locale));

  // Keep search available while an older environment is waiting for the migration.
  if (error.code === 'PGRST202' || error.message.includes('search_site_content')) {
    return searchContentLocally(q, locale);
  }
  throw error;
}
