import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import User from '../models/User'
import UserService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ForbiddenError,
} from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      role,
      password,
    })

    await UserService.create(user)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log(error)
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
    res.json(await UserService.findAll())
  } catch (error) {
    next(new NotFoundError('Users not found', error))
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updateUser = await UserService.update(userId, update)
    res.json(updateUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body
  const user = await UserService.login(email, password)
  if (!user) {
    return next(new ForbiddenError())
  }
  try {
    const token = await jwt.sign(
      {
        email: email,
      },
      JWT_SECRET,
      {
        expiresIn: '10h',
      }
    )
    console.log(token)
    res.json({ token, user })
  } catch (error) {
    return next(new InternalServerError())
  }
}
