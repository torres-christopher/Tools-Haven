import { Router } from 'express'
import { getCaseConverter, postCaseConverter } from './case-converter.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getCaseConverter)
router.post('/', postCaseConverter)

export default router
