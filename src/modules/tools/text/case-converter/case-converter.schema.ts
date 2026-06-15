import { z } from 'zod'

export const prevodVelikostiZnakuInput = z.object({
  text: z.string().max(300000).default(''),
  conversionType: z.enum([
    'sentence-case',
    'lower-case',
    'upper-case',
    'capitalized-case',
    'reverse',
    'no-diacritics',
  ]),
})
export const prevodVelikostiZnakuOutput = z.string().max(300000).default('')

export type PrevodVelikostiZnakuInput = z.infer<typeof prevodVelikostiZnakuInput>
export type PrevodVelikostiZnakuOutput = z.infer<typeof prevodVelikostiZnakuOutput>
