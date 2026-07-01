import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { pocetZnakuInput } from './word-count.schema.js'
import { calculatePocetZnaku } from './word-count.service.js'
import { pocetZnakuFaq as faq } from './word-count.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

export const getPocetZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('word-count')
  if (!tool) throw new Error(`Tool not found: word-count`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/text/word-count', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

export const postPocetZnaku = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('word-count')
  if (!tool) throw new Error(`Tool not found: word-count`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  let result = null
  let errorState: boolean = false
  let errorMessage: string | null = null
  let status: number = 200

  const input = pocetZnakuInput.safeParse(req.body.text)

  if (!input.success) {
    errorState = true
    errorMessage = req.t('pocetZnaku.errorTooLong')
    status = 400
  } else {
    result = calculatePocetZnaku(input.data)
  }

  res.status(status).render('pages/tools/text/word-count', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
    text: input.data ? input.data : req.body.text,
    result,
    errorState,
    errorMessage,
  })
})
