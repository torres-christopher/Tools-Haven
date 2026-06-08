import { Router } from 'express'
import { getJsonValidator, postJsonValidator } from './json-validator.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getJsonValidator)
router.post('/', postJsonValidator)

export default router
