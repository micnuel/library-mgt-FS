import express from 'express'
import { checkAuth } from '../middlewares/checkAuth'
import {
  createAuthor,
  findById,
  deleteAuthor,
  findAll,
  updateAuthor,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:authorId', findById)
router.put('/:authorId', updateAuthor)
router.delete('/:authorId', deleteAuthor)
router.post('/', checkAuth, createAuthor)
//router.post('/', createAuthor)

export default router
