import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { prevodVelikostiZnakuInput } from './prevod-velikosti-znaku.schema.js'
import {
  sentenceCase,
  lowerCase,
  upperCase,
  capitalizeCase,
  reverseText,
} from './prevod-velikosti-znaku.service.js'
import { prevodVelikostiZnakuFaq as faq } from './prevod-velikosti-znaku.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

export const getPrevodVelikostiZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('prevod-velikosti-znaku')
  if (!tool) throw new Error(`Tool not found: prevod-velikosti-znaku`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/text/prevod-velikosti-znaku', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

export const postPrevodVelikostiZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('prevod-velikosti-znaku')
  if (!tool) throw new Error(`prevod-velikosti-znaku`)
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
    }
  }

  res.status(status).render('pages/tools/text/prevod-velikosti-znaku', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    result: result,
    errorState,
    errorMessage,
  })
})
