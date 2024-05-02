import { NextFunction, Request, Response } from 'express'
import todoService from './todo.service'
import { Todo } from './todo.entity'
import { TypedRequest } from '../../utils/typed-request.interface'
import { CreateTodoDTO } from './todo.dto'

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const showCompleted = req.query.showCompleted === 'true'
    const results = await todoService.list(showCompleted)
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const { title, dueDate } = req.body

    const newItem: Partial<Omit<Todo, 'id' | 'completed' | 'expired'>> = {
      title: title,
      dueDate: dueDate
    }

    const saved = await todoService.add(newItem)
    res.status(201)
    res.json(saved)
  } catch (err) {
    next(err)
  }
}

export const check = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { completed } = req.body
    const updated = await todoService.check(id, completed)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}
