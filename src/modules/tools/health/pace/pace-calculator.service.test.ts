import { describe, it, expect } from 'vitest'
import type {
  PaceCalculatorPaceInput,
  PaceCalculatorTimeInput,
  PaceCalculatorDistanceInput,
} from './pace-calculator.schema.js'
import {
  calculatePace,
  calculateTime,
  calculateDistance,
  buildPaceResult,
} from './pace-calculator.service.js'

// Pace mode
describe('calculatePace', () => {
  // Clean division
  it('Correctly calculates pace from distance and time', () => {
    const input: PaceCalculatorPaceInput = { distance: 5, time: 1500 }

    const result = calculatePace(input)
    expect(result.paceSecondsPerKm).toBe(300)
    expect(result.speedKmh).toBe(12)
    expect(result.speedMPerMin).toBe(200)
  })

  // Fractional pace/speed
  it('Correctly calculates pace with a non-round result', () => {
    const input: PaceCalculatorPaceInput = { distance: 3, time: 630 }

    const result = calculatePace(input)
    expect(result.paceSecondsPerKm).toBe(210)
    expect(result.speedKmh).toBeCloseTo(17.142857, 5)
    expect(result.speedMPerSec).toBeCloseTo(4.761905, 5)
  })
})

// Time mode
describe('calculateTime', () => {
  // Clean division
  it('Correctly calculates time from pace and distance', () => {
    const input: PaceCalculatorTimeInput = { pace: 300, distance: 10 }

    const result = calculateTime(input)
    expect(result.timeSeconds).toBe(3000)
    expect(result.paceSecondsPerKm).toBe(300)
  })

  // Fractional distance
  it('Correctly calculates time with a fractional distance', () => {
    const input: PaceCalculatorTimeInput = { pace: 200, distance: 7.5 }

    const result = calculateTime(input)
    expect(result.timeSeconds).toBe(1500)
    expect(result.speedMPerSec).toBe(5)
  })
})

// Distance mode
describe('calculateDistance', () => {
  // Clean division
  it('Correctly calculates distance from time and pace', () => {
    const input: PaceCalculatorDistanceInput = { time: 3000, pace: 300 }

    const result = calculateDistance(input)
    expect(result.distanceKm).toBe(10)
    expect(result.paceSecondsPerKm).toBe(300)
  })

  // Fractional result
  it('Correctly calculates distance with a non-round result', () => {
    const input: PaceCalculatorDistanceInput = { time: 1500, pace: 200 }

    const result = calculateDistance(input)
    expect(result.distanceKm).toBe(7.5)
  })
})

// Shared result building
describe('buildPaceResult', () => {
  // Race predictions
  it('Correctly builds race-time predictions at a given pace', () => {
    const result = buildPaceResult(5, 1500) // 300 sec/km pace

    expect(result.racePredictions).toHaveLength(8)
    expect(result.racePredictions.find((r) => r.id === '1k')?.timeSeconds).toBe(300)
    expect(result.racePredictions.find((r) => r.id === '5k')?.timeSeconds).toBe(1500)
    expect(result.racePredictions.find((r) => r.id === '10k')?.timeSeconds).toBe(3000)
    expect(result.racePredictions.find((r) => r.id === 'marathon')?.timeSeconds).toBeCloseTo(12658.5, 5)
  })

  // Zero-distance guard, since distanceKm is a divisor
  it('Produces Infinity for zero distance rather than throwing', () => {
    const result = buildPaceResult(0, 100)
    expect(result.paceSecondsPerKm).toBe(Infinity)
  })
})