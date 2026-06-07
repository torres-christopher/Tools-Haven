import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '../../../../app.js'

const path = '/cs/health/bmi-kalkulacka'

describe(path, () => {
  // GET request
  it('GET returns 200', async () => {
    await request(app).get(path).expect(200)
  })

  // Valid POST
  it('POST with valid weight/height returns 200 and renders result', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ weight: 75, height: 175 }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('Optimální váha') // Check that the result section appears
      })
  })

  // Invalid data
  it('POST with invalid weight/height returns 400 and renders error message', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({ weight: 301, height: 301 }) // req.body.text
      .expect(400)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain('Zadejte svou váhu.') // Check that the result section appears
      })
  })

  // Empty object
  it('POST with empty body returns 200, but does not render result', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({}) // req.body.text
      .expect(400)
  })
})
