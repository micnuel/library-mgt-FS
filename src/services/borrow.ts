import BorrowReturn, { BorrowDocument } from '../models/Borrow'

function create(borrow: BorrowDocument): Promise<BorrowDocument> {
  return borrow.save()
}

function findAll(): Promise<BorrowDocument[]> {
  return BorrowReturn.find()
    .populate('borrowerId')
    .populate('bookId')
    .sort({ firstName: 1 })
    .exec()
}

function findById(borrowId: string): Promise<BorrowDocument> {
  return BorrowReturn.findById(borrowId)
    .exec()
    .then((borrow) => {
      if (!borrow) {
        throw new Error(`Borrow ${borrowId} not found`)
      }
      return borrow
    })
}

function deleteBorrow(borrowId: string): Promise<BorrowDocument | null> {
  return BorrowReturn.findByIdAndDelete(borrowId).exec()
}

function update(
  borrowId: string,
  update: Partial<BorrowDocument>
): Promise<BorrowDocument> {
  return BorrowReturn.findById(borrowId)
    .exec()
    .then((borrow) => {
      if (!borrow) {
        throw new Error(`Borrow ${borrowId} not found`)
      }
      if (update.borrowerId) {
        borrow.borrowerId = update.borrowerId
      }
      if (update.bookId) {
        borrow.bookId = update.bookId
      }
      if (update.borrowDate) {
        borrow.borrowDate = update.borrowDate
      }

      return borrow.save()
    })
}
export default {
  create,
  findAll,
  update,
  deleteBorrow,
  findById,
}
