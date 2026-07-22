import { Router } from 'express'
import type { Request } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { buildToolPath } from '../../../shared/utils/buildToolPath.js'
import { tools } from '../../../shared/data/tools.js'
import type { SupportedLocale } from '../../../shared/types/supportedLocale.js'
import dateCalculatorRouter from './date-calculator/date-calculator.routes.js'
import ageCalculatorRouter from './age-calculator/age-calculator.routes.js'

const router = Router({ mergeParams: true })

// req.params.lang is not typed by default on Express Request when the param comes
// from a parent router via mergeParams. Explicitly typing Request<{ lang: string }>
// makes the parameter available and the cast to SupportedLocale narrows it to a valid locale.
router.get('/', (req: Request<{ lang: string }>, res) => {
  const lang = req.params.lang as SupportedLocale
  const categoryTools = tools
    .filter((t) => t.categoryPath === '/datetime' && t.enabled[lang])
    .map((t) => ({
      ...t,
      resolvedTitle: t.title[lang],
      resolvedDescription: t.description[lang],
      resolvedPath: buildToolPath(lang, t.categoryPath, t.slug),
    }))

  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: req.t('common:category.datetime.title'),
      description: req.t('common:category.datetime.description'),
      path: `/${lang}/datetime`,
      lang,
    }),
    toolCategory: req.t('common:category.datetime.title'),
    toolCategoryPath: `/${lang}/datetime`,
    toolCategoryDescription: req.t('common:category.datetime.categoryDescription'),
    tools: categoryTools,
    lang,
  })
})

router.use('/datumovy-kalkulator', dateCalculatorRouter) // cs
router.use('/datumova-kalkulacka', dateCalculatorRouter) // sk
router.use('/kalkulacka-veku', ageCalculatorRouter) // cs/sk

export default router
