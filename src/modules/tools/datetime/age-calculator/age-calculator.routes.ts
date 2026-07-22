import { Router } from 'express'
import { getAgeCalculator, postAgeCalculator } from './age-calculator.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getAgeCalculator)
router.post('/', postAgeCalculator)

export default router
