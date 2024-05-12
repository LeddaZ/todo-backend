import { Router } from 'express'
import todoRouter from './todo/todo.router'
import userRouter from './user/user.router'
import authRouter from './auth/auth.router'

const router = Router()

router.use('/todos', todoRouter)
router.use('/users', userRouter)
router.use(authRouter)

export default router
