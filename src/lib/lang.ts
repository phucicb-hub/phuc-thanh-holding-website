export type Localized<T> = { vi: T; en: T };

export function isEnglish(lang?: string): boolean {
  return lang?.startsWith('en') ?? false;
}