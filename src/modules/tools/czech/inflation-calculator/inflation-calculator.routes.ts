import { Router } from 'express'
import {
  getInflationCalculator,
  postInflationCalculator,
} from './inflation-calculator.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getInflationCalculator)
router.post('/', postInflationCalculator)

export default router
