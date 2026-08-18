import { useLocation } from 'react-router-dom';
import { resolveLocale } from '@/lib/routes';

export type Lang = 'vi' | 'en';

export default function useLang(): Lang {
  const location = useLocation();
  return resolveLocale(location.pathname);
}