import { catchAsync } from '../../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../../shared/utils/seoMeta.js'
import { buildToolSeoInput } from '../../../../shared/utils/buildToolSeoInput.js'
import { findToolById } from '../../../../shared/utils/findTools.js'
import { wordCountInput } from './word-count.schema.js'
import { calculateWordCount } from './word-count.service.js'
import { wordCountFaq as faq } from './word-count.faq.js'
import type { SupportedLocale } from '../../../../shared/types/supportedLocale.js'

export const getWordCount = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('word-count')
  if (!tool) throw new Error(`Tool not found: word-count`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  res.render('pages/tools/text/word-count', {
    ...buildSeoMeta(buildToolSeoInput(tool, lang)),
    faq,
  })
})

export const postWordCount = catchAsync(async (req, res) => {
  const lang = req.params.lang as SupportedLocale
  const tool = findToolById('word-count')
  if (!tool) throw new Error(`Tool not found: word-count`)
  if (!tool.enabled[lang]) throw new Error(`Tool not available in ${lang}`)

  let result = null
  let errorState: boolean = false
  let errorMessage: string | null = null
  let status: number = 200

  const input = wordCountInput.safeParse(req.body.text)

  if (!input.success) {
    errorState = true
    errorMessage = req.t('common.errorTooLong')
    status = 400
  } else {
    result = calculateWordCount(input.data)
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
