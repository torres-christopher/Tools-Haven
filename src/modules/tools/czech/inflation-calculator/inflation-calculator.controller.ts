import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { inflationRealInput, inflationCustomInput } from './inflation-calculator.schema.js'
import {
  calculateInflationAdjustedValue,
  calculateCustomInflation,
} from './inflation-calculator.service.js'
import { inflationCalculatorFaq as faq } from './inflation-calculator.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'inflacni-kalkulacka')
if (!tool) throw new Error('Tool not found: inflacni-kalkulacka')

// GET
export const getInflationCalculator = catchAsync(async (_req, res) => {
  res.render('pages/tools/czech/inflation-calculator', {
    ...buildSeoMeta(tool),
    faq,
  })
})

// POST for forms
export const postInflationCalculator = catchAsync(async (req, res) => {
  // Declared with let so they can be conditionally assigned per form branch and passed to the view in a single render call at the end.
  let result = null
  let inputValue: number | undefined
  let inputType: string | undefined
  let inputInflationRate: number | undefined
  let inputYears: number | undefined
  let errorMessage: string | null = null
  let status: number = 200
  const formType: string = req.body.form_id

  // Inflation from real indexes
  if (formType === 'real_inflation') {
    const input = inflationRealInput.safeParse({
      value: req.body.value,
      startYear: req.body.startYear,
      startMonth: req.body.startMonth,
      endYear: req.body.endYear,
      endMonth: req.body.endMonth,
    })

    // Validate input
    if (!input.success) {
      errorMessage = 'Zadány neplatné hodnoty.'
      status = 400
    } else {
      result = calculateInflationAdjustedValue(input.data)
      inputValue = input.data.value
    }

    // Inflation by custom interpreter
  } else if (formType === 'custom_inflation') {
    const input = inflationCustomInput.safeParse({
      value: req.body.value,
      inflationRate: req.body.inflationRate,
      years: req.body.years,
      type: req.body.type,
    })

    // Validate input
    if (!input.success) {
      errorMessage = 'Zadány neplatné hodnoty.'
      status = 400
    } else {
      result = calculateCustomInflation(input.data)
      inputValue = input.data.value
      inputType = input.data.type
      inputInflationRate = input.data.inflationRate
      inputYears = input.data.years
    }

    // Incorrect form edge case
  } else {
    errorMessage = 'Vyskytla se chyba'
    status = 400
  }

  // Render page
  res.status(status).render('pages/tools/czech/inflation-calculator', {
    ...buildSeoMeta(tool),
    faq,
    result,
    inputValue,
    inputInflationRate,
    inputYears,
    // What form was activated
    activeForm:
      formType === 'real_inflation'
        ? 'real_inflation'
        : formType === 'custom_inflation'
          ? inputType === 'forward'
            ? 'custom_forward'
            : 'custom_backward'
          : null, // Edge case for wrong form
    errorMessage,
  })
})
