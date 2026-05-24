import { catchAsync } from '../../../shared/utils/catchAsync.js'
import { buildSeoMeta } from '../../../shared/utils/seoMeta.js'

// Contact page
export const getContact = catchAsync(async (_req, res) => {
  res.render('pages/core/legal/contact', {
    ...buildSeoMeta({
      title: 'Kontakt',
      description: 'Kontaktujte nás — hlášení chyb, nápady na nástroje, dotazy k ochraně soukromí.',
      path: '/kontakt',
    }),
  })
})

// Privacy page
export const getPrivacy = catchAsync(async (_req, res) => {
  res.render('pages/core/legal/privacy', {
    ...buildSeoMeta({
      title: 'Ochrana osobních údajů',
      description:
        'Zásady ochrany osobních údajů webu XXX.cz. Informace o cookies, trackování a zpracování dat.', // TODO: web name
      path: '/ochrana-osobnich-udaju',
    }),
  })
})

// Terms page
export const getTerms = catchAsync(async (_req, res) => {
  res.render('pages/core/legal/terms', {
    ...buildSeoMeta({
      title: 'Podmínky použití',
      description: 'Podmínky použití bezplatných online nástrojů na webu XXX.cz.', // TODO: web name
      path: '/podminky-pouziti',
    }),
  })
})
