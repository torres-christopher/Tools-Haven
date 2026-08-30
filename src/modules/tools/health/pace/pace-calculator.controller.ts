import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import {
  paceCalculatorPaceInput,
  paceCalculatorTimeInput,
  paceCalculatorDistanceInput,
} from './pace-calculator.schema.js'
import {
  calculatePace,
  calculateTime,
  calculateDistance,
} from './pace-calculator.service.js'
import { paceCalculatorFaq as faq } from './pace-calculator.faq.js'
import { formatDuration, durationToParts } from '../../../../shared/utils/duration.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

// GET
export const getPaceCalculator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('pace-calculator')
  if (!tool) throw new Error(`Tool not found: pace-calculator`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/health/pace-calculator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

// POST for forms
export const postPaceCalculator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('pace-calculator')
  if (!tool) throw new Error(`Tool not found: pace-calculator`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  // Declared with let so they can be conditionally assigned per form branch and passed to the view in a single render call at the end.
  let result = null
  let errorMessage: string | null = null
  let status: number = 200
  const formType: string = req.body.form_id

  // Pace calculation
  if (formType === 'pace') {
    const input = paceCalculatorPaceInput.safeParse({
      time: req.body.time,
      distance: req.body.distance,
    })

    // Validate input
    if (!input.success) {
      errorMessage = req.t('common:errors.invalidInput')
      status = 400
    } else {
      result = calculatePace(input.data)
    }

    // Time calculation
  } else if (formType === 'time') {
    const input = paceCalculatorTimeInput.safeParse({
      pace: req.body.pace,
      distance: req.body.distance,
    })

    // Validate input
    if (!input.success) {
      errorMessage = req.t('common:errors.invalidInput')
      status = 400
    } else {
      result = calculateTime(input.data)
    }

    // Distance calculation
  } else if (formType === 'distance') {
    const input = paceCalculatorDistanceInput.safeParse({
      time: req.body.time,
      pace: req.body.pace,
    })

    // Validate input
    if (!input.success) {
      errorMessage = req.t('common:errors.invalidInput')
      status = 400
    } else {
      result = calculateDistance(input.data)
    }
    // Incorrect form edge case
  } else {
    errorMessage = req.t('common:errors.general')
    status = 400
  }

  res.status(status).render('pages/tools/health/pace-calculator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    result,
    // What form was activated
    formId: formType,
    activeForm:
      formType === 'pace'
        ? 'pace'
        : formType === 'time'
          ? 'time'
          : formType === 'distance'
            ? 'distance'
            : null,
    formatDuration,
    durationToParts,
    errorMessage,
  })
})
