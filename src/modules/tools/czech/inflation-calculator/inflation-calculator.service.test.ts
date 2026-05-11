import { describe, it, expect } from 'vitest'
import type {
  InflationRealInput,
  InflationCustomInput,
  InflationOutput,
} from './inflation-calculator.schema.js'
import {
  calculateInflationAdjustedValue,
  calculateCustomInflation,
} from './inflation-calculator.service.js'

describe('calculateInflationAdjustedValue', () => {
  it('Calculates correctly inflation output based on real data', () => {
    const input: InflationRealInput = {
      value: 100,
      startYear: 1997,
      startMonth: 1,
      endYear: 2025,
      endMonth: 12,
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(261.78)
  })

  it('Calculates correctly inflation output in one year', () => {
    const input: InflationRealInput = {
      value: 100,
      startYear: 1997,
      startMonth: 1,
      endYear: 1997,
      endMonth: 12,
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(108.66)
  })

  it('Calculates correctly inflation output in in average mode', () => {
    const input: InflationRealInput = {
      value: 100,
      startYear: 1997,
      startMonth: 'average',
      endYear: 1998,
      endMonth: 'average',
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(110.69)
  })
})

describe('calculateCustomInflation', () => {
  it('Calculates correctly custom inflation output forward', () => {
    const input: InflationCustomInput = {
      value: 100,
      inflationRate: 3,
      years: 10,
      type: 'forward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBeCloseTo(134.39)
  })
  it('Calculates correctly custom inflation output backward', () => {
    const input: InflationCustomInput = {
      value: 100,
      inflationRate: 3,
      years: 10,
      type: 'backward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBeCloseTo(74.41)
  })

  it('Throws error for out of bounds custom inflation', () => {
    const input: InflationCustomInput = {
      value: 10000,
      inflationRate: 99999,
      years: 10000,
      type: 'forward',
    }
    expect(() => calculateCustomInflation(input)).toThrow()
  })
})
