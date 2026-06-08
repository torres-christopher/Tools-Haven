import { catchAsync } from '../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../shared/utils/seoMeta.js'
import { buildToolPath } from '../../shared/utils/buildToolPath.js'
import { tools } from '../../shared/data/tools.js'
import { supportedLocales } from '../../shared/types/supportedLocale.js'
import type { SupportedLocale } from '../../shared/types/supportedLocale.js'
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
  const staticPaths = ['/']

  const langPaths = supportedLocales.flatMap((lang) => [
    `/${lang}`,
    `/${lang}/tools`,
    `/${lang}/faq`,
    `/${lang}/contact`,
    `/${lang}/privacy`,
    `/${lang}/terms`,
  ])

  // Generate one path per tool per enabled language
  const toolPaths = tools.flatMap((tool) =>
    supportedLocales
      .filter((lang: SupportedLocale) => tool.enabled[lang])
      .map((lang: SupportedLocale) => buildToolPath(lang, tool.categoryPath, tool.slug)),
  )

  const allPaths = [...staticPaths, ...langPaths, ...toolPaths]

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

// Všechny nástroje page — lang comes from route param once routing is wired up
export const getAllTools = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale

  const enabledTools = tools
    .filter((t) => t.enabled[lang])
    .map((t) => ({
      ...t,
      resolvedTitle: t.title[lang],
      resolvedDescription: t.description[lang],
      resolvedPath: buildToolPath(lang, t.categoryPath, t.slug),
    }))

  const groupedTools = enabledTools.reduce<Record<string, typeof enabledTools>>((acc, tool) => {
    const category = tool.categoryName[lang]
    if (!acc[category]) acc[category] = []
    acc[category].push(tool)
    return acc
  }, {})

  res.render('pages/core/vsechny-nastroje', {
    ...buildSeoMeta({
      title: req.t('common:allTools.title'),
      description: req.t('common:allTools.description'),
      path: `/${lang}/tools`,
      lang,
    }),
    tools: groupedTools,
    lang,
  })
})
