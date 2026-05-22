import { Router } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { tools } from '../../../shared/data/tools.js'
import bmiRoutes from './bmi/bmi.routes.js'

const router = Router()

// Category index/health
router.get('/', (_req, res) => {
  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: 'Zdravotní nástroje',
      description:
        'Zdravotní nástroje online zdarma. BMI kalkulačka a další jednoduché zdravotní výpočty přehledně, rychle a bez registrace.',
      path: '/zdravotni-nastroje',
    }),
    toolCategory: 'Zdravotní nástroje',
    toolCategoryPath: '/zdravotni-nastroje',
    toolCategoryDescription:
      'Kalkulačky pro zdraví a fitness: BMI, BMR, TDEE, ideální váha a další ukazatele.',
    tools: tools.filter((t) => t.categoryPath === '/zdravotni-nastroje' && t.enabled).slice(0, 6),
  })
})

router.use('/bmi-kalkulacka', bmiRoutes)

export default router
