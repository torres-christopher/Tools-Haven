import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { inflationRealInput } from './inflation-calculator.schema.js'
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
  let result = null
  let errorMessage: string | null = null
  let status: number = 200
  const formType: string = req.body.form_id

  // Validate input
  if (formType === 'real_inflation') {
    const input = inflationRealInput.safeParse({
      value: req.body.value,
      startYear: req.body.startYear,
      startMonth: req.body.startMonth,
      endYear: req.body.endYear,
      endMonth: req.body.endMonth,
    })

    if (!input.success) {
      errorMessage = 'Real inflation wrong (placeholder)'
      status = 400
    }

    result = calculateInflationAdjustedValue(input.data)
  } else {
    const input = inflationRealInput.safeParse({
      value: req.body.value,
      inflationRate: req.body.inflationRate,
      years: req.body.years,
      type: req.body.type,
    })

    if (!input.success) {
      errorMessage = 'Custom inflation wrong (placeholder)'
      status = 400
    }

    result = calculateCustomInflation(input.data)
  }

  res.status(status).render('pages/tools/czech/inflation-calculator', {
    ...buildSeoMeta(tool),
    faq,
    result,
    errorMessage,
  })
})
