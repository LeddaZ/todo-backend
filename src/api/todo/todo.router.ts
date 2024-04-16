import express from 'express'
import { list } from './todo.controller'

const router = express.Router()

router.get('/', list)

export default router
