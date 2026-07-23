import { z } from 'zod'

// ───── Input ───────────────────────────────────

export const jsonValidatorInput = z.object({
  text: z.string().max(100000).default(''),
  actionType: z.enum(['validate', 'format', 'minify']),
  // Accepts tab literal or a number 1–10. Union needed because '\t' can't be coerced to a number.
  space: z.union([z.literal('\t'), z.coerce.number().gte(1).lte(10)]).default(2),
})

// ───── Output ───────────────────────────────────

export const jsonValidatorOutput = z.object({
  validJson: z.boolean(),
  errorMessage: z.string().optional(),
  errorPosition: z
    .object({
      line: z.number().nullable(),
      column: z.number().nullable(),
    })
    .optional(),
  result: z.string().optional(),
})

// ───── Types ───────────────────────────────────

export type JsonValidatorInput = z.infer<typeof jsonValidatorInput>
export type JsonValidatorOutput = z.infer<typeof jsonValidatorOutput>
