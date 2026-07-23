import { z } from 'zod'
import { cpiMonthly, cpiYearly } from '../../../../shared/data/tools/czech/cpi.js'

// ───── Helper functions──────────────────────────────────

// 'average' means yearly average mode
const isAverageMode = (month: number | 'average'): month is 'average' => {
  return month === 'average'
}

// Adds padding to month by making it two digits so keys sort chronologically --> '2024-03' not '2024-3'
export const monthlyKey = (year: number, month: number): string => {
  return `${year}-${String(month).padStart(2, '0')}`
}

// Both must be the same type — monthly/monthly or average/average.
// Mixing the two series should return error.
const sameMode = (start: number | 'average', end: number | 'average'): boolean => {
  return (
    (isAverageMode(start) && isAverageMode(end)) || (!isAverageMode(start) && !isAverageMode(end))
  )
}

// Checks CPI data exists for the given period before the schema passes.
// Prevents valid-looking dates (like 1990) that have no data in the dataset.
const hasCpiData = (year: number, month: number | 'average'): boolean => {
  if (month === 'average') {
    return cpiYearly[year] !== undefined
  }

  return cpiMonthly[monthlyKey(year, month)] !== undefined
}

// Converts year+month to a sortable integer for chronological comparison.
// average mode: 2024 → 202400, monthly: 2024-03 → 202403
// Multiplying year by 100 puts it in the same numeric space as year*100+month.
const periodValue = (year: number, month: number | 'average'): number => {
  if (month === 'average') {
    return year * 100 // * 100 for consistency
  }

  return year * 100 + month
}

// ───── Schema ───────────────────────────────────

// ───── Input ───────────────────────────────────

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

export const inflationCAGRInput = z.object({
  startValue: z.coerce.number().positive(),
  endValue: z.coerce.number().positive(),
  years: z.coerce.number().positive(),
})

// ───── Output ───────────────────────────────────

export const inflationOutput = z.number().nonnegative()
export const inflationCAGROutput = z.number()

// ───── Types ───────────────────────────────────

export type InflationRealInput = z.infer<typeof inflationRealInput>
export type InflationCustomInput = z.infer<typeof inflationCustomInput>
export type InflationCAGRInput = z.infer<typeof inflationCAGRInput>
export type InflationOutput = z.infer<typeof inflationOutput>
export type InflationCAGROutput = z.infer<typeof inflationCAGROutput>
