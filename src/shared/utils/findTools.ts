import { tools } from '../data/tools.js'
import { supportedLocales } from '../types/supportedLocale.js'

// Finds a tool by its slug -- useful for dynamic routing or API endpoints
// that receive URL slugs rather than stable tool IDs
// Currently unused
export const findToolBySlug = (slug: string) => {
  return tools.find((t) => supportedLocales.some((l) => t.slug[l] === slug))
}

// Finds a tool by its stable internal ID decoupled from locale-specific slugs
export const findToolById = (id: string) => tools.find((t) => t.id === id)
