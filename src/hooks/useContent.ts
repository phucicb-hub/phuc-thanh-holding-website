import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchNews,
  fetchNewsById,
  fetchProducts,
  fetchProductById,
  fetchProductByParam,
  fetchProjects,
  fetchProjectById,
  type NewsItem,
  type ProductItem,
  type ProjectItem,
} from '@/lib/content';

interface ListState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

interface DetailState<T> {
  item: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

function createListHook<T>(fetcher: () => Promise<T[]>) {
  return function useList(): ListState<T> {
    const { i18n, t } = useTranslation();
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState(0);

    useEffect(() => {
      let active = true;
      setLoading(true);
      setError(null);
      fetcher()
        .then((data) => {
          if (active) setItems(data);
        })
        .catch((e) => {
          if (active) setError(e instanceof Error ? e.message : t('common.loadError'));
        })
        .finally(() => {
          if (active) setLoading(false);
        });
      return () => {
        active = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tick, i18n.language]);

    const retry = useCallback(() => setTick((t) => t + 1), []);

    return { items, loading, error, retry };
  };
}

function createDetailHook<T, K>(fetcher: (key: K) => Promise<T | null>) {
  return function useDetail(key: K): DetailState<T> {
    const { i18n, t } = useTranslation();
    const [item, setItem] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState(0);

    useEffect(() => {
      let active = true;
      setLoading(true);
      setError(null);
      fetcher(key)
        .then((data) => {
          if (active) setItem(data);
        })
        .catch((e) => {
          if (active) setError(e instanceof Error ? e.message : t('common.loadError'));
        })
        .finally(() => {
          if (active) setLoading(false);
        });
      return () => {
        active = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, tick, i18n.language]);

    const retry = useCallback(() => setTick((t) => t + 1), []);

    return { item, loading, error, retry };
  };
}

export const useNews = createListHook<NewsItem>(fetchNews);
export const useNewsDetail = createDetailHook<NewsItem, number>(fetchNewsById);
export const useProducts = createListHook<ProductItem>(fetchProducts);
export const useProductDetail = createDetailHook<ProductItem, number>(fetchProductById);
export const useProductByParam = createDetailHook<ProductItem, string>(fetchProductByParam);
export const useProjects = createListHook<ProjectItem>(fetchProjects);
export const useProjectDetail = createDetailHook<ProjectItem, number>(fetchProjectById);