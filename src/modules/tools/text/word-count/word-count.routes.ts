import { Router } from 'express'
import { getPocetZnaku, postPocetZnaku } from './word-count.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getPocetZnaku)
router.post('/', postPocetZnaku)

export default router
