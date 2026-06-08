import type { SupportedLocale } from '../types/supportedLocale.js'

// Used to dynamically build tool path
export const buildToolPath = (
  lang: SupportedLocale,
  categoryPath: string,
  slug: Record<SupportedLocale, string>,
): string => {
  return `/${lang}${categoryPath}/${slug[lang]}`
}
