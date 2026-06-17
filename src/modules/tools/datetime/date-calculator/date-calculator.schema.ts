import { z } from 'zod'

// Range between dates
export const dateCalculatorRangeInput = z.object({
  startDate: z.date(),
  endDate: z.date(),
})

// Add/Substract dates// Range between dates
export const dateCalculatorArithmeticInput = z.object({
  startDate: z.date(),
  days: z.number(),
  weeks: z.number(),
  months: z.number(),
  years: z.number(),
})

// Week number
export const dateCalculatorWeekInput = z.object({
  inputDate: z.date(),
})
