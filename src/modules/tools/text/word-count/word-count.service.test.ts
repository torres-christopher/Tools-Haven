import { describe, it, expect } from 'vitest'
import { calculatePocetZnaku } from './word-count.service.js'

describe('calculatePocetZnaku', () => {
  // Lorem ipsum with three sentences
  it('Correctly calculates regular paragraph with no break lines', () => {
    const input =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(334)
    expect(result.textLengthNoSpace).toBe(283)
    expect(result.wordCount).toBe(52)
    expect(result.sentenceCount).toBe(3)
    expect(result.nsCount).toBeCloseTo(0.19, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // Empty string
  it('Handles an empty string', () => {
    const input = ''
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(0)
    expect(result.textLengthNoSpace).toBe(0)
    expect(result.wordCount).toBe(0)
    expect(result.sentenceCount).toBe(0)
    expect(result.nsCount).toBeCloseTo(0, 2)
    expect(result.lineCount).toBe(0)
    expect(result.readingTime).toBe(0)
  })

  // String with only spaces
  it('Handles string with only whitespace', () => {
    const input = '  '
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(2)
    expect(result.textLengthNoSpace).toBe(0)
    expect(result.wordCount).toBe(0)
    expect(result.sentenceCount).toBe(0)
    expect(result.nsCount).toBeCloseTo(0.001, 2)
    expect(result.lineCount).toBe(0)
    expect(result.readingTime).toBe(0)
  })

  // String with only one word
  it('Handles string with only one word', () => {
    const input = 'Test'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(4)
    expect(result.textLengthNoSpace).toBe(4)
    expect(result.wordCount).toBe(1)
    expect(result.sentenceCount).toBe(1)
    expect(result.nsCount).toBeCloseTo(0, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // String with only sentence-ending symbols
  it('Handles a string with sentence-ending symbols only', () => {
    const input = '.!?'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(3)
    expect(result.textLengthNoSpace).toBe(3)
    expect(result.wordCount).toBe(0)
    expect(result.sentenceCount).toBe(0)
    expect(result.nsCount).toBeCloseTo(0, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(0)
  })

  // String with only sentence-ending symbols
  it('Handles symbols inside the sentence', () => {
    const input = 'Dr. Smith went home.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(20)
    expect(result.textLengthNoSpace).toBe(17)
    expect(result.wordCount).toBe(4)
    expect(result.sentenceCount).toBe(1)
    expect(result.nsCount).toBeCloseTo(0.01, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // String with breaklines
  it('Handles string with break lines', () => {
    const input =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(334)
    expect(result.textLengthNoSpace).toBe(283)
    expect(result.wordCount).toBe(52)
    expect(result.sentenceCount).toBe(3)
    expect(result.nsCount).toBeCloseTo(0.185, 2)
    expect(result.lineCount).toBe(3)
    expect(result.readingTime).toBe(1)
  })

  // Exactly 1800 characters
  it('Calculates NS correctly', () => {
    const input =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet ia.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(1800)
    expect(result.textLengthNoSpace).toBe(1535)
    expect(result.wordCount).toBe(266)
    expect(result.sentenceCount).toBe(39)
    expect(result.nsCount).toBeCloseTo(1, 0)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(2)
  })

  // 200 words
  it('Math ceiling on reading time works as expected on 200 words', () => {
    const input =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(1368)
    expect(result.textLengthNoSpace).toBe(1169)
    expect(result.wordCount).toBe(200)
    expect(result.sentenceCount).toBe(32)
    expect(result.nsCount).toBeCloseTo(0.76, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // 201 words
  it('Math ceiling on reading time returns 2 on 201 words', () => {
    const input =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc nunc.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(1373)
    expect(result.textLengthNoSpace).toBe(1173)
    expect(result.wordCount).toBe(201)
    expect(result.sentenceCount).toBe(32)
    expect(result.nsCount).toBeCloseTo(0.76, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(2)
  })

  // Windows line endings
  it('Handles Windows line endings (CRLF)', () => {
    const input = 'Line one\r\nLine two\r\nLine three'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(30)
    expect(result.textLengthNoSpace).toBe(23)
    expect(result.wordCount).toBe(6)
    expect(result.sentenceCount).toBe(1)
    expect(result.nsCount).toBeCloseTo(0.017, 2)
    expect(result.lineCount).toBe(3)
    expect(result.readingTime).toBe(1)
  })

  // Multiple spaces between words
  it('Handles multiple spaces between words', () => {
    const input = 'hello   world'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(13)
    expect(result.textLengthNoSpace).toBe(10)
    expect(result.wordCount).toBe(2)
    expect(result.sentenceCount).toBe(1)
    expect(result.nsCount).toBeCloseTo(0.007, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // Czech text with diacritics
  it('Handles Czech text with diacritics', () => {
    const input = 'Dnes je hezký den. Zítra bude pršet.'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(36)
    expect(result.textLengthNoSpace).toBe(30)
    expect(result.wordCount).toBe(7)
    expect(result.sentenceCount).toBe(2)
    expect(result.nsCount).toBeCloseTo(0.02, 2)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // Arabic text
  it('Handles Arabic text', () => {
    const input = 'مرحبا بالعالم'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(13)
    expect(result.textLengthNoSpace).toBe(12)
    expect(result.wordCount).toBe(2)
    expect(result.sentenceCount).toBe(1)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // Cyrillic text
  it('Handles Cyrillic text', () => {
    const input = 'Привет мир'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(10)
    expect(result.textLengthNoSpace).toBe(9)
    expect(result.wordCount).toBe(2)
    expect(result.sentenceCount).toBe(1)
    expect(result.lineCount).toBe(1)
    expect(result.readingTime).toBe(1)
  })

  // Chinese text
  it('Handles Chinese text', () => {
    const input = '你好世界'
    const result = calculatePocetZnaku(input)
    expect(result.textLengthRaw).toBe(4)
    expect(result.textLengthNoSpace).toBe(4)
    expect(result.lineCount).toBe(1)
  })
})
