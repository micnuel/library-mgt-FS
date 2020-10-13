import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const sgMail = require('@sendgrid/mail')
import _ from 'lodash'

import { JWT_SECRET } from '../util/secrets'
import { ForbiddenError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers['authorization'])
    const token = req.headers['authorization'] || ''
    const decoded = await jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return next(new ForbiddenError())
  }
}

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    await User.findOne({ email }, (err: any, user: any) => {
      if (err || !user) throw new Error('User with the email does not exist')
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: '10h' }
      )
      const msg = {
        to: email, // Change to your recipient
        from: 'emekaece@gmail.com', // Change to your verified sender
        subject: 'Please click on link to reset password',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h3>Please click on the link to activate account</h3>
                      <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`,
      }
      user.updateOne({ resetLink: token }, (err: any, success: any) => {
        if (err) throw new Error('Reset password error')
        sgMail
          .send(msg)
          .then(() => {
            res.json('Email have been sent to activate account')
          })
          .catch((error: any) => {
            throw new Error('Email sent failed ')
          })
      })
    })
  } catch (error) {
    throw new Error('Email sent failed ')
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { resetLink, newPass } = req.body
    console.log(newPass)
    if (resetLink) {
      await jwt.verify(resetLink, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            error: 'Incorrect token or token has expired',
          })
        }

        User.findOne({ resetLink }, (err, user: UserDocument) => {
          console.log(user)
          if (err || !user) {
            return res.status(404).json({ err: 'user not found' })
          }
          const obj = {
            password: newPass,
            resetLink: '',
          }

          user = _.extend(user, obj)
          console.log(user)
          user.save((err: any, result: any) => {
            if (err) {
              return res.status(400).json({ err: 'reset password error' })
            } else {
              return res
                .status(200)
                .json({ message: 'password updated', result })
            }
          })
        })
      })
    } else {
      throw new Error('Authentication error occurred ')
    }
  } catch (error) {
    throw new Error('Password  reset failed ')
  }
}
