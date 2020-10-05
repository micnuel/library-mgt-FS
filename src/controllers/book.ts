import { Request, Response, NextFunction } from 'express'
import Book from '../models/Book'
import BookService from '../services/book'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      isbn,
      publisher,
      status,
      description,
      publishedYear,
      category,
      author,
    } = req.body
    const book = new Book({
      name,
      isbn,
      publisher,
      status,
      description,
      publishedYear,
      category,
      author,
    })
    await BookService.create(book)
    res.json(book)
  } catch (error) {
    if (error.name === 'ValidatorError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findAll())
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updateBook = await BookService.update(bookId, update)
    res.json(updateBook)
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    next(new NotFoundError('Book not found', error))
  }
}
