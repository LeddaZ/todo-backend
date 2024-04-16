import { NextFunction, Request, Response } from 'express'
import todoService from './todo.service'

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await todoService.list()
    res.json(items)
  } catch (err) {
    next(err)
  }
}
