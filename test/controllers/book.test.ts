import request from 'supertest'

import { BookDocument } from '../../src/models/Book'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook(override?: Partial<BookDocument>) {
  let book = {
    name: 'Intro to Biology',
    isbn: '1234',
    category: ['Science'],
    publisher: 'Oreail',
    status: 'available',
    publishedYear: 2020,
  }

  if (override) {
    book = { ...book, ...override }
  }

  return await request(app).post('/api/v1/books').send(book)
}
describe('book controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })
  it('should create a book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Intro to Biology')
    expect(res.body.isbn).toBe('1234')
    expect(res.body.status).toBe('available')
  })
  it('should get back all books', async () => {
    const create1 = await createBook({
      name: 'Intro to Maths',
      publishedYear: 2000,
    })
    const create2 = await createBook({
      name: 'Intro to Physics',
      publishedYear: 1990,
    })

    const res3 = await request(app).get(`/api/v1/books`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(create1.body._id)
    expect(res3.body[1]._id).toEqual(create2.body._id)
  })
  it('should not create a book with wrong data', async () => {
    const res = await request(app).post('/api/v1/books').send({
      name: 'Intro to Maths',
      status: 'available',
    })
    expect(res.status).toBe(500) // this is wrong!!!!!!!
  })
  it('should get back an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    res = await request(app).get(`/api/v1/books/${bookId}`)

    expect(res.body._id).toEqual(bookId)
  })
  it('should not get back a non-existing book', async () => {
    const res = await request(app).get(`/api/v1/books/${nonExistingBookId}`)
    expect(res.status).toBe(404)
  })
  it('should update an existing author', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    const update = {
      name: 'Marketing',
      status: 'borrowed',
    }

    res = await request(app).put(`/api/v1/books/${bookId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Marketing')
    expect(res.body.status).toEqual('borrowed')
  })
  it('should delete an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)
    const bookId = res.body._id

    res = await request(app).delete(`/api/v1/books/${bookId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/users/${bookId}`)
    expect(res.status).toBe(404)
  })
})
