import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../../../../app.js'

const path = '/cs/datetime/kalkulacka-veku'

describe(path, () => {
  // GET
  it('Returns 200 on GET request', async () => {
    await request(app).get(path).expect(200)
  })

  // POST
  // Valid birth date
  it('Returns 200 on POST for valid birth date', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        birthDate: '2020-07-11',
      })
      .expect(200)
  })

  // Birth date in future
  it('Returns 400 on POST for birth date in future', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        birthDate: '2099-07-11',
      })
      .expect(400)
  })

  // No birth date
  it('Returns 400 on POST for invalid date', async () => {
    await request(app)
      .post(path)
      .type('form')
      .send({
        birthDate: '',
      })
      .expect(400)
  })
})
