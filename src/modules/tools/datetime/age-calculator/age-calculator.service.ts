import type { AgeCalculatorInput, AgeCalculatorOutput } from './age-calculator.schema.js'
import {
  intervalToDuration,
  getISODay,
  getDayOfYear,
  getISOWeek,
  getYear,
  setYear,
  isAfter,
  differenceInCalendarDays,
} from 'date-fns'

// Returns exact age as years, months, days that add up to the full span
const calculateCompleteAge = (birthdate: Date) => {
  const today: Date = new Date()
  // intervalToDuration returns object containing breakdown
  const age = intervalToDuration({ start: birthdate, end: today })

  // All fields are optional and can be undefined, default to 0
  return {
    days: age.days ?? 0,
    months: age.months ?? 0,
    years: age.years ?? 0,
  }
}

// Returns days until next birthday and the weekday it falls on
const calculateBirthdayTime = (birthdate: Date) => {
  const now: Date = new Date()
  now.setHours(0, 0, 0, 0) // Strip time so birthday comparison is date-only
  const currentYear: number = getYear(now)

  // Move the birthday to the current year to check if it has passed
  const movedBirthday: Date = setYear(birthdate, currentYear)

  // If today is the birthday or it has already passed, use next year
  // Feb 29 in a non-leap year is clamped to Mar 1 by setYear
  const nextBirthday: Date = !isAfter(movedBirthday, now)
    ? setYear(birthdate, currentYear + 1)
    : setYear(birthdate, currentYear)

  return {
    days: differenceInCalendarDays(nextBirthday, now),
    weekday: getISODay(nextBirthday), // 1 = Monday, 7 = Sunday
  }
}

// Returns ISO weekday, ISO week number, and day of year for the birthdate
const getBirthdateData = (birthdate: Date) => {
  return {
    weekday: getISODay(birthdate), // 1 = Monday, 7 = Sunday
    day: getDayOfYear(birthdate), // 1-366
    week: getISOWeek(birthdate), // ISO week, handles year boundary correctly
  }
}

export const calculateAge = (input: AgeCalculatorInput): AgeCalculatorOutput => {
  const age = calculateCompleteAge(input.birthDate)
  const birthday = calculateBirthdayTime(input.birthDate)
  const birthdate = getBirthdateData(input.birthDate)

  return {
    age,
    birthday,
    birthdate,
  }
}
