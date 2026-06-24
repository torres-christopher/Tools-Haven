import { Router } from 'express'
import { getDateCalculator, postDateCalculator } from './date-calculator.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getDateCalculator)
router.post('/', postDateCalculator)

export default router
