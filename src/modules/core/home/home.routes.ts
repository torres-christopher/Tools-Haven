// home.routes.ts
import { Router } from 'express'
import { getMain, getFAQ } from './home.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getMain)
router.get('/faq', getFAQ)

export default router
