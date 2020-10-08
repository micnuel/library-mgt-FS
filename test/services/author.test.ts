import Author from '../../src/models/author'
import AuthorService from '../../src/services/author'
import * as dbHelper from '../db-helper'

const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'

async function createAuthor() {
  const author = new Author({
    firstName: 'Emmanuel',
    lastName: 'Mario',
    books: ['5f74e85530269a49363ee337'], // how do you test this?
  })
  return await AuthorService.create(author)
}

describe('author service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create an author', async () => {
    const author = await createAuthor()
    expect(author).toHaveProperty('_id')
    expect(author).toHaveProperty('firstName', 'Emmanuel')
    expect(author).toHaveProperty('lastName', 'Mario')
  })
  it('should find all Author', async () => {
    const author = await createAuthor()
    const authors = await AuthorService.findAll()
    expect(authors.length).toBe(1)
  })

  it('should get an author with id', async () => {
    const author = await createAuthor()
    const found = await AuthorService.findById(author._id)
    expect(found.firstName).toEqual(author.firstName)
    expect(found.lastName).toEqual(author.lastName)
    expect(found._id).toEqual(author._id)
  })

  it('should not get a non-existing author', async () => {
    expect.assertions(1)
    return AuthorService.findById(nonExistingAuthorId).catch((e) => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })
  it('should update an existing Author', async () => {
    const author = await createAuthor()
    const update = {
      firstName: 'Micheal',
      lastName: 'June',
    }
    const updated = await AuthorService.update(author._id, update)
    expect(updated).toHaveProperty('_id', author._id)
    expect(updated).toHaveProperty('firstName', 'Micheal')
    expect(updated).toHaveProperty('lastName', 'June')
  })
  it('should not update a non-existing Author', async () => {
    expect.assertions(1)
    const update = {
      firstName: 'Emmanuel',
      lastName: 'Mario',
    }
    return AuthorService.update(nonExistingAuthorId, update).catch((e) => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })
  it('should delete an existing Author', async () => {
    expect.assertions(1)
    const author = await createAuthor()
    await AuthorService.deleteAuthor(author._id)
    return AuthorService.findById(author._id).catch((e) => {
      expect(e.message).toBe(`Author ${author._id} not found`)
    })
  })
})
