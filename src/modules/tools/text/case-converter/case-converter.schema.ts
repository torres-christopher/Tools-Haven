import { z } from 'zod'

// ───── Input ───────────────────────────────────

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

// ───── Output ───────────────────────────────────

export const caseConverterOutput = z.string().max(300000).default('')

// ───── Types ───────────────────────────────────

export type CaseConverterInput = z.infer<typeof caseConverterInput>
export type CaseConverterOutput = z.infer<typeof caseConverterOutput>
