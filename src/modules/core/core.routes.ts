import { Router } from 'express'
import healthRouter from './health/health.routes.js'
import mainRouter from './home/home.routes.js'
import legalRouter from './legal/legal.routes.js'
import { getAllTools, getSitemap, getRobots } from './site.controller.js'

const router = Router()

router.use('/', mainRouter, legalRouter, healthRouter)
router.get('/vsechny-nastroje', getAllTools)
router.get('/sitemap.xml', getSitemap)
router.get('/robots.txt', getRobots)

export default router
