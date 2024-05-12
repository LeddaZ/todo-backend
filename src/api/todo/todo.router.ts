import express from 'express'
import { add, assign, check, list, uncheck } from './todo.controller'
import { CreateTodoDTO } from './todo.dto'
import { validate } from '../../utils/validation-middleware'
import { isAuthenticated } from '../../utils/auth/authenticated-middleware'

const router = express.Router()

router.use(isAuthenticated)
router.get('/', list)
router.post('/', validate(CreateTodoDTO), add)
router.patch('/:id/check', check)
router.patch('/:id/uncheck', uncheck)
router.patch('/:id/assign', assign)

export default router
