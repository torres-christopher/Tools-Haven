import { z } from 'zod'

export const caseConverterInput = z.object({
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
export const caseConverterOutput = z.string().max(300000).default('')

export type CaseConverterInput = z.infer<typeof caseConverterInput>
export type CaseConverterOutput = z.infer<typeof caseConverterOutput>
