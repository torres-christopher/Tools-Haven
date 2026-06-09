import {
  type InflationRealInput,
  type InflationCustomInput,
  type InflationCAGRInput,
  type InflationOutput,
  type InflationCAGROutput,
  monthlyKey,
} from './inflation-calculator.schema.js'
import { cpiMonthly, cpiYearly } from '../../../../shared/data/tools/czech/cpi.js'
import { AppError, HttpStatus } from '../../../../shared/types/errors.js'

// -------- Helper Functions --------------- //
// Defensive guard — schema should prevent missing keys, but better than returning undefined
const getCpiValue = (year: number, month: number | 'average'): number => {
  if (month === 'average') {
    const value = cpiYearly[year]
    if (value === undefined) {
      throw new Error(`Missing yearly CPI data for year: ${year}`)
    }
    return value
  }

  const key = monthlyKey(year, month)
  const value = cpiMonthly[key]

  if (value === undefined) {
    throw new Error(`Missing monthly CPI data for: ${key}`)
  }

  return value
}

// -------- Service Functions --------------- //
// Adjusts value using the ratio of end CPI to start CPI.
// Formula: value × (endCPI ÷ startCPI)
export const calculateInflationAdjustedValue = function (
  input: InflationRealInput,
): InflationOutput {
  const startValue = getCpiValue(input.startYear, input.startMonth)

  const endValue = getCpiValue(input.endYear, input.endMonth)

  return input.value * (endValue / startValue)
}

// Compound interest formula: value × ((1 + rate) ^ years)
// Divides instead of multiplies for backward projection.
// Throws if result exceeds MAX_SAFE_INTEGER — technically valid input, but floating point precision breaks down beyond this threshold.
export const calculateCustomInflation = function (input: InflationCustomInput): InflationOutput {
  const factor = (100 + input.inflationRate) / 100
  let result: number

  if (input.type === 'forward') {
    result = input.value * factor ** input.years
  } else {
    result = input.value / factor ** input.years
  }

  if (result > Number.MAX_SAFE_INTEGER)
    throw new AppError('Result out of bounds', HttpStatus.BAD_REQUEST)
  return result
}

// Calculates the Compound Annual Growth Rate (CAGR) between two values over a number of years.
// Formula: (endValue / startValue) ^ (1 / years) - 1
export const calculateCAGR = function (input: InflationCAGRInput): InflationCAGROutput {
  const result = (input.endValue / input.startValue) ** (1 / input.years) - 1
  return result
}
