// Tool details tools.ts file
export interface ToolsDetails {
  title: string
  description: string
  path: string
  slug: string
  icon: string
  categoryName: string
  categoryPath: string
  enabled: boolean
  // featured: null means not featured. Number sets display order on the homepage (1 = first).
  featured: number | null
}
