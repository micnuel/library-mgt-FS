import { Request, Response, NextFunction } from 'express'
import Author from '../models/author'
import AuthorService from '../services/author'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, books } = req.body
    const author = new Author({
      firstName,
      lastName,
      books,
    })
    await AuthorService.create(author)
    res.json(author)
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
    res.json(await AuthorService.findAll())
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updateAuthor = await AuthorService.update(authorId, update)
    res.json(updateAuthor)
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findById(req.params.authorId))
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}
