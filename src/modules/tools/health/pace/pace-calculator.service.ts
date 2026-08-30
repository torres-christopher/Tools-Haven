import type {
  PaceCalculatorPaceInput,
  PaceCalculatorTimeInput,
  PaceCalculatorDistanceInput,
} from './pace-calculator.schema.js'

// Standard race distances
const STANDARD_RACE_DISTANCES: { id: string; distanceKm: number }[] = [
  { id: '400m', distanceKm: 0.4 },
  { id: '800m', distanceKm: 0.8 },
  { id: '1k', distanceKm: 1 },
  { id: '3k', distanceKm: 3 },
  { id: '5k', distanceKm: 5 },
  { id: '10k', distanceKm: 10 },
  { id: 'half-marathon', distanceKm: 21.0975 },
  { id: 'marathon', distanceKm: 42.195 },
]

// One result format for all three modes for easier output
export interface PaceResult {
  distanceKm: number
  timeSeconds: number
  paceSecondsPerKm: number
  speedKmh: number
  speedMPerMin: number
  speedMPerSec: number
  racePredictions: { id: string; distanceKm: number; timeSeconds: number }[]
}

// Using distance/time creates the full result
export const buildPaceResult = (distanceKm: number, timeSeconds: number): PaceResult => {
  const paceSecondsPerKm = timeSeconds / distanceKm

  const racePredictions = STANDARD_RACE_DISTANCES.map((race) => ({
    id: race.id,
    distanceKm: race.distanceKm,
    timeSeconds: race.distanceKm * paceSecondsPerKm,
  }))

  return {
    distanceKm,
    timeSeconds,
    paceSecondsPerKm,
    speedKmh: 3600 / paceSecondsPerKm,
    speedMPerMin: 60000 / paceSecondsPerKm,
    speedMPerSec: 1000 / paceSecondsPerKm,
    racePredictions,
  }
}

// Three functions that all use the buildPaceResult to get to the result
// Pace mode: distance and time are both used directly, nothing to change
export const calculatePace = (input: PaceCalculatorPaceInput): PaceResult => {
  return buildPaceResult(input.distance, input.time)
}

// Time mode: get time from pace * distance.
export const calculateTime = (input: PaceCalculatorTimeInput): PaceResult => {
  const timeSeconds = input.pace * input.distance
  return buildPaceResult(input.distance, timeSeconds)
}

// Distance mode: get distance from time / pace.
export const calculateDistance = (input: PaceCalculatorDistanceInput): PaceResult => {
  const distanceKm = input.time / input.pace
  return buildPaceResult(distanceKm, input.time)
}