import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { jsonValidatorInput } from './json-validator.schema.js'
import { jsonValidateFormat } from './json-validator.service.js'
import { jsonValidatorFaq as faq } from './json-validator.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

// Values for space so it includes "tab" as well
type SpaceValues = {
  name: string | number
  value: string | number
}

// Builds dropdown options for indentation: tab first, then 1–10 spaces.
// Czech language: 1 mezera, 2–4 mezery, 5+ mezer.
const spaceValues: SpaceValues[] = [
  {
    name: 'Tabulátor',
    value: `\t`,
  },
]
// Push 1-10
for (let i = 1; i <= 10; i++) {
  spaceValues.push({
    name: `${i + (i === 1 ? ' mezera' : i >= 2 && i < 5 ? ' mezery' : ' mezer')}`,
    value: i,
  })
}

export const getJsonValidator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('json-validator')
  if (!tool) throw new Error(`Tool not found: json-validator`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/developer/json-validator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    wideLayout: true,
    spaceValues,
  })
})

export const postJsonValidator = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('json-validator')
  if (!tool) throw new Error(`Tool not found: json-validator`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  let result = null
  let errorMessage: string | null = null
  let status: number = 200

  // Validate input
  const input = jsonValidatorInput.safeParse({
    text: req.body.text,
    actionType: req.body.actionType,
    space: req.body.space,
  })

  if (!input.success) {
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 300 000 znaků.'
    status = 400
  } else {
    result = jsonValidateFormat(input.data)
  }

  res.status(status).render('pages/tools/developer/json-validator', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    wideLayout: true,
    faq,
    spaceValues,
    space: input.data?.space,
    text: input.data?.text,
    inputLength: input.data?.text.length,
    result: result,
    // errorMessage prefers the schema validation error (too long) over the JSON parse error
    // Schema failure means result is null so result?.errorMessage would be undefined anyway.
    errorMessage: errorMessage ? errorMessage : result?.errorMessage,
    errorPosition: result?.errorPosition,
  })
})
