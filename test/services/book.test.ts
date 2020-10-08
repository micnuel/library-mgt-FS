import Book from '../../src/models/Book'
import BookService from '../../src/services/book'
import * as dbHelper from '../db-helper'

const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook() {
  const book = new Book({
    name: 'Intro to WAP',
    isbn: '12345',
    description: 'Management',
    publisher: 'One town',
    category: ['Finance'], // find out what's coremongooseArray
    publishedYear: 2000,
    status: 'available',
  })
  return await BookService.create(book)
}

describe('book service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const book = await createBook()
    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('name', 'Intro to WAP')
    expect(book).toHaveProperty('publishedYear', 2000)
    expect(book).toHaveProperty('publisher', 'One town')
    expect(book).toHaveProperty('status', 'available')
  })
  it('should find all books', async () => {
    const book = await createBook()
    const books = await BookService.findAll()
    expect(books.length).toBe(1)
  })
  it('should get an author with id', async () => {
    const book = await createBook()
    const found = await BookService.findById(book._id)
    expect(found.publishedYear).toEqual(book.publishedYear)
    expect(found.name).toEqual(book.name)
    expect(found.publisher).toEqual(book.publisher)
    expect(found.isbn).toEqual(book.isbn)
    expect(found._id).toEqual(book._id)
  })
  it('should not get a non-existing book', async () => {
    expect.assertions(1)
    return BookService.findById(nonExistingBookId).catch((e) => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })

  it('should update an existing book', async () => {
    const book = await createBook()
    const update = {
      name: 'Intro of WAP',
      publisher: 'two town',
      status: 'borrowed',
      isbn: '23456',
      publishedYear: 2020,
    }
    const updated = await BookService.update(book._id, update)
    expect(updated).toHaveProperty('_id', book._id)
    expect(updated).toHaveProperty('name', 'Intro of WAP')
    expect(updated).toHaveProperty('status', 'borrowed')
    expect(updated).toHaveProperty('publisher', 'two town')
    expect(updated).toHaveProperty('isbn', '23456')
    expect(updated).toHaveProperty('publishedYear', 2020)
  })
  it('should not update a non-existing book', async () => {
    expect.assertions(1)
    const update = {
      name: 'Intro to WAP',
      isbn: '12345',
      description: 'Management',
      publisher: 'One town',
    }
    return BookService.update(nonExistingBookId, update).catch((e) => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })
  it('should delete an existing book', async () => {
    expect.assertions(1)
    const book = await createBook()
    await BookService.deleteBook(book._id)
    return BookService.findById(book._id).catch((e) => {
      expect(e.message).toBe(`Book ${book._id} not found`)
    })
  })
})
