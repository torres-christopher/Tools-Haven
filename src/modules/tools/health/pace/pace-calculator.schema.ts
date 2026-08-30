import { z } from 'zod'
import { parseDuration } from '../../../../shared/utils/duration.js'

// ───── Input ───────────────────────────────────

// Pace
export const paceCalculatorPaceInput = z.object({
  time: z
    .string()
    .regex(/^\d+(:\d{1,2}){0,2}$/)
    .transform(parseDuration),
  distance: z.coerce.number().positive(),
})

// Time
export const paceCalculatorTimeInput = z.object({
  pace: z
    .string()
    .regex(/^\d+(:\d{1,2}){0,1}$/)
    .transform(parseDuration),
  distance: z.coerce.number().positive(),
})

// Distance
export const paceCalculatorDistanceInput = z.object({
  time: z
    .string()
    .regex(/^\d+(:\d{1,2}){0,2}$/)
    .transform(parseDuration),
  pace: z
    .string()
    .regex(/^\d+(:\d{1,2}){0,1}$/)
    .transform(parseDuration),
})

// ───── Types ───────────────────────────────────

export type PaceCalculatorPaceInput = z.infer<typeof paceCalculatorPaceInput>
export type PaceCalculatorTimeInput = z.infer<typeof paceCalculatorTimeInput>
export type PaceCalculatorDistanceInput = z.infer<typeof paceCalculatorDistanceInput>
