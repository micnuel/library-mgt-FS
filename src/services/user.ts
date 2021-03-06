import bcrypt from 'bcrypt'

import User, { UserDocument } from '../models/User'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

function findAll(): Promise<UserDocument[]> {
  return User.find().sort({ firstName: 1 }).exec()
}

function findById(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      if (update.firstName) {
        user.firstName = update.firstName
      }
      if (update.lastName) {
        user.lastName = update.lastName
      }
      if (update.email) {
        user.email = update.email
      }
      if (update.role) {
        user.role = update.role
      }
      if (update.password) {
        user.password = update.password
      }
      if (update.username) {
        user.username = update.username
      }

      return user.save()
    })
}
function login(email: string, password: string): Promise<UserDocument> {
  return User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${email} not found`)
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) throw new Error(`User ${email} not found`)
        console.log(result)
        return result
      })
      return user
    }) //how to get token?
}
export default {
  create,
  findAll,
  update,
  deleteUser,
  findById,
  login,
}
