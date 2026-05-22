import { Router } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { tools } from '../../../shared/data/tools.js'
import jsonValidatorRoutes from './json-validator/json-validator.routes.js'

const router = Router()

// Category index/developer
router.get('/', (_req, res) => {
  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: 'Vývojářské nástroje',
      description:
        'Bezplatné online nástroje pro vývojáře. JSON validace a formátování, enkódování do Base64, URL enkódování a další.',
      path: '/vyvojarske-nastroje',
    }),
    toolCategory: 'Vývojářské nástroje',
    toolCategoryPath: '/vyvojarske-nastroje',
    toolCategoryDescription:
      'Nástroje pro vývojáře: Validace JSONu, formátování a porovnání textu.',
    tools: tools.filter((t) => t.categoryPath === '/vyvojarske-nastroje' && t.enabled).slice(0, 6),
  })
})

// Tools
router.use('/json-validator', jsonValidatorRoutes)

export default router
