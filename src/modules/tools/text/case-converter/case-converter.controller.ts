import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { prevodVelikostiZnakuInput } from './case-converter.schema.js'
import {
  sentenceCase,
  lowerCase,
  upperCase,
  capitalizeCase,
  reverseText,
  noDiacritics,
} from './case-converter.service.js'
import { prevodVelikostiZnakuFaq as faq } from './case-converter.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

export const getPrevodVelikostiZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('case-converter')
  if (!tool) throw new Error(`Tool not found: case-converter`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/text/case-converter', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

export const postPrevodVelikostiZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('case-converter')
  if (!tool) throw new Error(`case-converter`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  let result = null
  let errorState: boolean = false
  let errorMessage: string | null = null
  let status: number = 200

  // Validate input
  const input = prevodVelikostiZnakuInput.safeParse({
    text: req.body.text,
    conversionType: req.body.conversionType,
  })

  // On error
  if (!input.success) {
    errorState = true
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 300 000 znaků.'
    status = 400
  } else {
    switch (input.data.conversionType) {
      case 'sentence-case':
        result = sentenceCase(input.data)
        break
      case 'lower-case':
        result = lowerCase(input.data)
        break
      case 'upper-case':
        result = upperCase(input.data)
        break
      case 'capitalized-case':
        result = capitalizeCase(input.data)
        break
      case 'reverse':
        result = reverseText(input.data)
        break
      case 'no-diacritics':
        result = noDiacritics(input.data)
        break
    }
  }

  res.status(status).render('pages/tools/text/case-converter', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    result: result,
    errorState,
    errorMessage,
  })
})
