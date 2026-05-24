import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { tools } from '../../../../shared/data/tools.js'
import { bmiInput } from './bmi.schema.js'
import { calculateBmi } from './bmi.service.js'
import { bmiFaq as faq } from './bmi.faq.js'

// Get tool details
const tool = tools.find((t) => t.slug === 'bmi-kalkulacka')
if (!tool) throw new Error('Tool not found: BMI kalkulačka')

export const getBmi = catchAsync(async (_req, res) => {
  res.render('pages/tools/health/bmi', {
    ...buildSeoMeta(tool),
    faq,
  })
})

export const postBmi = catchAsync(async (req, res) => {
  let result = null
  let label: string | null = null
  let markerPosition: number | null = null
  let errorMessage: string | null = null
  let status: number = 200

  // Validate input
  const input = bmiInput.safeParse({
    height: req.body.height,
    weight: req.body.weight,
  })

  if (!input.success) {
    errorMessage = 'Zadejte svou váhu.'
    status = 400
  } else {
    result = calculateBmi(input.data)

    // Maps BMI value onto a 0–100% scale anchored at 10 (min) and 45 (max).
    // Clamped so extreme values don't break the visual scale marker.
    markerPosition = Math.min(100, Math.max(0, ((result.bmiValue - 10) / (45 - 10)) * 100))
    switch (result.bmiClassification) {
      case 'underweight':
        label = 'Podváha'
        break
      case 'normal':
        label = 'Optimální váha'
        break
      case 'overweight':
        label = 'Nadváha'
        break
      case 'obese-1':
        label = 'Obezita 1. stupně'
        break
      case 'obese-2':
        label = 'Obezita 2. stupně'
        break
      case 'obese-3':
        label = 'Obezita 3. stupně'
        break
      default:
        label = 'Normální'
        break
    }
  }

  res.status(status).render('pages/tools/health/bmi', {
    ...buildSeoMeta(tool),
    faq,
    height: input.data?.height,
    weight: input.data?.weight,
    result,
    label,
    markerPosition,
    errorMessage,
  })
})
