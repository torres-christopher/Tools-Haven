import type {
  PrevodVelikostiZnakuInput,
  PrevodVelikostiZnakuOutput,
} from './prevod-velikosti-znaku.schema.js'

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
