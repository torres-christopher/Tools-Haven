import { Router } from 'express'
import type { Request } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { buildToolPath } from '../../../shared/utils/buildToolPath.js'
import { tools } from '../../../shared/data/tools.js'
import type { SupportedLocale } from '../../../shared/types/supportedLocale.js'
import jsonValidatorRoutes from './json-validator/json-validator.routes.js'

const router = Router({ mergeParams: true })

// req.params.lang is not typed by default on Express Request when the param comes
// from a parent router via mergeParams. Explicitly typing Request<{ lang: string }>
// makes the parameter available and the cast to SupportedLocale narrows it to a valid locale.
router.get('/', (req: Request<{ lang: string }>, res) => {
  const lang = req.params.lang as SupportedLocale
  const categoryTools = tools
    .filter((t) => t.categoryPath === '/developer' && t.enabled[lang])
    .map((t) => ({
      ...t,
      resolvedTitle: t.title[lang],
      resolvedDescription: t.description[lang],
      resolvedPath: buildToolPath(lang, t.categoryPath, t.slug),
    }))

  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: req.t('category.developer.title'),
      description: req.t('category.developer.description'),
      path: `/${lang}/developer`,
      lang,
    }),
    toolCategory: req.t('category.developer.title'),
    toolCategoryPath: `/${lang}/developer`,
    toolCategoryDescription: req.t('category.developer.categoryDescription'),
    tools: categoryTools,
    lang,
  })
})

router.use('/json-validator', jsonValidatorRoutes) // cs + sk (same slug)

export default router
