import { Router } from 'express'
import {
  getPrevodVelikostiZnaku,
  postPrevodVelikostiZnaku,
} from './prevod-velikosti-znaku.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getPrevodVelikostiZnaku)
router.post('/', postPrevodVelikostiZnaku)

export default router
