import type { ToolsDetails } from '../types/toolDetails.js'
import type { SupportedLocale } from '../types/supportedLocale.js'
import type { SeoInput } from '../types/seo.js'
import { buildToolPath } from './buildToolPath.js'

// Builds a SeoInput object from a tool registry entry and a language.
// Resolves all locale-specific fields (title, description, slug, categoryName)
// so controllers don't have to do it manually.
export const buildToolSeoInput = (tool: ToolsDetails, lang: SupportedLocale): SeoInput => ({
  title: tool.title[lang],
  seoTitle: tool.seoTitle?.[lang],
  description: tool.description[lang],
  path: buildToolPath(lang, tool.categoryPath, tool.slug),
  lang,
  categoryName: tool.categoryName[lang],
  categoryPath: `/${lang}${tool.categoryPath}`,
})
