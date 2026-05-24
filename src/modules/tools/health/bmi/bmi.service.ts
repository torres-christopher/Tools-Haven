import type { BmiInput, BmiOutput } from './bmi.schema.js'

export const calculateBmi = function (input: BmiInput): BmiOutput {
  // WHO formula: weight (kg) / height (m)² — height converted from cm to m first
  const bmiValue: number = input.weight / (input.height / 100) ** 2

  // Default is overwritten in every branch — TypeScript requires initialisation
  let bmiClassification:
    | 'underweight'
    | 'normal'
    | 'overweight'
    | 'obese-1'
    | 'obese-2'
    | 'obese-3' = 'normal'

  if (bmiValue < 18.5) {
    bmiClassification = 'underweight'
  } else if (bmiValue < 25) {
    bmiClassification = 'normal'
  } else if (bmiValue < 30) {
    bmiClassification = 'overweight'
  } else if (bmiValue < 35) {
    bmiClassification = 'obese-1'
  } else if (bmiValue < 40) {
    bmiClassification = 'obese-2'
    // Explicit >= 40 check rather than else, for clarity matching WHO boundary definitions
  } else if (bmiValue >= 40) {
    bmiClassification = 'obese-3'
  }
  return {
    bmiValue,
    bmiClassification,
  }
}
