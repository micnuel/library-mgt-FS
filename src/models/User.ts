import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  role: string
  password: string
  username: string
  resetLink: any
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  resetLink: {
    data: String,
    default: '',
  },
})

userSchema.pre('save', function (next) {
  const user = this as UserDocument

  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})
/* userSchema.pre('findOneAndUpdate', function () {
  this._update.password = bcrypt.hashSync(this._update.password, 10)
}) */

/* userSchema.methods.comparePassword = function (
  candidatePassword: any,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
} */

export default mongoose.model<UserDocument>('User', userSchema)
