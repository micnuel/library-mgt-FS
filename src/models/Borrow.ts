import mongoose, { Document, mongo } from 'mongoose'

import { BookDocument } from '../models/Book'
import { UserDocument } from '../models/User'

export type BorrowDocument = Document & {
  borrowerId: UserDocument[]
  bookId: BookDocument[]
  status: string
  borrowDate: Date
}

const borrowSchema = new mongoose.Schema({
  borrowerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bookId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],

  borrowDate: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<BorrowDocument>('BorrowReturn', borrowSchema)
