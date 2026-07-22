import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { ageCalculatorInput } from './age-calculator.schema.js'
import { calculateAge } from './age-calculator.service.js'
import { ageCalculatorFaq as faq } from './age-calculator.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

// GET
export const getAgeCalculator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('age-calculator')
  if (!tool) throw new Error('Tool not found: age-calculator')
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/datetime/age-calculator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

// POST
export const postAgeCalculator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('age-calculator')
  if (!tool) throw new Error('Tool not found: age-calculator')
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  let result = null
  let errorMessage: string | null = null
  let status: number = 200

  const input = ageCalculatorInput.safeParse(req.body)

  if (!input.success) {
    const isFutureDate = input.error.errors.some(
      (error) => error.message === 'Birth date in the future',
    )
    errorMessage = isFutureDate
      ? req.t('ageCalculator.errorFutureDate')
      : req.t('common:errors.invalidInput')
    status = 400
  } else {
    result = calculateAge(input.data)
  }

  res.status(status).render('pages/tools/datetime/age-calculator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    birthDate: input.success ? input.data.birthDate.toISOString().slice(0, 10) : req.body.birthDate,
    result,
    errorMessage,
  })
})
