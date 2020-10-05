import Author, { AuthorDocument } from '../models/author'

function create(author: AuthorDocument): Promise<AuthorDocument> {
  return author.save()
}

function findAll(): Promise<AuthorDocument[]> {
  return (
    Author.find()
      //.populate('books') // gets all the books
      .sort({ firstName: 1 })
      .exec()
  )
}

function findById(authorId: string): Promise<AuthorDocument> {
  return (
    Author.findById(authorId) // try out aggregation on the model
      //.populate('books', 'name -_id')// get book name only
      .exec()
      .then((author) => {
        if (!author) {
          throw new Error(`Author ${authorId} not found`)
        }
        return author
      })
  )
}

function deleteAuthor(authorId: string): Promise<AuthorDocument | null> {
  return Author.findByIdAndDelete(authorId).exec()
}

function update(
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument> {
  return Author.findById(authorId)
    .exec()
    .then((author) => {
      if (!author) {
        throw new Error(`Author ${authorId} not found`)
      }
      if (update.firstName) {
        author.firstName = update.firstName
      }
      if (update.lastName) {
        author.lastName = update.lastName
      }
      if (update.books) {
        author.books = update.books
      }

      return author.save()
    })
}
export default {
  create,
  findAll,
  update,
  deleteAuthor,
  findById,
}
