import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../../../../app.js'

const path = '/cs/local/inflacni-kalkulacka'

describe(path, () => {
  // GET request
  it('Returns 200 on GET request', async () => {
    await request(app).get(path).expect(200)
  })

  // POST requests
  // Real inflation form
  // Valid monthly real inflation
  it('Returns 200 on valid real inflation POST with specific months', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '10000',
        startYear: '2004',
        startMonth: '3',
        endYear: '2024',
        endMonth: '10',
      })
      .expect(200)
  })

  // Valid yearly average real inflation
  it('Returns 200 on valid real inflation POST with yearly averages', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '10000',
        startYear: '2004',
        startMonth: 'average',
        endYear: '2024',
        endMonth: 'average',
      })
      .expect(200)
  })

  // Mixed monthly and average (cannot combine it)
  it('Returns 400 on real inflation POST with mixed monthly and average', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '10000',
        startYear: '2004',
        startMonth: '3',
        endYear: '2024',
        endMonth: 'average',
      })
      .expect(400)
  })

  // End date before start date
  it('Returns 400 on real inflation POST when end date is before start date', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '10000',
        startYear: '2024',
        startMonth: '10',
        endYear: '2004',
        endMonth: '3',
      })
      .expect(400)
  })

  // Year out of range
  it('Returns 400 on real inflation POST with year outside available data', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '10000',
        startYear: '1990',
        startMonth: '1',
        endYear: '2024',
        endMonth: '10',
      })
      .expect(400)
  })

  // Negative value
  it('Returns 400 on real inflation POST with negative value', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '-100',
        startYear: '2004',
        startMonth: '3',
        endYear: '2024',
        endMonth: '10',
      })
      .expect(400)
  })

  // Empty fields
  it('Returns 400 on real inflation POST with empty fields', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'real_inflation',
        value: '',
        startYear: '',
        startMonth: '',
        endYear: '',
        endMonth: '',
      })
      .expect(400)
  })

  // Empty object
  it('Returns 400 on real inflation POST with empty object', async () => {
    await request(app).post(path).type('form').send({ form_id: 'real_inflation' }).expect(400)
  })

  // Custom inflation form
  // Valid custom forward inflation
  it('Returns 200 on valid custom inflation POST forward', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'custom_inflation',
        value: '10000',
        inflationRate: '3',
        years: '10',
        type: 'forward',
      })
      .expect(200)
  })

  // Valid custom backward inflation
  it('Returns 200 on valid custom inflation POST backward', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'custom_inflation',
        value: '10000',
        inflationRate: '3',
        years: '10',
        type: 'backward',
      })
      .expect(200)
  })

  // Invalid type value
  it('Returns 400 on custom inflation POST with invalid type', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'custom_inflation',
        value: '10000',
        inflationRate: '3',
        years: '10',
        type: 'invalid',
      })
      .expect(400)
  })

  // Negative inflation rate
  it('Returns 400 on custom inflation POST with negative inflation rate', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'custom_inflation',
        value: '10000',
        inflationRate: '-3',
        years: '10',
        type: 'forward',
      })
      .expect(400)
  })

  // Empty fields
  it('Returns 400 on custom inflation POST with empty fields', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'custom_inflation',
        value: '',
        inflationRate: '',
        years: '',
        type: '',
      })
      .expect(400)
  })

  // Empty object
  it('Returns 400 on custom inflation POST with empty object', async () => {
    await request(app).post(path).type('form').send({ form_id: 'custom_inflation' }).expect(400)
  })

  // Invalid form
  // Unknown form_id
  it('Returns 400 on POST with unknown form_id', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'unknown_form',
        value: '10000',
      })
      .expect(400)
  })

  // No form_id at all
  it('Returns 400 on POST with no form_id', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        value: '10000',
      })
      .expect(400)
  })
})
