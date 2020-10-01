import express from 'express'

import {
  createBorrow,
  findById,
  deleteBorrow,
  findAll,
  updateBorrow,
} from '../controllers/borrow'

const router = express.Router()

// Every path we define here will get /api/v1/movies prefix
router.get('/', findAll)
router.get('/:borrowId', findById)
router.put('/:borrowId', updateBorrow)
router.delete('/:borrowId', deleteBorrow)
router.post('/', createBorrow)

export default router
