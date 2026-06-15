import type { PocetZnakuInput, PocetZnakuOutput } from './word-count.schema.js'

export const calculatePocetZnaku = function (input: PocetZnakuInput): PocetZnakuOutput {
  return {
    textLengthRaw: calculateTextLengthRaw(input),
    textLengthNoSpace: calculateTextLengthNoSpace(input),
    wordCount: calculateWordCount(input),
    sentenceCount: calculateSentenceCount(input),
    nsCount: calculateNsCount(input),
    lineCount: calculateLineCount(input),
    readingTime: calculateReadingTime(input),
  }
}

// Text length raw
const calculateTextLengthRaw = function (input: PocetZnakuInput): number {
  return input.length
}

// Text length without spaces
const calculateTextLengthNoSpace = function (input: PocetZnakuInput): number {
  return input.replace(/\s/g, '').length
}

// \p{L}+ matches any Unicode letter sequence and handles Czech, Arabic, Cyrillic etc.
// Numbers and punctuation alone are not counted as words.
const calculateWordCount = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0
  const words = input.match(/\p{L}+/gu)
  return words ? words.length : 0
}

// Sentence detection is an approximation — looks for a word of 3+ characters
// followed by sentence-ending punctuation and a capitalised word.
// Adds 1 to account for the final sentence which has no following boundary.
// Known limitation: abbreviations like "Ing." or "Dr." can trigger false boundaries.
const calculateSentenceCount = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0

  // Strip text that has no real words at all
  if (!input.match(/\p{L}/u)) return 0

  // Count boundaries — word of 4+ chars, then punctuation, then capital
  const boundaries = input.match(/\p{L}{3,}[.?!]+\s+\p{Lu}/gu)
  const boundaryCount = boundaries ? boundaries.length : 0

  return boundaryCount + 1
}

// Normostrana = 1800 characters including spaces
// Result is a decimal —-> 900 chars = 0.5 normostrana
const calculateNsCount = function (input: PocetZnakuInput): number {
  const textLength: number = calculateTextLengthRaw(input)
  return textLength / 1800
}

// Splits on all three line ending conventions: \n (Unix), \r\n (Windows), \r (old Mac)
// trim() first so trailing newlines don't add phantom lines
const calculateLineCount = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0
  return input.trim().split(/\r\n|\r|\n/).length
}

// 200 words per minute is a standard average reading speed
// Math.ceil so even short texts show at least 1 minute
const calculateReadingTime = function (input: PocetZnakuInput): number {
  if (isWhitespaceString(input)) return 0
  const wordCount = calculateWordCount(input)
  return Math.ceil(wordCount / 200)
}

// Used as an early return guard --> whitespace-only strings should behave like empty strings
// for counts that have semantic meaning (words, sentences, lines, reading time)
const isWhitespaceString = (input: PocetZnakuInput): boolean => !input.replace(/\s/g, '').length
