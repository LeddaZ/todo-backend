import { NextFunction, Request, Response } from 'express'
import todoService from './todo.service'
import { Todo } from './todo.entity'
import { TypedRequest } from '../../utils/typed-request.interface'
import { CreateTodoDTO } from './todo.dto'
import { UserModel } from '../user/user.model'

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const showCompleted = req.query.showCompleted === 'true'
    const user = req.user!
    const results = await todoService.list(showCompleted, user.id!)
    res.json(results)
  } catch (err) {
    next(err)
  }
}

export const add = async (req: TypedRequest<CreateTodoDTO>, res: Response, next: NextFunction) => {
  try {
    const { title, dueDate, assignedTo } = req.body
    const user = req.user!

    const createdUser = await UserModel.findById(user.id)
    const assignedUser = await UserModel.findById(assignedTo)
    const newItem: Partial<Omit<Todo, 'id' | 'expired'>> = {
      title: title,
      dueDate: dueDate,
      completed: false
    }

    const saved = await todoService.add(newItem, createdUser!._id, assignedUser?._id)
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
}

export const check = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!
    const { id } = req.params
    const updated = await todoService.check(id, true, user.id!)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const uncheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!
    const { id } = req.params
    const updated = await todoService.check(id, false, user.id!)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const assign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!
    const { userId } = req.body
    const { id } = req.params
    const assignedUser = await UserModel.findById(userId)
    const updated = await todoService.assign(id, user.id!, assignedUser?._id)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}
