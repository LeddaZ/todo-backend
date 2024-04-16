import express from 'express'
import { add, list } from './todo.controller'

const router = express.Router()

router.get('/', list)
router.post('/', add)

export default router
