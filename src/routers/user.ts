import express from 'express'

import {
  createUser,
  findById,
  deleteUser,
  findAll,
  updateUser,
  login,
} from '../controllers/user'
import { forgotPassword, resetPassword } from '../middlewares/checkAuth'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:userId', findById)
router.put('/resetpassword', resetPassword)
router.put('/forgotpassword', forgotPassword)

router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/login', login)
router.post('/', createUser)

export default router
