import { Router } from 'express'
import { getHealth } from './health.controller.js'

const router = Router({ mergeParams: true })

router.get('/health', getHealth)

export default router
