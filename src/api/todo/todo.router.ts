import express from 'express'
import { add, check, list, uncheck } from './todo.controller'

const router = express.Router()

router.get('/', list)
router.post('/', add)
router.patch('/:id/check', check)
router.patch('/:id/uncheck', uncheck)

export default router
