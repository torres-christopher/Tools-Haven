import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { InflationRealInput } from './inflation-calculator.schema.js'
import {
  calculateInflationAdjustedValue,
  calculateCustomInflation,
} from './inflation-calculator.service.js'
import { inflationCalculatorFaq as faq } from './inflation-calculator.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'inflation-calculator')
if (!tool) throw new Error('Tool not found: inflation-calculator')

// GET
export const getInflationCalculator = catchAsync(async (req, res) => {
  res.render('pages/tools/czech/inflation-calculator', {
    ...buildSeoMeta(tool),
    faq,
  })
})

// POST for forms
export const postInflationCalculator = catchAsync(async (req, res) => {
  res.render('pages/tools/czech/inflation-calculator', {
    ...buildSeoMeta(tool),
    faq,
  })
})
