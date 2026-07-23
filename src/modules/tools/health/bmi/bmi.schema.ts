import { z } from 'zod'

// ───── Input ───────────────────────────────────

export const bmiInput = z.object({
  height: z.coerce.number().min(1).max(300),
  weight: z.coerce.number().min(1).max(1000),
})

// ───── Output ───────────────────────────────────

export const bmiOutput = z.object({
  bmiValue: z.number(),
  bmiClassification: z.enum([
    'underweight',
    'normal',
    'overweight',
    'obese-1',
    'obese-2',
    'obese-3',
  ]),
})

// ───── Types ───────────────────────────────────

export type BmiInput = z.infer<typeof bmiInput>
export type BmiOutput = z.infer<typeof bmiOutput>
