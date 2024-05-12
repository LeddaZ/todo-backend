import { Router } from 'express'
import { me, users } from './user.controller'
import { isAuthenticated } from '../../utils/auth/authenticated-middleware'

const router = Router()

router.get('/me', isAuthenticated, me)
router.get('/', isAuthenticated, users)

export default router
