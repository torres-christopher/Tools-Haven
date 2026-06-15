import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '../../../../app.js'

// Path
const path = '/cs/text/prevod-velikosti-znaku'

describe(path, () => {
  // GET request
  it('GET returns 200', async () => {
    await request(app).get(path).expect(200)
  })

  it('POST with text returns sentence case', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: 'lOrEm iPsUm dOlOr sIt aMeT. cOnSeCtEtUr aDiPiScInG ElIt! SeD Do eIuSmOd tEmPoR InCiDiDuNt uT LaBoRe eT DoLoRe mAgNa aLiQuA? tEnIm aD MiNiM VeNiAm, QuIs nOsTrUd eXeRcItAtIoN UlLaMcO LaBoRiS NiSi uT AlIqUiP Ex eA CoMmOdO CoNsEqUaT.',
        conversionType: 'sentence-case',
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(
          'Lorem ipsum dolor sit amet. Consectetur adipiscing elit! Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? Tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        ) // Check that the result section appears
      })
  })

  it('POST with text returns lower case', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ text: 'Lorem ipsum dolor', conversionType: 'lower-case' }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('lorem ipsum dolor') // Check that the result section appears
      })
  })

  it('POST with text returns upper case', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ text: 'Lorem ipsum dolor', conversionType: 'upper-case' }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('LOREM IPSUM DOLOR') // Check that the result section appears
      })
  })

  it('POST with text returns capitalized case', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ text: 'Lorem ipsum dolor', conversionType: 'capitalized-case' }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('Lorem Ipsum Dolor') // Check that the result section appears
      })
  })

  it('POST with text returns reverse text', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ text: 'Lorem ipsum dolor', conversionType: 'reverse' }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('rolod muspi meroL') // Check that the result section appears
      })
  })

  it('POST with text over 300000 chars returns 400 and renders error', async () => {
    const longText = 'a'.repeat(300001) // 300.001 characters
    await request(app)
      .post(path)
      .type('form')
      .send({ text: longText, conversionType: 'reverse' })
      .expect(400) // Error set in controller
      .expect((res) => {
        expect(res.text).toContain('příliš dlouhý') // Error message defiend in controller
      })
  })

  it('POST with empty text handles gracefully', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({ text: '', conversionType: 'reverse' })
      .expect(200)
  })

  it('POST with empty body handles gracefully', async () => {
    await request(app).post(path).type('form').send({}).expect(400)
  })

  it('POST with invalid conversion type handles gracefully', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({ text: '', conversionType: 'invalid' })
      .expect(400)
  })

  it('POST with text returns no-diacritics conversion', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({ text: 'Příliš žluťoučký kůň', conversionType: 'no-diacritics' })
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Prilis zlutoucky kun')
      })
  })
})
