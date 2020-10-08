import request from 'supertest'

import { BorrowDocument } from '../../src/models/Borrow'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingBorrowId = '5e57b77b5744fa0b461c7906'

async function createBorrow(override?: Partial<BorrowDocument>) {
  let borrow = {
    status: 'available',
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
  it('should create a borrow', async () => {
    const res = await createBorrow()
    expect(res.status).toBe(200) // this is not correct!!!
    expect(res.body).toHaveProperty('_id')
    expect(res.body.status).toBe('available')
  })
})
