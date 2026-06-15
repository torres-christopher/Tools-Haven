import { Router } from 'express'
import healthRouter from './health/health.routes.js'
import mainRouter from './home/home.routes.js'
// import legalRouter from './legal/legal.routes.js' // Unused because now it is all in czech
import { supportedLocales, type SupportedLocale } from '../../shared/types/supportedLocale.js'
import { getMain, getFAQ } from './home/home.controller.js'
import { getContact, getPrivacy, getTerms } from './legal/legal.controller.js'
import { getAllTools, getSitemap, getRobots } from './site.controller.js'

const router = Router({ mergeParams: true })

router.use('/', mainRouter, healthRouter)

// Static routes must come before /:lang to avoid being matched as a lang param
router.get('/sitemap.xml', getSitemap)
router.get('/robots.txt', getRobots)

// Set i18next language from URL param for all /:lang routes
router.param('lang', (req, res, next, lang) => {
  // Check that /:lang is of supported local (/vsechny-nastroje fix)
  if (!supportedLocales.includes(lang as SupportedLocale)) {
    res.status(404).render('errors/error', {
      title: '404',
      message: 'Stránka nenalezena',
    })
    return
  }
  req.i18n.changeLanguage(lang)
  next()
})

// Lang-prefixed core pages
router.get('/:lang', getMain)
router.get('/:lang/tools', getAllTools)
router.get('/:lang/faq', getFAQ)
router.get('/:lang/contact', getContact)
router.get('/:lang/privacy', getPrivacy)
router.get('/:lang/terms', getTerms)

export default router
