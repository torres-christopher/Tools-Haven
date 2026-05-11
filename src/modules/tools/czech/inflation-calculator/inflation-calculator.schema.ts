import { z } from 'zod'
import { cpiMonthly, cpiYearly } from '../../../../shared/data/tools/czech/cpi.js'

// -------- Helper Functions --------------- //
// Helper function for average mode
const isAverageMode = (month: number | 'average'): month is 'average' => {
  return month === 'average'
}

// Helper function for monthly key
export const monthlyKey = (year: number, month: number): string => {
  return `${year}-${String(month).padStart(2, '0')}`
}

// Helper function to check if start/end are of the same mode
const sameMode = (start: number | 'average', end: number | 'average'): boolean => {
  return (
    (isAverageMode(start) && isAverageMode(end)) || (!isAverageMode(start) && !isAverageMode(end))
  )
}

// Helper function to check if data exists
const hasCpiData = (year: number, month: number | 'average'): boolean => {
  if (month === 'average') {
    return cpiYearly[year] !== undefined
  }

  return cpiMonthly[monthlyKey(year, month)] !== undefined
}

// Helper for period value, 2024-01 -> 202401
const periodValue = (year: number, month: number | 'average'): number => {
  if (month === 'average') {
    return year * 100 // * 100 for consistency
  }

  return year * 100 + month
}

// -------- Schema --------------- //
export const inflationRealInput = z
  .object({
    value: z.coerce.number().positive(),
    startYear: z.coerce.number().int(),
    startMonth: z.union([z.literal('average'), z.coerce.number().int().min(1).max(12)]),
    endYear: z.coerce.number().int(),
    endMonth: z.union([z.literal('average'), z.coerce.number().int().min(1).max(12)]),
  })

  // same mode only
  .refine((input) => sameMode(input.startMonth, input.endMonth), {
    path: ['startMonth'],
    message: 'Nelze kombinovat měsíční a roční průměrná období.',
  })

  // start period exists
  .refine((input) => hasCpiData(input.startYear, input.startMonth), {
    path: ['startYear'],
    message: 'Pro počáteční období nejsou dostupná data CPI.',
  })

  // end period exists
  .refine((input) => hasCpiData(input.endYear, input.endMonth), {
    path: ['endYear'],
    message: 'Pro koncové období nejsou dostupná data CPI.',
  })

  // chronological order
  .refine(
    (input) =>
      periodValue(input.startYear, input.startMonth) < periodValue(input.endYear, input.endMonth),
    {
      path: ['endYear'],
      message: 'Koncové období musí být později než počáteční období.',
    },
  )

export const inflationCustomInput = z.object({
  value: z.coerce.number().positive(),
  inflationRate: z.coerce.number().nonnegative(),
  years: z.coerce.number().nonnegative(),
  type: z.enum(['forward', 'backward']),
})

export const inflationOutput = z.number().nonnegative()

export type InflationRealInput = z.infer<typeof inflationRealInput>
export type InflationCustomInput = z.infer<typeof inflationCustomInput>
export type InflationOutput = z.infer<typeof inflationOutput>
