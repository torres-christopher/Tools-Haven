import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { AgeCalculatorInput, AgeCalculatorOutput } from './age-calculator.schema.js'
import { calculateAge } from './age-calculator.service.js'
import { subDays } from 'date-fns'

// Fixed reference date for all tests — July 11 2026 (Saturday)
const now = new Date('2026-07-11')
const yesterday: Date = subDays(now, 1) // July 10 2026 (Friday)

// Standard birthdate — October 12 1995 (Thursday, day 285, week 41)
const birthdayNormal: Date = new Date('1995-10-12')

// Leap year birthdate — Feb 29 2000, next birthday in non-leap year clamps to Mar 1
const birthdayLeapYear: Date = new Date('2000-02-29')

// ISO week edge cases
const birthdayWeekOne: Date = new Date('2025-12-30') // Dec 30 2025 = ISO week 1 of 2026
const birthdayDayOne: Date = new Date('2026-01-01') // Jan 1 2026 = ISO week 1 of 2026

describe('calculateAge', () => {
  // Freeze time to a known date so new Date() inside the service is deterministic
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(now)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // ── Age ─────────────────────────────────────────────────────────────────────

  it('Returns correct age for a standard birthdate', () => {
    // Oct 12 1995 to Jul 11 2026 = 30 years, 8 months, 29 days
    const input: AgeCalculatorInput = { birthDate: birthdayNormal }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.age.years).toBe(30)
    expect(result.age.months).toBe(8)
    expect(result.age.days).toBe(29)
  })

  it('Returns zero age when birthdate is today', () => {
    const input: AgeCalculatorInput = { birthDate: now }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.age.years).toBe(0)
    expect(result.age.months).toBe(0)
    expect(result.age.days).toBe(0)
  })

  it('Returns 1 day when birthdate was yesterday', () => {
    const input: AgeCalculatorInput = { birthDate: yesterday }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.age.years).toBe(0)
    expect(result.age.months).toBe(0)
    expect(result.age.days).toBe(1)
  })

  // ── Next birthday ────────────────────────────────────────────────────────────

  it('Returns correct days and weekday until next birthday', () => {
    // Next Oct 12 from Jul 11 2026 = 93 days away, falls on Monday
    const input: AgeCalculatorInput = { birthDate: birthdayNormal }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthday.days).toBe(93)
    expect(result.birthday.weekday).toBe(1) // Monday
  })

  it('Returns 365 days when birthday is today', () => {
    // Today counts as "next year" — next birthday is a full year away
    const input: AgeCalculatorInput = { birthDate: now }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthday.days).toBe(365)
    expect(result.birthday.weekday).toBe(7) // Sunday (Jul 11 2027)
  })

  it('Returns 364 days when birthday was yesterday', () => {
    // Yesterday's birthday just passed, next one is in 364 days
    const input: AgeCalculatorInput = { birthDate: yesterday }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthday.days).toBe(364)
    expect(result.birthday.weekday).toBe(6) // Saturday (Jul 10 2027)
  })

  it('Handles Feb 29 birthday in a non-leap year by clamping to Mar 1', () => {
    // 2027 is not a leap year, so Feb 29 clamps to Mar 1 2027
    const input: AgeCalculatorInput = { birthDate: birthdayLeapYear }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthday.weekday).toBe(1) // Mar 1 2027 = Monday
  })

  // ── Birthdate metadata ───────────────────────────────────────────────────────

  it('Returns correct weekday, day of year, and ISO week for a standard birthdate', () => {
    // Oct 12 1995 = Thursday, day 285, ISO week 41
    const input: AgeCalculatorInput = { birthDate: birthdayNormal }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthdate.weekday).toBe(4) // Thursday
    expect(result.birthdate.day).toBe(285)
    expect(result.birthdate.week).toBe(41)
  })

  it('Returns ISO week 1 for Dec 30 2025 (ISO year boundary)', () => {
    // Dec 30 2025 belongs to ISO week 1 of 2026
    const input: AgeCalculatorInput = { birthDate: birthdayWeekOne }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthdate.weekday).toBe(2) // Tuesday
    expect(result.birthdate.day).toBe(364)
    expect(result.birthdate.week).toBe(1)
  })

  it('Returns day 1 and ISO week 1 for Jan 1 2026', () => {
    const input: AgeCalculatorInput = { birthDate: birthdayDayOne }
    const result: AgeCalculatorOutput = calculateAge(input)

    expect(result.birthdate.weekday).toBe(4) // Thursday
    expect(result.birthdate.day).toBe(1)
    expect(result.birthdate.week).toBe(1)
  })
})
