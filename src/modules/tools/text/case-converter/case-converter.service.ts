import type {
  PrevodVelikostiZnakuInput,
  PrevodVelikostiZnakuOutput,
} from './case-converter.schema.js'

// Sentence Case
// Lowercases everything first, then capitalises the first letter of the string
// and the first letter after any sentence-ending punctuation followed by whitespace.
// \p{L} matches any Unicode letter so Czech, Cyrillic etc. are handled correctly.
export const sentenceCase = function (
  input: PrevodVelikostiZnakuInput,
): PrevodVelikostiZnakuOutput {
  return input.text
    .toLocaleLowerCase()
    .replace(/(^\s*\p{L})|([.!?]\s+\p{L})/gu, (match) => match.toLocaleUpperCase())
}

// Lower Case
export const lowerCase = function (input: PrevodVelikostiZnakuInput): PrevodVelikostiZnakuOutput {
  return input.text.toLocaleLowerCase()
}

// Upper Case
export const upperCase = function (input: PrevodVelikostiZnakuInput): PrevodVelikostiZnakuOutput {
  return input.text.toLocaleUpperCase()
}

// Capitalized Case
// Matches each word (any Unicode letter sequence) and uppercases only its first character.
// toLocaleLowerCase first ensures mixed-case input is fully normalised before capitalising.
export const capitalizeCase = function (
  input: PrevodVelikostiZnakuInput,
): PrevodVelikostiZnakuOutput {
  return (
    input.text
      // toLocale* variants are used throughout to correctly handle locale-sensitive casing
      // e.g. Czech, Turkish, and other languages where case rules differ from ASCII.
      .toLocaleLowerCase()
      .replace(/\p{L}+/gu, (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
  )
}

// Reverse text
export const reverseText = function (input: PrevodVelikostiZnakuInput): PrevodVelikostiZnakuOutput {
  return input.text.split('').reverse().join('')
}
// Map for letters that don't decompose via Unicode NFD normalization —
// these are distinct letters in Unicode, not base + combining mark,
// so they pass through NFD unchanged and need explicit replacement.
const nonDecomposableMap: Record<string, string> = {
  ß: 'ss',
  đ: 'd',
  Đ: 'D',
  ł: 'l',
  Ł: 'L',
  ø: 'o',
  Ø: 'O',
  æ: 'ae',
  Æ: 'AE',
  œ: 'oe',
  Œ: 'OE',
  þ: 'th',
  Þ: 'Th',
}

// No Diacritics (SMS case)
// Decomposes accented characters into base letter + combining diacritical mark (NFD),
// then strips the combining marks, leaving plain letters with original casing intact.
// Handles Czech, Slovak, and Cyrillic diacritics (á, č, ě, ř, š, ž, ů, ё, й etc).
// A small explicit map covers letters that don't decompose via NFD
// (German ß, Polish ł, Scandinavian ø, etc).
export const noDiacritics = function (
  input: PrevodVelikostiZnakuInput,
): PrevodVelikostiZnakuOutput {
  const normalized = input.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return normalized.replace(/[ßđĐłŁøØæÆœŒþÞ]/g, (char) => nonDecomposableMap[char] ?? char)
}
