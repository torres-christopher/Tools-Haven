import { Router } from 'express'
import { supportedLocales } from '../../shared/types/supportedLocale.js'
// Routes - Tools
import textRouter from './text/text.routes.js'
import developerRouter from './developer/developer.routes.js'
import healthRouter from './health/health.routes.js'
import localRouter from './local/local.routes.js'
import datetimeRouter from './datetime/datetime.routes.js'

const router = Router({ mergeParams: true })

// Validate lang parameter, return 404 if not a supported locale
router.param('lang', (req, res, next, lang) => {
  if (!supportedLocales.includes(lang)) {
    res.status(404).render('errors/error', {
      title: 'Stránka nenalezena',
      metaDescription: 'Stránka nebyla nalezena.',
      statusCode: 404,
      message: 'Stránka nebyla nalezena.',
      stack: null,
    })
    return
  }
  req.i18n.changeLanguage(lang)
  next()
})

// Use category routers under generic slugs
router.use('/:lang/text', textRouter)
router.use('/:lang/developer', developerRouter)
router.use('/:lang/health', healthRouter)
router.use('/:lang/local', localRouter)
router.use('/:lang/datetime', datetimeRouter)

export default router
