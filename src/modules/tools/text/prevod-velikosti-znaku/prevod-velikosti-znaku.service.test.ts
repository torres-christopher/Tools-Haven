import { describe, it, expect } from 'vitest'
import { type PrevodVelikostiZnakuInput } from './prevod-velikosti-znaku.schema.js'
import {
  sentenceCase,
  lowerCase,
  upperCase,
  capitalizeCase,
  reverseText,
  noDiacritics,
} from './prevod-velikosti-znaku.service.js'

describe('sentenceCase', () => {
  it('Correctly capitalizes first letter of each sentence', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'lOrEm iPsUm dOlOr sIt aMeT. cOnSeCtEtUr aDiPiScInG ElIt! SeD Do eIuSmOd tEmPoR InCiDiDuNt uT LaBoRe eT DoLoRe mAgNa aLiQuA? tEnIm aD MiNiM VeNiAm, QuIs nOsTrUd eXeRcItAtIoN UlLaMcO LaBoRiS NiSi uT AlIqUiP Ex eA CoMmOdO CoNsEqUaT.',
      conversionType: 'sentence-case',
    }
    expect(sentenceCase(input)).toBe(
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit! Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? Tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    )
  })

  it('Correctly capitalizes first letter of each Cyrillic sentence', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'привет мир. как дела!',
      conversionType: 'sentence-case',
    }
    expect(sentenceCase(input)).toBe('Привет мир. Как дела!')
  })
})

describe('lowerCase', () => {
  it('Correctly changes all letters to lowercase', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'lOrEm iPsUm dOlOr sIt aMeT. cOnSeCtEtUr aDiPiScInG ElIt! SeD Do eIuSmOd tEmPoR InCiDiDuNt uT LaBoRe eT DoLoRe mAgNa aLiQuA? tEnIm aD MiNiM VeNiAm, QuIs nOsTrUd eXeRcItAtIoN UlLaMcO LaBoRiS NiSi uT AlIqUiP Ex eA CoMmOdO CoNsEqUaT.',
      conversionType: 'lower-case',
    }
    expect(lowerCase(input)).toBe(
      'lorem ipsum dolor sit amet. consectetur adipiscing elit! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    )
  })

  it('Correctly lowercases Cyrillic text', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'ПРИВЕТ МИР',
      conversionType: 'lower-case',
    }
    expect(lowerCase(input)).toBe('привет мир')
  })

  it('Returns Arabic text unchanged', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'مرحبا بالعالم',
      conversionType: 'lower-case',
    }
    expect(lowerCase(input)).toBe('مرحبا بالعالم')
  })
})

describe('upperCase', () => {
  it('Correctly changes all letters to uppercase', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'lorem ipsum dolor sit amet. consectetur adipiscing elit! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      conversionType: 'upper-case',
    }
    expect(upperCase(input)).toBe(
      'LOREM IPSUM DOLOR SIT AMET. CONSECTETUR ADIPISCING ELIT! SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA? TENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.',
    )
  })

  it('Correctly uppercases Cyrillic text', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'привет мир',
      conversionType: 'upper-case',
    }
    expect(upperCase(input)).toBe('ПРИВЕТ МИР')
  })

  it('Returns Arabic text unchanged', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'مرحبا بالعالم',
      conversionType: 'upper-case',
    }
    expect(upperCase(input)).toBe('مرحبا بالعالم')
  })
})

describe('capitalizeCase', () => {
  it('Correctly capitalizes each first letter of a word', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'lorem ipsum dolor sit amet. consectetur adipiscing elit! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      conversionType: 'capitalized-case',
    }
    expect(capitalizeCase(input)).toBe(
      'Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit! Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua? Tenim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.',
    )
  })

  it('Correctly capitalizes each Cyrillic word', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'привет мир',
      conversionType: 'capitalized-case',
    }
    expect(capitalizeCase(input)).toBe('Привет Мир')
  })
})

describe('reverseText', () => {
  it('Correctly reverses the string', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit! Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? Tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      conversionType: 'reverse',
    }
    expect(reverseText(input)).toBe(
      '.tauqesnoc odommoc ae xe piuqila tu isin sirobal ocmallu noitaticrexe durtson siuq ,mainev minim da mineT ?auqila angam erolod te erobal tu tnudidicni ropmet domsuie od deS !tile gnicsipida rutetcesnoC .tema tis rolod muspi meroL',
    )
  })

  it('Correctly reverses Cyrillic text', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'привет мир',
      conversionType: 'reverse',
    }
    expect(reverseText(input)).toBe('рим тевирп')
  })

  it('Correctly reverses Arabic text', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: 'مرحبا',
      conversionType: 'reverse',
    }
    expect(reverseText(input)).toBe('ابحرم')
  })

  it('Correctly reverses Chinese text', () => {
    const input: PrevodVelikostiZnakuInput = {
      text: '你好世界',
      conversionType: 'reverse',
    }
    expect(reverseText(input)).toBe('界世好你')
  })

  describe('noDiacritics', () => {
    it('Correctly strips Czech diacritics while preserving casing', () => {
      const input: PrevodVelikostiZnakuInput = {
        text: 'Příliš žluťoučký kůň úpěl nad ódami.',
        conversionType: 'no-diacritics',
      }
      expect(noDiacritics(input)).toBe('Prilis zlutoucky kun upel nad odami.')
    })

    it('Correctly strips Slovak diacritics including ľ, ĺ, ŕ, ô, ä', () => {
      const input: PrevodVelikostiZnakuInput = {
        text: 'Ľúbosť môže byť ťažká, ako stĺp na ceste.',
        conversionType: 'no-diacritics',
      }
      expect(noDiacritics(input)).toBe('Lubost moze byt tazka, ako stlp na ceste.')
    })

    it('Correctly strips Cyrillic diacritics, e.g. ё to е', () => {
      const input: PrevodVelikostiZnakuInput = {
        text: 'ёлка и ещё немного слов',
        conversionType: 'no-diacritics',
      }
      expect(noDiacritics(input)).toBe('елка и еще немного слов')
    })

    it('Correctly replaces non-decomposable letters via fallback map', () => {
      const input: PrevodVelikostiZnakuInput = {
        text: 'Straße, łódź, øre, æther, œuvre, Þór',
        conversionType: 'no-diacritics',
      }
      expect(noDiacritics(input)).toBe('Strasse, lodz, ore, aether, oeuvre, Thor')
    })

    it('Returns text unchanged when no diacritics are present', () => {
      const input: PrevodVelikostiZnakuInput = {
        text: 'Lorem ipsum dolor sit amet',
        conversionType: 'no-diacritics',
      }
      expect(noDiacritics(input)).toBe('Lorem ipsum dolor sit amet')
    })

    it('Returns empty string unchanged', () => {
      const input: PrevodVelikostiZnakuInput = {
        text: '',
        conversionType: 'no-diacritics',
      }
      expect(noDiacritics(input)).toBe('')
    })
  })
})
