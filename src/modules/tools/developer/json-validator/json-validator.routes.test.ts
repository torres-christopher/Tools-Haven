import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { app } from '../../../../app.js'

// Path
const path = '/cs/developer/json-validator'

// All POST requests use .type('form') to simulate HTML form submission.
// Invalid JSON returns 200 with validJson: false — only schema failures return 400.
describe(path, () => {
  it('GET returns 200', async () => {
    await request(app).get(path).expect(200)
  })

  // Validation
  it('POST with valid JSON returns correctly', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: `{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    },
    "email": [
      "jd@example.com",
      "jd@example.org"
    ],
    "dateOfBirth": "1980-01-02T00:00:00.000Z",
    "registered": true,
    "emergencyContacts": [
      {
        "name": "Jane Doe",
        "phone": "888-555-1212",
        "relationship": "spouse"
      },
      {
        "name": "Justin Doe",
        "phone": "877-123-1212",
        "relationship": "parent"
      }
    ]
  }
}`,
        actionType: 'validate',
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(`{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    },
    "email": [
      "jd@example.com",
      "jd@example.org"
    ],
    "dateOfBirth": "1980-01-02T00:00:00.000Z",
    "registered": true,
    "emergencyContacts": [
      {
        "name": "Jane Doe",
        "phone": "888-555-1212",
        "relationship": "spouse"
      },
      {
        "name": "Justin Doe",
        "phone": "877-123-1212",
        "relationship": "parent"
      }
    ]
  }
}`)
      })
  })

  // Format
  it('POST with JSON and format button returns formatted string', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: `{"product":"Live JSON generator","version":3.1,"releaseDate":"2014-06-25T00:00:00.000Z","demo":true,"person":{"id":12345,"name":"John Doe","phones":{"home":"800-123-4567","mobile":"877-123-1234"}}}`,
        actionType: 'format',
        space: 2,
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(
          `{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    }
  }
}`,
        )
      })
  })

  // Minify
  it('POST with JSON and minify button returns minified string', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: `{
  "product": "Live JSON generator",
  "version": 3.1,
  "releaseDate": "2014-06-25T00:00:00.000Z",
  "demo": true,
  "person": {
    "id": 12345,
    "name": "John Doe",
    "phones": {
      "home": "800-123-4567",
      "mobile": "877-123-1234"
    }
  }
}`,
        actionType: 'minify',
        space: 2,
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(
          `{"product":"Live JSON generator","version":3.1,"releaseDate":"2014-06-25T00:00:00.000Z","demo":true,"person":{"id":12345,"name":"John Doe","phones":{"home":"800-123-4567","mobile":"877-123-1234"}}}`,
        )
      })
  })

  // Empty value
  it('POST with empty string handles gracefully', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: ``,
        actionType: 'validate',
        space: 2,
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(`Unexpected end of JSON input`)
      })
  })

  // Non-JSON string
  it('POST with JSON as null handles gracefully', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: `null`,
        actionType: 'validate',
        space: 2,
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).not.toContain(`Nevalidní JSON`)
      })
  })

  // Empty value
  it('POST with invalid JSON returns 200', async () => {
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: `{"product: "Live JSON generator" }`,
        actionType: 'validate',
      }) // req.body.text
      .expect(200)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(`in JSON at position`)
      })
  })

  // Too long value
  it('POST with too JSON returns 400', async () => {
    const longText = `{"product: "Live JSON generator"}`.repeat(10000) // 300.001 characters
    await request(app)
      .post(path)
      .type('form') // Send as form
      .send({
        text: longText,
        actionType: 'validate',
      }) // req.body.text
      .expect(400)
      .expect((res) => {
        // res.text is the HTML
        expect(res.text).toContain(`příliš dlouhý`)
      })
  })
})
