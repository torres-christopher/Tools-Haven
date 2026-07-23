// Converts "h:mm:ss", "mm:ss", or plain seconds into total seconds.
// Segment count picks the format; regex upstream guarantees one of these three shapes.
export const parseDuration = (input: string): number => {
  const split: string[] = input.split(':')
  let [hours, minutes, seconds]: number[] = [0, 0, 0]

  switch (split.length) {
    case 1:
      seconds = Number(split[0])
      break
    case 2:
      minutes = Number(split[0])
      seconds = Number(split[1])
      break
    case 3:
      hours = Number(split[0])
      minutes = Number(split[1])
      seconds = Number(split[2])
      break
    default:
      throw new Error(`Invalid duration format: "${input}"`)
  }

  return hours * 3600 + minutes * 60 + seconds
}

// Splits seconds into hours/minutes/seconds, unrounded.
// `seconds` can be fractional (e.g. 30.7), needed for the natural-language pace sentence.
export const durationToParts = (
  totalSeconds: number,
): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60)
  const seconds = totalSeconds - hours * 3600 - minutes * 60
  return { hours, minutes, seconds }
}

// Formats seconds as "hh:mm:ss" or "mm:ss" for display (splits, race times, time-mode result).
// Rounds first, hides hours when zero, pads minutes/seconds to 2 digits.
export const formatDuration = (input: number): string => {
  const { hours, minutes, seconds } = durationToParts(Math.round(input))
  const pad = (n: number) => String(n).padStart(2, '0')

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }
  return `${pad(minutes)}:${pad(seconds)}`
}
