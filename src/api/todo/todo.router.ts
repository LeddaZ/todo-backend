import express from 'express'
import { add, check, list } from './todo.controller'

const router = express.Router()

router.get('/', list)
router.post('/', add)
router.patch('/:id/check', check)
router.patch('/:id/uncheck', check)

export default router
