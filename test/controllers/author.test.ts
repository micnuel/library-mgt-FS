import request from 'supertest'
import { NextFunction } from 'express'
import { AuthorDocument } from '../../src/models/Author'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

jest.mock(
  '../../src/middlewares/checkAuth',
  () => (req: Request, res: Response, next: NextFunction) => next()
)
const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'
async function createAuthor(override?: Partial<AuthorDocument>) {
  let author = {
    firstName: 'Emma',
    lastName: 'Mac',
  }

  if (override) {
    author = { ...author, ...override }
  }

  return await request(app)
    .post('/api/v1/authors') // check why the error
    .send(author)
}
describe('author controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })
  it('should create an author', async () => {
    const res = await createAuthor()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.firstName).toBe('Emma')
    expect(res.body.lastName).toBe('Mac')
  })
  it('should not create an author with wrong data', async () => {
    const res = await request(app).post('/api/v1/authors').send({
      firstName: 'Emma',
    })
    expect(res.status).toBe(400)
  })
  it('should get back an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body._id
    res = await request(app).get(`/api/v1/authors/${authorId}`)

    expect(res.body._id).toEqual(authorId)
  })
  it('should not get back a non-existing author', async () => {
    const res = await request(app).get(`/api/v1/authors/${nonExistingAuthorId}`)
    expect(res.status).toBe(404)
  })
  it('should get back all author', async () => {
    const create1 = await createAuthor({
      firstName: 'Angrybirds 1',
    })
    const create2 = await createAuthor({
      firstName: 'Angrybirds 2',
    })

    const res3 = await request(app).get(`/api/v1/authors`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(create1.body._id)
    expect(res3.body[1]._id).toEqual(create2.body._id)
  })

  it('should update an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body._id
    const update = {
      firstName: 'Livingson',
      lastName: 'Summer',
    }

    res = await request(app).put(`/api/v1/authors/${authorId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.firstName).toEqual('Livingson')
    expect(res.body.lastName).toEqual('Summer')
  })
  it('should delete an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)
    const authorId = res.body._id

    res = await request(app).delete(`/api/v1/authors/${authorId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/users/${authorId}`)
    expect(res.status).toBe(404)
  })
})
