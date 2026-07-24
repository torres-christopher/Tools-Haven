import { z } from 'zod'
import { parseDuration } from '../../../../shared/utils/duration.js'

// ───── Input ───────────────────────────────────

// Pace
export const paceCalculatorPaceInput = z.object({
  time: z
    .string()
    .regex(/^\d+(:\d{1,2}){0,2}$/)
    .transform(parseDuration),
  distance: z.number().positive(),
})

// Time
export const paceCalculatorTimeInput = z.object({
  pace: z
    .string()
    .regex(/^\d+(:\d{1,2}){0,1}$/)
    .transform(parseDuration),
  distance: z.number().positive(),
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

// ───── Output ───────────────────────────────────

// Pace
export const paceCalculatorPaceOutput = z.object({
  pace: z.number(),
})

// Time
export const paceCalculatorTimeOutput = z.object({
  time: z.number(),
})

// Distance
export const paceCalculatorDistanceOutput = z.object({
  distance: z.number().positive(),
})

// ───── Types ───────────────────────────────────

export type PaceCalculatorPaceInput = z.infer<typeof paceCalculatorPaceInput>
export type PaceCalculatorTimeInput = z.infer<typeof paceCalculatorTimeInput>
export type PaceCalculatorDistanceInput = z.infer<typeof paceCalculatorDistanceInput>
export type PaceCalculatorPaceOutput = z.infer<typeof paceCalculatorPaceOutput>
export type PaceCalculatorTimeOutput = z.infer<typeof paceCalculatorTimeOutput>
export type PaceCalculatorDistanceOutput = z.infer<typeof paceCalculatorDistanceOutput>
