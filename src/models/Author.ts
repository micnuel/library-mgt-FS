import mongoose, { Document, mongo } from 'mongoose'

import { BookDocument } from './Book'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  books: BookDocument[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
})
/* authorSchema.post('save', async (doc) => {
  return await doc.populate('books').execPopulate()
}) */
export default mongoose.model<AuthorDocument>('Author', authorSchema)
