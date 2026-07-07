import type { SupportedLocale } from './supportedLocale.js'

export interface SeoInput {
  title: string
  seoTitle?: string
  description: string
  path: string
  categoryName?: string
  categoryPath?: string
  toolName?: string
  toolPath?: string
  lang?: SupportedLocale
}

export interface SeoMeta {
  // For all
  title: string
  metaDescription: string
  canonicalPath: string // Full path only, e.g. '/pocet-znaku' --> SITE_URL is prepended by seoMeta.ts

  // Open Graph --> populated from title/description if not explicitly provided
  ogTitle?: string
  ogDescription?: string
  ogImage?: string

  // Tool specific stuff
  toolName?: string | undefined
  toolPath?: string | undefined
  toolDescription?: string | undefined
  categoryName?: string | undefined
  categoryPath?: string | undefined

  // JSON-LD structured data injected into <script type="application/ld+json"> in the layout
  jsonLd?: object
}
