import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../../../../app.js'

const path = '/cs/datetime/datumovy-kalkulator'

describe(path, () => {
  // GET
  it('Returns 200 on GET request', async () => {
    await request(app).get(path).expect(200)
  })

  // POST
  // Range form
  it('Returns 200 on POST for valid date range', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'range',
        startDate: '2026-01-31',
        endDate: '2026-03-01',
      })
      .expect(200)
  })

  it('Returns 200 on POST for reversed date range', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'range',
        startDate: '2026-03-01',
        endDate: '2026-01-31',
      })
      .expect(200)
  })

  it('Returns 400 on POST for invalid date range', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'range',
        startDate: 'not-a-date',
        endDate: '2026-03-01',
      })
      .expect(400)
  })

  it('Returns 400 on POST for missing end date', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'range',
        startDate: '2026-01-31',
        endDate: '',
      })
      .expect(400)
  })

  // Arithmetic form
  it('Returns 200 on POST for valid arithmetic add', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'arithmetic',
        startDate: '2026-01-31',
        type: 'add',
        days: '1',
        weeks: '1',
        months: '1',
        years: '1',
      })
      .expect(200)
  })

  it('Returns 200 on POST for valid arithmetic subtract', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'arithmetic',
        startDate: '2026-01-31',
        type: 'subtract',
        days: '1',
        weeks: '1',
        months: '1',
        years: '1',
      })
      .expect(200)
  })

  it('Returns 400 on POST for negative arithmetic values', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'arithmetic',
        startDate: '2026-01-31',
        type: 'add',
        days: '-1',
        weeks: '-1',
        months: '-1',
        years: '-1',
      })
      .expect(400)
  })

  it('Returns 400 on POST for invalid arithmetic type', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'arithmetic',
        startDate: '2026-01-31',
        type: 'multiply',
        days: '1',
        weeks: '1',
        months: '1',
        years: '1',
      })
      .expect(400)
  })

  // Week form
  it('Returns 200 on POST for valid week input', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'week',
        inputDate: '2026-01-31',
      })
      .expect(200)
  })

  it('Returns 400 on POST for invalid week input', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'week',
        inputDate: 'not-a-date',
      })
      .expect(400)
  })

  // Unknown form
  it('Returns 400 on POST for unknown form_id', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        form_id: 'unknown',
      })
      .expect(400)
  })
})
