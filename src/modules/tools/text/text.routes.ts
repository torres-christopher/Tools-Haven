import { Router } from 'express'
import type { Request } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { buildToolPath } from '../../../shared/utils/buildToolPath.js'
import { tools } from '../../../shared/data/tools.js'
import type { SupportedLocale } from '../../../shared/types/supportedLocale.js'
import pocetZnakuRouter from './word-count/word-count.routes.js'
import prevodVelikostiRouter from './case-converter/case-converter.routes.js'

const router = Router({ mergeParams: true })

// req.params.lang is not typed by default on Express Request when the param comes
// from a parent router via mergeParams. Explicitly typing Request<{ lang: string }>
// makes the parameter available and the cast to SupportedLocale narrows it to a valid locale.
router.get('/', (req: Request<{ lang: string }>, res) => {
  const lang = req.params.lang as SupportedLocale

  const categoryTools = tools
    .filter((t) => t.categoryPath === '/text' && t.enabled[lang])
    .map((t) => ({
      ...t,
      resolvedTitle: t.title[lang],
      resolvedDescription: t.description[lang],
      resolvedPath: buildToolPath(lang, t.categoryPath, t.slug),
    }))

  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: req.t('common:category.text.title'),
      description: req.t('common:category.text.description'),
      path: `/${lang}/text`,
      lang,
    }),
    toolCategory: req.t('common:category.text.title'),
    toolCategoryPath: `/${lang}/text`,
    toolCategoryDescription: req.t('common:category.text.categoryDescription'),
    tools: categoryTools,
    lang,
  })
})

router.use('/pocet-znaku', pocetZnakuRouter) // cs
router.use('/pocet-znakov', pocetZnakuRouter) // sk
router.use('/prevod-velikosti-znaku', prevodVelikostiRouter) // cs
router.use('/prevod-velkosti-znakov', prevodVelikostiRouter) // sk

export default router
