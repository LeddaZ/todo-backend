import { NextFunction, Request, Response } from 'express'
import todoService from './todo.service'

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await todoService.list()
    res.json(results)
  } catch (err) {
    next(err)
  }
}
