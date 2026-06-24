import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import {
  dateCalculatorRangeInput,
  dateCalculatorArithmeticInput,
  dateCalculatorWeekInput,
  type DateCalculatorRangeInput,
  type DateCalculatorArithmeticInput,
  type DateCalculatorWeekInput,
} from './date-calculator.schema.js'
import {
  calculateRange,
  calculateArithmetic,
  calculateWeekNumber,
} from './date-calculator.service.js'
import { dateCalculatorFaq as faq } from './date-calculator.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

// GET
export const getDateCalculator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('date-calculator')
  if (!tool) throw new Error(`Tool not found: date-calculator`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/datetime/date-calculator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

// POST for forms
export const postDateCalculator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('date-calculator')
  if (!tool) throw new Error(`Tool not found: date-calculator`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  // Declared with let so they can be conditionally assigned per form branch and passed to the view in a single render call at the end.
  let result = null
  let rangeInput: DateCalculatorRangeInput | undefined
  let arithmeticInput: DateCalculatorArithmeticInput | undefined
  let weekInput: DateCalculatorWeekInput | undefined
  let errorMessage: string | null = null
  let status: number = 200
  const formType: string = req.body.form_id

  // Range between dates
  if (formType === 'range') {
    const input = dateCalculatorRangeInput.safeParse({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    })

    // Validate input
    if (!input.success) {
      errorMessage = 'Zadány neplatné hodnoty.'
      status = 400
    } else {
      result = calculateRange(input.data)
      rangeInput = input.data
    }

    // Arithmetic on date
  } else if (formType === 'arithmetic') {
    const input = dateCalculatorArithmeticInput.safeParse({
      startDate: req.body.startDate,
      type: req.body.type,
      days: req.body.days,
      weeks: req.body.weeks,
      months: req.body.months,
      years: req.body.years,
    })

    // Validate input
    if (!input.success) {
      errorMessage = 'Zadány neplatné hodnoty.'
      status = 400
    } else {
      result = calculateArithmetic(input.data)
      arithmeticInput = input.data
    }

    // Week number
  } else if (formType === 'week') {
    const input = dateCalculatorWeekInput.safeParse({
      inputDate: req.body.inputDate,
    })

    // Validate input
    if (!input.success) {
      errorMessage = 'Zadány neplatné hodnoty.'
      status = 400
    } else {
      result = calculateWeekNumber(input.data)
      weekInput = input.data
    }
    // Incorrect form edge case
  } else {
    errorMessage = 'Vyskytla se chyba'
    status = 400
  }

  res.status(status).render('pages/tools/datetime/date-calculator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    result,
    rangeInput,
    arithmeticInput,
    weekInput,
    // What form was activated
    activeForm:
      formType === 'range'
        ? 'range'
        : formType === 'arithmetic'
          ? 'arithmetic'
          : formType === 'week'
            ? 'week'
            : null,
    errorMessage,
  })
})
