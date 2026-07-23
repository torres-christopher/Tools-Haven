import { z } from 'zod'

// ───── Input ───────────────────────────────────
// Plain string input --> not wrapped in an object, so controller passes req.body.text directly
export const wordCountInput = z.string().max(300000).default('')

// ───── Output ───────────────────────────────────

export const wordCountOutput = z.object({
  textLengthRaw: z.number().int().nonnegative(),
  textLengthNoSpace: z.number().int().nonnegative(),
  wordCount: z.number().int().nonnegative(),
  sentenceCount: z.number().int().nonnegative(),
  nsCount: z.number().nonnegative(), // Normostrana
  lineCount: z.number().int().nonnegative(),
  readingTime: z.number().int().nonnegative(),
})

// ───── Types ───────────────────────────────────

export type WordCountInput = z.infer<typeof wordCountInput>
export type WordCountOutput = z.infer<typeof wordCountOutput>
