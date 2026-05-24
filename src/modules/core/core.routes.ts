import { Router } from 'express'
import healthRouter from './health/health.routes.js'
import mainRouter from './home/home.routes.js'
import legalRouter from './legal/legal.routes.js'
import { getAllTools } from './home/home.controller.js'

const router = Router()

router.use('/', mainRouter, legalRouter, healthRouter)
router.get('/vsechny-nastroje', getAllTools)

export default router
