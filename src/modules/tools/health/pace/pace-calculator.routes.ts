import { Router } from 'express'
import { getPaceCalculator, postPaceCalculator } from './pace-calculator.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getPaceCalculator)
router.post('/', postPaceCalculator)

export default router
