import { z } from 'zod'

// Range between dates
export const dateCalculatorRangeInput = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

// Add/Substract dates// Range between dates
export const dateCalculatorArithmeticInput = z.object({
  startDate: z.coerce.date(),
  type: z.enum(['add', 'subtract']),
  days: z.coerce.number().nonnegative(),
  weeks: z.coerce.number().nonnegative(),
  months: z.coerce.number().nonnegative(),
  years: z.coerce.number().nonnegative(),
})

// Week number
export const dateCalculatorWeekInput = z.object({
  inputDate: z.coerce.date(),
})

export const dateCalculatorRangeOutput = z.object({
  daysTotal: z.number().nonnegative(),
  daysRemainder: z.number().nonnegative(),
  weeksTotal: z.number().nonnegative(),
  weeksRemainder: z.number().nonnegative(),
  monthsTotal: z.number().nonnegative(),
  monthsRemainder: z.number().nonnegative(),
  yearsTotal: z.number().nonnegative(),
})

export const dateCalculatorArithmeticOutput = z.object({
  outputDate: z.date(),
  weekday: z.number().min(1).max(7),
})

// Week number
export const dateCalculatorWeekOutput = z.object({
  week: z.number().nonnegative().max(53),
  year: z.number().nonnegative(),
})

export type DateCalculatorRangeInput = z.infer<typeof dateCalculatorRangeInput>
export type DateCalculatorArithmeticInput = z.infer<typeof dateCalculatorArithmeticInput>
export type DateCalculatorWeekInput = z.infer<typeof dateCalculatorWeekInput>
export type DateCalculatorRangeOutput = z.infer<typeof dateCalculatorRangeOutput>
export type DateCalculatorArithmeticOutput = z.infer<typeof dateCalculatorArithmeticOutput>
export type DateCalculatorWeekOutput = z.infer<typeof dateCalculatorWeekOutput>
