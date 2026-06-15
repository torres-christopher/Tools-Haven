// home.routes.ts
import { Router } from 'express'
import { getMain } from './home.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getMain)

export default router
