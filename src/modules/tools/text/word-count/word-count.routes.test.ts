import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '../../../../app.js'

// Path
const path = '/cs/text/pocet-znaku'

describe(path, () => {
  // GET request
  it('GET returns 200', async () => {
    await request(app).get(path).expect(200)
  })

  it('POST with valid text returns 200 and renders result', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ text: 'Lorem ipsum dolor' }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('Lorem ipsum dolor') // Check that the result section appears
      })
  })

  it('POST with text over 300000 chars returns 400 and renders error', async () => {
    const longText = 'a'.repeat(300001) // 300.001 characters
    await request(app)
      .post(path)
      .type('form')
      .send({ text: longText })
      .expect(400) // Error set in controller
      .expect((res) => {
        expect(res.text).toContain('příliš dlouhý') // Error message defiend in controller
      })
  })

  it('POST with empty body handles gracefully', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({}) // empty body — no text field at all
      .expect(200)
  })

  // schema default('') means null/missing text field is treated as empty string --> should return 200
  it('POST with no body handles gracefully', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({ text: null }) // Null value in text
      .expect(200)
  })
})
