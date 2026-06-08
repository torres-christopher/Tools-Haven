import type { SupportedLocale } from './supportedLocale.js'

// Tool details tools.ts file
export interface ToolsDetails {
  id: string
  title: Record<SupportedLocale, string>
  description: Record<SupportedLocale, string>
  slug: Record<SupportedLocale, string>
  categoryName: Record<SupportedLocale, string>
  categoryPath: string
  icon: string
  enabled: Record<SupportedLocale, boolean>
  // featured: null means not featured. Number sets display order on the homepage (1 = first).
  featured: number | null
}
