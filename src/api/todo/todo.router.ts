import express from 'express'
import { add, check, list } from './todo.controller'

const router = express.Router()

router.get('/', list)
router.post('/', add)
router.patch('/:id/check', check)

export default router
