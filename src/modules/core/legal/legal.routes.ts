// legal.routes.ts
import { Router } from 'express'
import { getContact, getPrivacy, getTerms } from './legal.controller.js'

const router = Router({ mergeParams: true })

// TODO: slugs will need localised variants per language once SK is built
router.get('/contact', getContact)
router.get('/privacy', getPrivacy)
router.get('/terms', getTerms)

export default router
