import { Router } from 'express'
import { getPocetZnaku, postPocetZnaku } from './pocet-znaku.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getPocetZnaku)
router.post('/', postPocetZnaku)

export default router
