import { Router } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { tools } from '../../../shared/data/tools.js'
import inflationCalculatorRouter from './inflation-calculator/inflation-calculator.routes.js'

const router = Router()

// Categor index/czech
router.get('/', (_req, res) => {
  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: 'České nástroje',
      description:
        'Bezplatné online nástroje pro česká data. Inflační kalkulačka, rodné číslo, svátky a další.',
      path: '/ceske-nastroje',
    }),
    toolCategory: 'České nástroje',
    toolCategoryPath: '/ceske-nastroje',
    tools: tools.filter((t) => t.categoryPath === '/ceske-nastroje' && t.enabled),
  })
})

// Tools
router.use('/inflacni-kalkulacka', inflationCalculatorRouter)

export default router
