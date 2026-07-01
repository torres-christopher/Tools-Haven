import { Router } from 'express'
import { getWordCount, postWordCount } from './word-count.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getWordCount)
router.post('/', postWordCount)

export default router
