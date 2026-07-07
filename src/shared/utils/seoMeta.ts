import { env } from '../../config/env.js'
import type { SeoInput, SeoMeta } from '../types/seo.js'

export const buildSeoMeta = (input: SeoInput) => {
  const output: SeoMeta = {
    title: input.seoTitle ?? input.title,
    metaDescription: input.description,
    canonicalPath: input.path,

    ogTitle: input.seoTitle ?? input.title,
    ogDescription: input.description,
    ogImage: `${env.SITE_URL}/images/og-default.png`,

    toolName: input.title,
    toolPath: input.path,
    toolDescription: input.description,
    categoryName: input?.categoryName,
    categoryPath: input?.categoryPath,

    // JSON-LD is only generated for tool pages (which have a categoryName).
    // Core pages (home, legal, FAQ) get no structured data.
    jsonLd: input.categoryName
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: input.title,
          description: input.description,
          url: `${env.SITE_URL}${input.path}`,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Web',
          inLanguage: input.lang ?? 'cs',
        }
      : undefined,
  }
  return output
}
