import { z } from 'zod'

// Plain string input --> not wrapped in an object, so controller passes req.body.text directly
export const pocetZnakuInput = z.string().max(300000).default('')

export const pocetZnakuOutput = z.object({
  textLengthRaw: z.number().int().nonnegative(),
  textLengthNoSpace: z.number().int().nonnegative(),
  wordCount: z.number().int().nonnegative(),
  sentenceCount: z.number().int().nonnegative(),
  nsCount: z.number().nonnegative(), // Normostrana
  lineCount: z.number().int().nonnegative(),
  readingTime: z.number().int().nonnegative(),
})

export type PocetZnakuInput = z.infer<typeof pocetZnakuInput>
export type PocetZnakuOutput = z.infer<typeof pocetZnakuOutput>
