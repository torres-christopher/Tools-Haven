import { catchAsync } from '../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../shared/utils/seoMeta.js'
import { tools } from '../../shared/data/tools.js'
import { env } from '../../config/env.js'

// Generate robots
export const getRobots = catchAsync(async (_req, res) => {
  const content = `User-agent: *
Allow: /
Disallow: /health

Sitemap: ${env.SITE_URL}/sitemap.xml`

  res.header('Content-Type', 'text/plain')
  res.send(content)
})

// Generate sitemap
export const getSitemap = catchAsync(async (_req, res) => {
  const staticPaths = [
    '/',
    '/vsechny-nastroje',
    '/faq',
    '/kontakt',
    '/ochrana-osobnich-udaju',
    '/podminky-pouziti',
  ]

  // Get tool paths
  const toolPaths = tools.filter((t) => t.enabled).map((t) => t.path)

  const allPaths = [...staticPaths, ...toolPaths]

  const urls = allPaths
    .map(
      (path) =>
        `<url>
  <loc>${env.SITE_URL}${path}</loc>
  <changefreq>weekly</changefreq>
  <priority>${path === '/' ? '1.0' : '0.8'}</priority>
</url>`,
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`

  res.header('Content-Type', 'application/xml')
  res.send(xml)
})

// Všechny nástroje page
export const getAllTools = catchAsync(async (_req, res) => {
  const enabledTools = tools.filter((t) => t.enabled)
  const groupedTools = enabledTools.reduce<Record<string, typeof tools>>((acc, tool) => {
    if (!acc[tool.categoryName]) acc[tool.categoryName] = []
    acc[tool.categoryName].push(tool)
    return acc
  }, {})

  res.render('pages/core/vsechny-nastroje', {
    ...buildSeoMeta({
      title: 'Všechny nástroje',
      description:
        'Přehled všech bezplatných online nástrojů - počítadlo znaků, převod velikosti písmen, JSON validátor, BMI kalkulačka a inflační kalkulačka. Zdarma, bez registrace.',
      path: '/vsechny-nastroje',
    }),
    tools: groupedTools,
  })
})
