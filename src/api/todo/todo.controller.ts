import { NextFunction, Request, Response } from 'express'
import todoService from './todo.service'
import { Todo } from './todo.entity'
import { TypedRequest } from '../../utils/typed-request.interface'
import { CreateTodoDTO } from './todo.dto'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationError } from '../../errors/validation'

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await todoService.list()
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const data = plainToClass(CreateTodoDTO, req.body)
    const errors = await validate(data)
    if (errors.length) {
      next(new ValidationError(errors))
      return
    }
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

export const check = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const updated = await todoService.check(id, { completed: true })
  res.json(updated)
}
