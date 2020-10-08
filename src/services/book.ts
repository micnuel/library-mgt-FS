import Book, { BookDocument } from '../models/Book'

function create(book: BookDocument): Promise<BookDocument> {
  return book.save()
}

function findAll(): Promise<BookDocument[]> {
  return Book.find().exec()
}

function findById(bookId: string): Promise<BookDocument> {
  return (
    Book.findById(bookId)
      //.select('name -_id')// filter by name
      //.select('category -_id') //category
      .exec()
      .then((book) => {
        if (!book) {
          throw new Error(`Book ${bookId} not found`)
        }
        console.log(book)
        return book
      })
  )
}

function deleteBook(bookId: string): Promise<BookDocument | null> {
  return Book.findByIdAndDelete(bookId).exec()
}

function update(
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument> {
  return Book.findById(bookId)
    .exec()
    .then((book) => {
      if (!book) {
        throw new Error(`Book ${bookId} not found`)
      }
      if (update.name) {
        book.name = update.name
      }
      if (update.isbn) {
        book.isbn = update.isbn
      }
      if (update.author) {
        book.author = update.author
      }
      if (update.description) {
        book.description = update.description
      }
      if (update.publisher) {
        book.publisher = update.publisher
      }
      if (update.publishedYear) {
        book.publishedYear = update.publishedYear
      }
      if (update.status) {
        book.status = update.status
      }
      if (update.category) {
        book.category = update.category
      }

      return book.save()
    })
}
export default {
  create,
  findAll,
  update,
  deleteBook,
  findById,
}
