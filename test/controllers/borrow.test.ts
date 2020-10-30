import request from 'supertest'

import { BorrowDocument } from '../../src/models/Borrow'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingBorrowId = '5e57b77b5744fa0b461c7906'

async function createBorrow(override?: Partial<BorrowDocument>) {
  let borrow = {
    status: 'available',
    borrowDate: new Date('1987-10-26'),
  }

  if (override) {
    borrow = { ...borrow, ...override }
  }

  return await request(app).post('/api/v1/borrows').send(borrow)
}
describe('borrow controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })
  it('should create a movie', async () => {
    const res = await createBorrow()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.status).toBe('available')
  })
  it('should not create a borrow with wrong data', async () => {
    const res = await request(app).post('/api/v1/users').send({
      status: 'admin',
      publishedYear: 2019,
    })
    expect(res.status).toBe(400)
  })
  it('should get back an existing borrow', async () => {
    let res = await createBorrow()
    expect(res.status).toBe(200)

    const borrowId = res.body._id
    res = await request(app).get(`/api/v1/borrows/${borrowId}`)

    expect(res.body._id).toEqual(borrowId)
  })
  it('should not get back a non-existing borrow', async () => {
    const res = await request(app).get(`/api/v1/borrows/${nonExistingBorrowId}`)
    expect(res.status).toBe(404)
  })
  it('should get back all borrow', async () => {
    const res1 = await createBorrow({
      status: 'available',
      borrowDate: new Date('1987-10-26'),
    })
    const res2 = await createBorrow({
      status: 'available',
      borrowDate: new Date('1987-10-11'),
    })

    const res3 = await request(app).get(`/api/v1/borrows`)

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })
  it('should update an existing borrow', async () => {
    let res = await createBorrow()
    expect(res.status).toBe(200)

    const borrowId = res.body._id
    const update = {
      status: 'borrowed',
      borrowDate: new Date('1987-10-26'), // find a way to compare
    }

    res = await request(app).put(`/api/v1/borrows/${borrowId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('borrowed')
  })
  it('should delete an existing borrow', async () => {
    let res = await createBorrow()
    expect(res.status).toBe(200)
    const borrowId = res.body._id

    res = await request(app).delete(`/api/v1/borrows/${borrowId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/borrows/${borrowId}`)
    expect(res.status).toBe(404)
  })
})
