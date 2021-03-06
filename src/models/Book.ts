import mongoose, { Document } from 'mongoose'

import { AuthorDocument } from './Author'

export type BookDocument = Document & {
  name: string
  isbn: string
  publisher: string
  description: string
  status: string
  publishedYear: number
  category: string[]
  author: AuthorDocument[]
}

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  isbn: {
    type: String,
    required: true,
    index: true,
  },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
  category: {
    type: [String],
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    index: true,
  },
  publisher: {
    type: String,
    required: true,
    index: true,
  },
  description: String,
  publishedYear: Number,
})

/* bookSchema.post('save', async (doc) => {
  return await doc.populate('author').execPopulate()
}) */

export default mongoose.model<BookDocument>('Book', bookSchema)
