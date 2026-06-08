import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { pocetZnakuInput } from './pocet-znaku.schema.js'
import { calculatePocetZnaku } from './pocet-znaku.service.js'
import { pocetZnakuFaq as faq } from './pocet-znaku.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

export const getPocetZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('pocet-znaku')
  if (!tool) throw new Error(`Tool not found: pocet-znaku`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/text/pocet-znaku', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

export const postPocetZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('pocet-znaku')
  if (!tool) throw new Error(`Tool not found: pocet-znaku`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  let result = null
  let errorState: boolean = false
  let errorMessage: string | null = null
  let status: number = 200

  const input = pocetZnakuInput.safeParse(req.body.text)

  if (!input.success) {
    errorState = true
    errorMessage = 'Text je příliš dlouhý. Maximální délka je 300 000 znaků.'
    status = 400
  } else {
    result = calculatePocetZnaku(input.data)
  }

  res.status(status).render('pages/tools/text/pocet-znaku', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    text: input.data ? input.data : req.body.text,
    result,
    errorState,
    errorMessage,
  })
})
