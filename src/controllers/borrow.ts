import { Request, Response, NextFunction } from 'express'
import BorrowReturn from '../models/Borrow'
import BorrowService from '../services/borrow'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { borrowerId, bookId, status, borrowDate, returnDate } = req.body
    const borrow = new BorrowReturn({
      borrowerId,
      bookId,
      status,
      borrowDate,
      returnDate,
    })
    await BorrowService.create(borrow)
    res.json(borrow)
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
    res.json(await BorrowService.findAll())
  } catch (error) {
    next(new NotFoundError('Author not found', error))
  }
}

export const updateBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const borrowId = req.params.borrowId
    const updateBorrow = await BorrowService.update(borrowId, update)
    res.json(updateBorrow)
  } catch (error) {
    next(new NotFoundError('Borrow not found', error))
  }
}

export const deleteBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BorrowService.deleteBorrow(req.params.borrowerId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('Borrow/Return not found', error))
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BorrowService.findById(req.params.borrowId))
  } catch (error) {
    next(new NotFoundError('Borrow not found', error))
  }
}
