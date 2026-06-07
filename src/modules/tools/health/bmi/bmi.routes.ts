import { Router } from 'express'
import { getBmi, postBmi } from './bmi.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getBmi)
router.post('/', postBmi)

export default router
