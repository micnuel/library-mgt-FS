import mongoose, { Document, mongo } from 'mongoose'

import { BookDocument } from '../models/Book'
import { UserDocument } from '../models/User'

export type BorrowDocument = Document & {
  borrowerId: UserDocument[];
  bookId: BookDocument[];
  status: string;
  borrowDate: Date;
  returnDate: Date;
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
  status: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
})

export default mongoose.model<BorrowDocument>('BorrowReturn', borrowSchema)
