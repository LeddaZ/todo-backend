import { NextFunction, Request, Response } from 'express'
import todoService from './todo.service'
import { Todo } from './todo.entity'

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await todoService.list()
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, dueDate } = req.body

    const newItem: Partial<Omit<Todo, 'id' | 'completed' | 'expired'>> = {
      title: title,
      dueDate: dueDate
    }

    const saved = await todoService.add(newItem)
    res.json(saved)
  } catch (err) {
    next(err)
  }
}
