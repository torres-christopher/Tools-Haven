import { z } from 'zod'
import { isAfter } from 'date-fns'

export const ageCalculatorInput = z.object({
  birthDate: z.coerce
    .date()
    .refine((date) => !isAfter(date, new Date()), { message: 'Birth date in the future' }),
})

export const ageCalculatorOutput = z.object({
  age: z.object({
    // Complete age
    days: z.number().nonnegative(),
    months: z.number().nonnegative(),
    years: z.number().nonnegative(),
  }),
  birthday: z.object({
    // Time to birthday
    days: z.number().min(1),
    weekday: z.number().min(1).max(7),
  }),
  birthdate: z.object({
    // Birthdate metadata
    weekday: z.number().min(1).max(7), // Week day
    day: z.number().nonnegative().max(366), // Day number in year
    week: z.number().nonnegative().max(53), // Week number in year
  }),
})

export type AgeCalculatorInput = z.infer<typeof ageCalculatorInput>
export type AgeCalculatorOutput = z.infer<typeof ageCalculatorOutput>
