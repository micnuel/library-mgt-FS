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
    if (error.name === 'ValidationError') {
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

//implement pagination later

/* export const findAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt((req.query as any).pages)
      const limit = parseInt((req.query as any).limit)
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
      const result = await (await BookService.findAll()).slice(
        startIndex,
        endIndex
      )
      res.status(200).json({
        message: 'Products loaded successfully from database with pagination',
        result,
      })
    } else {
      res.json(await BookService.findAll())
    }
  } catch (error) {
    next(new NotFoundError('Books not found', error))
  }
} */

//implement filter later

/* export const filterBy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: any[] = []
    if (req.query.name) {
      await (await BookService.findAll()).filter(function (prod) {
        if (prod.name.toLowerCase() === req.query.name) response.push(prod)
      })
      return res.json(response)
    }
    if (req.query.isbn) {
      await (await BookService.findAll()).filter(function (prod) {
        console.log(prod.isbn)
        if (prod.name.toLowerCase() === req.query.isbn) response.push(prod)
      })
      return res.json(response)
    }
  } catch (error) {
    next(new NotFoundError('Products not found', error))
  }
} */
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
