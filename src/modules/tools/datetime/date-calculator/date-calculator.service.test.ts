import { describe, it, expect } from 'vitest'
import type {
  DateCalculatorRangeInput,
  DateCalculatorArithmeticInput,
  DateCalculatorWeekInput,
  DateCalculatorRangeOutput,
  DateCalculatorArithmeticOutput,
  DateCalculatorWeekOutput,
} from './date-calculator.schema.js'
import {
  calculateRange,
  calculateArithmetic,
  calculateWeekNumber,
} from './date-calculator.service.js'

// Range
describe('calculateRange', () => {
  // Valid values
  it('Correctly calculates range between valid dates', () => {
    const input: DateCalculatorRangeInput = {
      startDate: new Date('2026-01-31'),
      endDate: new Date('2026-03-01'),
    }

    const result: DateCalculatorRangeOutput = calculateRange(input)
    expect(result.daysTotal).toBe(29)
    expect(result.weeksTotal).toBe(4)
    expect(result.weeksRemainder).toBe(1)
    expect(result.monthsTotal).toBe(1)
    expect(result.monthsRemainder).toBe(1)
    expect(result.yearsTotal).toBe(0)
    expect(result.yearsRemainder).toBe(29)
  })

  // Same dates
  it('Correctly calculates range between same dates', () => {
    const input: DateCalculatorRangeInput = {
      startDate: new Date('2026-01-31'),
      endDate: new Date('2026-01-31'),
    }

    const result: DateCalculatorRangeOutput = calculateRange(input)
    expect(result.daysTotal).toBe(0)
    expect(result.weeksTotal).toBe(0)
    expect(result.weeksRemainder).toBe(0)
    expect(result.monthsTotal).toBe(0)
    expect(result.monthsRemainder).toBe(0)
    expect(result.yearsTotal).toBe(0)
    expect(result.yearsRemainder).toBe(0)
  })

  // Reverse dates
  it('Correctly calculates range between reverse dates', () => {
    const input: DateCalculatorRangeInput = {
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-01-31'),
    }

    const result: DateCalculatorRangeOutput = calculateRange(input)
    expect(result.daysTotal).toBe(29)
    expect(result.weeksTotal).toBe(4)
    expect(result.weeksRemainder).toBe(1)
    expect(result.monthsTotal).toBe(1)
    expect(result.monthsRemainder).toBe(1)
    expect(result.yearsTotal).toBe(0)
    expect(result.yearsRemainder).toBe(29)
  })
})

// Arithmetic
describe('calculateArithmetic', () => {
  // Adding
  it('Correctly adds to date', () => {
    const input: DateCalculatorArithmeticInput = {
      startDate: new Date('2026-01-31'),
      type: 'add',
      days: 1,
      weeks: 2,
      months: 3,
      years: 4,
    }

    const result: DateCalculatorArithmeticOutput = calculateArithmetic(input)
    expect(result.outputDate).toEqual(new Date('2030-05-15'))
    expect(result.weekday).toBe(3)
  })

  // Subtracting
  it('Correctly subtracts from date', () => {
    const input: DateCalculatorArithmeticInput = {
      startDate: new Date('2030-05-15'),
      type: 'subtract',
      days: 1,
      weeks: 2,
      months: 3,
      years: 4,
    }

    const result: DateCalculatorArithmeticOutput = calculateArithmetic(input)
    expect(result.outputDate).toEqual(new Date('2026-01-31'))
    expect(result.weekday).toBe(6)
  })

  // Clamping case
  it('Correctly gets date by months', () => {
    const input: DateCalculatorArithmeticInput = {
      startDate: new Date('2026-01-31'),
      type: 'add',
      days: 0,
      weeks: 0,
      months: 1,
      years: 0,
    }

    const result: DateCalculatorArithmeticOutput = calculateArithmetic(input)
    expect(result.outputDate).toEqual(new Date('2026-02-28'))
    expect(result.weekday).toBe(6)
  })
})

// Week number
describe('calculateWeekNumber', () => {
  // Week number
  it('Correctly gets week number result', () => {
    const input: DateCalculatorWeekInput = {
      inputDate: new Date('2026-01-31'),
    }

    const result: DateCalculatorWeekOutput = calculateWeekNumber(input)
    expect(result.week).toBe(5)
    expect(result.year).toBe(2026)
    expect(result.range.weekStart).toEqual(new Date('2026-01-26'))
    expect(result.range.weekEnd).toEqual(new Date('2026-02-01'))
  })

  // Year boundary
  it('Correctly gets week number at the end/start of the year', () => {
    const input: DateCalculatorWeekInput = {
      inputDate: new Date('2025-12-30'),
    }

    const result: DateCalculatorWeekOutput = calculateWeekNumber(input)
    expect(result.week).toBe(1)
    expect(result.year).toBe(2026)
    expect(result.range.weekStart).toEqual(new Date('2025-12-29'))
    expect(result.range.weekEnd).toEqual(new Date('2026-01-04'))
  })
})
