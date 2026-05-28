import { Router } from 'express'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import { tools } from '../../../shared/data/tools.js'
import pocetZnakuRouter from './pocet-znaku/pocet-znaku.routes.js'
import prevodVelikostiRouter from './prevod-velikosti-znaku/prevod-velikosti-znaku.routes.js'

const router = Router()

// Category index/text
router.get('/', (_req, res) => {
  res.render('pages/tools/tools', {
    ...buildSeoMeta({
      title: 'Textové nástroje',
      description:
        'Bezplatné online nástroje pro práci s textem. Počítání znaků, převod písmen, čištění textu a další.',
      path: '/textove-nastroje',
    }),
    toolCategory: 'Textové nástroje',
    toolCategoryPath: '/textove-nastroje',
    toolCategoryDescription:
      'Nástroje pro práci s textem: Počítání znaků, převod velikosti písmen, čištění textu a další.',
    tools: tools.filter((t) => t.categoryPath === '/textove-nastroje' && t.enabled),
  })
})

// Tools
router.use('/pocet-znaku', pocetZnakuRouter)
router.use('/prevod-velikosti-znaku', prevodVelikostiRouter)

export default router
