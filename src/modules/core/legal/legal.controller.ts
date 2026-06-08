import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'
import type { SupportedLocale } from '../../../shared/types/supportedLocale.js'

export const getContact = catchAsync(async (req, res) => {
  const lang = (req.params.lang ?? 'cs') as SupportedLocale

  res.render('pages/core/legal/contact', {
    ...buildSeoMeta({
      title: req.t('common:contact.title'),
      description: req.t('common:contact.description'),
      path: `/${lang}/contact`,
      lang,
    }),
    lang,
  })
})

export const getPrivacy = catchAsync(async (req, res) => {
  const lang = (req.params.lang ?? 'cs') as SupportedLocale

  res.render('pages/core/legal/privacy', {
    ...buildSeoMeta({
      title: req.t('common:privacy.title'),
      description: req.t('common:privacy.description'),
      path: `/${lang}/privacy`,
      lang,
    }),
    lang,
  })
})

export const getTerms = catchAsync(async (req, res) => {
  const lang = (req.params.lang ?? 'cs') as SupportedLocale

  res.render('pages/core/legal/terms', {
    ...buildSeoMeta({
      title: req.t('common:terms.title'),
      description: req.t('common:terms.description'),
      path: `/${lang}/terms`,
      lang,
    }),
    lang,
  })
})
