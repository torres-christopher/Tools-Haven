import type {
  DateCalculatorRangeInput,
  DateCalculatorArithmeticInput,
  DateCalculatorWeekInput,
  DateCalculatorRangeOutput,
  DateCalculatorArithmeticOutput,
  DateCalculatorWeekOutput,
} from './date-calculator.schema.js'
import { AppError, HttpStatus } from '../../../../shared/types/errors.js'

export const calculateRangeInDates = function (
  input: DateCalculatorRangeInput,
): DateCalculatorRangeOutput {
  const _MS_PER_DAY: number = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    input.startDate.getFullYear(),
    input.startDate.getMonth(),
    input.startDate.getDate(),
  )
  const utc2 = Date.UTC(
    input.startDate.getFullYear(),
    input.startDate.getMonth(),
    input.startDate.getDate(),
  )

  let daysTotal: number = Math.floor((utc2 - utc1) / _MS_PER_DAY)
  return {
    daystotal,
  }
}
