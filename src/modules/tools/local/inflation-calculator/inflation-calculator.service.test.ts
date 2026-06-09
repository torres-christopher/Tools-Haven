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

describe('calculateInflationAdjustedValue — edge cases', () => {
  // Earliest to latest monthly data point
  it('Calculates correctly from first to last available monthly entry', () => {
    const input: InflationRealInput = {
      value: 100,
      startYear: 1997,
      startMonth: 1,
      endYear: 2026,
      endMonth: 3,
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(265.45)
  })

  // Earliest to latest yearly data point
  it('Calculates correctly from first to last available yearly average', () => {
    const input: InflationRealInput = {
      value: 100,
      startYear: 1997,
      startMonth: 'average',
      endYear: 2025,
      endMonth: 'average',
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(251.57)
  })

  // Large value
  it('Handles large input values without precision loss', () => {
    const input: InflationRealInput = {
      value: 1000000,
      startYear: 1997,
      startMonth: 1,
      endYear: 2025,
      endMonth: 12,
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(2_617_801.05)
  })
})

describe('calculateCustomInflation — edge cases', () => {
  // Zero years forward, should return original value
  it('Returns original value when years is 0 (forward)', () => {
    const input: InflationCustomInput = {
      value: 100,
      inflationRate: 3,
      years: 0,
      type: 'forward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBe(100)
  })

  // Zero years backward, should return original value
  it('Returns original value when years is 0 (backward)', () => {
    const input: InflationCustomInput = {
      value: 100,
      inflationRate: 3,
      years: 0,
      type: 'backward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBe(100)
  })

  // One year at 10%, exact check
  it('Calculates exactly one year at 10% forward', () => {
    const input: InflationCustomInput = {
      value: 100,
      inflationRate: 10,
      years: 1,
      type: 'forward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBeCloseTo(110)
  })

  // Forward then backward roundtrip, should recover original value
  it('Forward then backward roundtrip returns original value', () => {
    const forward: InflationCustomInput = {
      value: 100,
      inflationRate: 3,
      years: 10,
      type: 'forward',
    }
    const forwardResult = calculateCustomInflation(forward)

    const backward: InflationCustomInput = {
      value: forwardResult,
      inflationRate: 3,
      years: 10,
      type: 'backward',
    }
    const result: InflationOutput = calculateCustomInflation(backward)
    expect(result).toBeCloseTo(100)
  })
})
