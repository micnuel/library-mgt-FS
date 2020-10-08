import Borrow from '../../src/models/Borrow'
import BorrowService from '../../src/services/borrow'
import * as dbHelper from '../db-helper'

const nonExistingBorrowId = '5e57b77b5744fa0b461c7906'

async function createBorrow() {
  const borrow = new Borrow({
    status: 'available',
    borrowDate: '2012-12-19',
    returnDate: '2012-12-30',
  })
  return await BorrowService.create(borrow)
}

describe('borrow service', () => {
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
    const borrow = await createBorrow()
    expect(borrow).toHaveProperty('_id')
    expect(borrow).toHaveProperty('status', 'available')
    // expect(borrow).toHaveProperty('borrowDate', '2012-12-19')
  })
  it('should find all borrow', async () => {
    const borrow = await createBorrow()
    const borrows = await BorrowService.findAll()
    expect(borrows.length).toBe(1)
  })
  it('should get an borrow with id', async () => {
    const borrow = await createBorrow()
    const found = await BorrowService.findById(borrow._id)
    expect(found.status).toEqual(borrow.status)
    expect(found._id).toEqual(borrow._id)
  })
  it('should not get a non-existing borrow', async () => {
    expect.assertions(1)
    return BorrowService.findById(nonExistingBorrowId).catch((e) => {
      expect(e.message).toMatch(`Borrow ${nonExistingBorrowId} not found`)
    })
  })
  it('should update an existing borrow', async () => {
    const borrow = await createBorrow()
    const update = {
      status: 'borrowed',
    }
    const updated = await BorrowService.update(borrow._id, update)
    expect(updated).toHaveProperty('_id', borrow._id)
    expect(updated).toHaveProperty('status', 'borrowed')
  })
  it('should not update a non-existing borrow', async () => {
    expect.assertions(1)
    const update = {
      status: 'available',
    }
    return BorrowService.update(nonExistingBorrowId, update).catch((e) => {
      expect(e.message).toMatch(`Borrow ${nonExistingBorrowId} not found`)
    })
  })
  it('should delete an existing Author', async () => {
    expect.assertions(1)
    const author = await createBorrow()
    await BorrowService.deleteBorrow(author._id)
    return BorrowService.findById(author._id).catch((e) => {
      expect(e.message).toBe(`Borrow ${author._id} not found`)
    })
  })
})
