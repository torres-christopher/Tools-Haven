import type {
  DateCalculatorRangeInput,
  DateCalculatorArithmeticInput,
  DateCalculatorWeekInput,
  DateCalculatorRangeOutput,
  DateCalculatorArithmeticOutput,
  DateCalculatorWeekOutput,
} from './date-calculator.schema.js'
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  getISODay,
  getISOWeek,
  startOfISOWeek,
  getISOWeekYear,
} from 'date-fns'

// Get date difference
const dayDifference = (startDate: Date, endDate: Date) => {
  return differenceInDays(endDate, startDate)
}

// Get remainder of months
const monthsRemainderCount = (startDate: Date, endDate: Date, months: number): number => {
  const newDate = addMonths(startDate, months)
  return dayDifference(newDate, endDate)
}

// Get remainder of years
const yearsRemainderCount = (startDate: Date, endDate: Date, years: number): number => {
  const newDate = addYears(startDate, years)
  return dayDifference(newDate, endDate)
}

// Range difference
export const calculateRange = function (
  input: DateCalculatorRangeInput,
): DateCalculatorRangeOutput {
  // Set chronological order
  const [earlier, later] =
    input.startDate > input.endDate
      ? [input.endDate, input.startDate]
      : [input.startDate, input.endDate]

  // Days
  const daysTotal: number = dayDifference(earlier, later)

  // Weeks
  const weeksTotal: number = Math.floor(daysTotal / 7)
  const weeksRemainder: number = daysTotal % 7

  // Months
  const monthsTotal: number = differenceInMonths(later, earlier)
  const monthsRemainder: number = monthsRemainderCount(earlier, later, monthsTotal)

  // Years
  const yearsTotal: number = differenceInYears(later, earlier)
  const yearsRemainder: number = yearsRemainderCount(earlier, later, yearsTotal)

  return {
    daysTotal,
    weeksTotal,
    weeksRemainder,
    monthsTotal,
    monthsRemainder,
    yearsTotal,
    yearsRemainder,
  }
}

// Arithmetic
export const calculateArithmetic = function (
  input: DateCalculatorArithmeticInput,
): DateCalculatorArithmeticOutput {
  let outputDate: Date = input.startDate

  if (input.type === 'add') {
    outputDate = addYears(outputDate, input.years)
    outputDate = addMonths(outputDate, input.months)
    outputDate = addWeeks(outputDate, input.weeks)
    outputDate = addDays(outputDate, input.days)
  } else {
    outputDate = subYears(outputDate, input.years)
    outputDate = subMonths(outputDate, input.months)
    outputDate = subWeeks(outputDate, input.weeks)
    outputDate = subDays(outputDate, input.days)
  }

  const weekday: number = getISODay(outputDate)

  return {
    outputDate,
    weekday,
  }
}

// Get week number
export const calculateWeekNumber = function (
  input: DateCalculatorWeekInput,
): DateCalculatorWeekOutput {
  const week: number = getISOWeek(input.inputDate)
  const year: number = getISOWeekYear(input.inputDate)
  const weekStart: Date = startOfISOWeek(input.inputDate)
  const weekEnd: Date = addDays(weekStart, 6)
  const range = {
    weekStart,
    weekEnd,
  }

  return {
    week,
    year,
    range,
  }
}
