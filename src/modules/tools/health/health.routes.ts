import { Router } from 'express'
import type { Request } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { buildToolPath } from '../../../shared/utils/buildToolPath.js'
import { tools } from '../../../shared/data/tools.js'
import type { SupportedLocale } from '../../../shared/types/supportedLocale.js'
import bmiRoutes from './bmi/bmi.routes.js'

const router = Router({ mergeParams: true })

// req.params.lang is not typed by default on Express Request when the param comes
// from a parent router via mergeParams. Explicitly typing Request<{ lang: string }>
// makes the parameter available and the cast to SupportedLocale narrows it to a valid locale.
router.get('/', (req: Request<{ lang: string }>, res) => {
  const lang = req.params.lang as SupportedLocale
  const categoryTools = tools
    .filter((t) => t.categoryPath === '/health' && t.enabled[lang])
    .map((t) => ({
      ...t,
      resolvedTitle: t.title[lang],
      resolvedDescription: t.description[lang],
      resolvedPath: buildToolPath(lang, t.categoryPath, t.slug),
    }))

  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: req.t('category.health.title'),
      description: req.t('category.health.description'),
      path: `/${lang}/health`,
      lang,
    }),
    toolCategory: req.t('category.health.title'),
    toolCategoryPath: `/${lang}/health`,
    toolCategoryDescription: req.t('category.health.categoryDescription'),
    tools: categoryTools,
    lang,
  })
})

router.use('/bmi-kalkulacka', bmiRoutes) // cs + sk (same slug)

export default router
