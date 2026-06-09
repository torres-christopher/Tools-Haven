import { describe, it, expect } from 'vitest'
import type {
  InflationRealInput,
  InflationCustomInput,
  InflationCAGRInput,
  InflationOutput,
  InflationCAGROutput,
} from './inflation-calculator.schema.js'
import {
  calculateInflationAdjustedValue,
  calculateCustomInflation,
  calculateCAGR,
} from './inflation-calculator.service.js'

describe('calculateInflationAdjustedValue', () => {
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

  // Same period should return the original value unchanged
  it('Returns original value when start and end are the same point', () => {
    const input: InflationRealInput = {
      value: 100,
      startYear: 2020,
      startMonth: 1,
      endYear: 2020,
      endMonth: 1,
    }
    const result: InflationOutput = calculateInflationAdjustedValue(input)
    expect(result).toBeCloseTo(100)
  })
})

describe('calculateCustomInflation', () => {
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

  // One year at 10% backward, inverse of forward case
  it('Calculates exactly one year at 10% backward', () => {
    const input: InflationCustomInput = {
      value: 110,
      inflationRate: 10,
      years: 1,
      type: 'backward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBeCloseTo(100)
  })

  // Large value forward to verify no precision loss
  it('Handles large input values without precision loss', () => {
    const input: InflationCustomInput = {
      value: 1000000,
      inflationRate: 3,
      years: 10,
      type: 'forward',
    }
    const result: InflationOutput = calculateCustomInflation(input)
    expect(result).toBeCloseTo(1_343_916.38)
  })
})

describe('calculateCAGR', () => {
  // 5% annual growth over 1 year should return exactly 0.05
  it('Returns correct value with valid entries', () => {
    const input: InflationCAGRInput = {
      startValue: 100,
      endValue: 105,
      years: 1,
    }
    const result: InflationCAGROutput = calculateCAGR(input)
    expect(result).toBeCloseTo(0.05)
  })

  // Asset losing value should return a negative rate
  it('Returns correct value with descending values', () => {
    const input: InflationCAGRInput = {
      startValue: 100,
      endValue: 95,
      years: 1,
    }
    const result: InflationCAGROutput = calculateCAGR(input)
    expect(result).toBeCloseTo(-0.05)
  })

  // No change in value over any period should return 0
  it('Returns 0 % on same value', () => {
    const input: InflationCAGRInput = {
      startValue: 100,
      endValue: 100,
      years: 10,
    }
    const result: InflationCAGROutput = calculateCAGR(input)
    expect(result).toBe(0)
  })

  // Multi-year compound case -- real world property value growth
  it('Returns correct CAGR over multiple years', () => {
    const input: InflationCAGRInput = {
      startValue: 3_500_000,
      endValue: 11_000_000,
      years: 10,
    }
    const result: InflationCAGROutput = calculateCAGR(input)
    expect(result).toBeCloseTo(0.1209, 3)
  })
})
