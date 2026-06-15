import { Router } from 'express'
import {
  getPrevodVelikostiZnaku,
  postPrevodVelikostiZnaku,
} from './case-converter.controller.js'

const router = Router({ mergeParams: true })

router.get('/', getPrevodVelikostiZnaku)
router.post('/', postPrevodVelikostiZnaku)

export default router
