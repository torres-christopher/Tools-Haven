import { tools } from '../../shared/data/tools.js'
import { supportedLocales } from '../types/supportedLocale.js'

export const findToolBySlug = (slug: string) => {
  return tools.find((t) => supportedLocales.some((l) => t.slug[l] === slug))
}
