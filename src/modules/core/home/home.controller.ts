import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { buildToolPath } from '../../../shared/utils/buildToolPath.js'
import { tools } from '../../../shared/data/tools.js'
import type { SupportedLocale } from '../../../shared/types/supportedLocale.js'

export const getMain = catchAsync(async (req, res) => {
  const lang = (req.params.lang ?? 'cs') as SupportedLocale

  const featuredTools = tools
    .filter((t) => t.featured !== null && t.enabled[lang])
    .sort((a, b) => a.featured! - b.featured!)
    .slice(0, 6)
    .map((t) => ({
      ...t,
      resolvedTitle: t.title[lang],
      resolvedDescription: t.description[lang],
      resolvedPath: buildToolPath(lang, t.categoryPath, t.slug),
      resolvedCategoryName: t.categoryName[lang],
    }))

  res.render('pages/core/home', {
    ...buildSeoMeta({
      title: req.t('common:home.title'),
      description: req.t('common:home.description'),
      path: `/${lang}/faq`,
      lang,
    }),
    tools: featuredTools,
    lang,
  })
})

export const getFAQ = catchAsync(async (req, res) => {
  const lang = (req.params.lang ?? 'cs') as SupportedLocale

  res.render('pages/core/info/faq', {
    ...buildSeoMeta({
      title: req.t('common:faq.title'),
      description: req.t('common:faq.description'),
      path: `/${lang}/faq`,
      lang,
    }),
    lang,
  })
})
