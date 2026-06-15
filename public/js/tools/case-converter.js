'use strict'

const textArea = document.getElementById('text')
const buttons = document.querySelectorAll('.form-actions button')

// Mirrors the fallback map in the server-side service —
// letters that don't decompose via Unicode NFD normalization.
const nonDecomposableMap = {
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

buttons.forEach((button) => {
  button.addEventListener('click', function (event) {
    event.preventDefault()
    let result = ''
    const conversionType = button.value
    switch (conversionType) {
      case 'sentence-case':
        result = textArea.value
          .toLocaleLowerCase()
          .replace(/(^\s*\p{L})|([.!?]\s+\p{L})/gu, (match) => match.toLocaleUpperCase())
        break
      case 'lower-case':
        result = textArea.value.toLocaleLowerCase()
        break
      case 'upper-case':
        result = textArea.value.toLocaleUpperCase()
        break
      case 'capitalized-case':
        result = textArea.value
          .toLocaleLowerCase()
          .replace(/\p{L}+/gu, (word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
        break
      case 'no-diacritics':
        result = textArea.value
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[ßđĐłŁøØæÆœŒþÞ]/g, (char) => nonDecomposableMap[char] ?? char)
        break
      case 'reverse':
        result = textArea.value.split('').reverse().join('')
        break
    }
    textArea.value = result
  })
})
