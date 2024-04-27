import express from 'express'
import { add, check, list } from './todo.controller'
import { CreateTodoDTO } from './todo.dto'
import { validate } from '../../utils/validation-middleware'

const router = express.Router()

router.get('/', list)
router.post('/', validate(CreateTodoDTO), add)
router.patch('/:id/check', check)
router.patch('/:id/uncheck', check)

export default router
