import { Types } from 'mongoose'
import { CheckedError } from '../../errors/checked'
import { NotFoundError } from '../../errors/not-found'
import { PastDateError } from '../../errors/past-date'
import { UserModel } from '../user/user.model'
import { Todo } from './todo.entity'
import { TodoModel } from './todo.model'
import { UserNotFoundError } from '../../errors/user-not-found'

export class TodoService {
  async list(showCompleted: boolean, userId: string): Promise<Todo[]> {
    let results
    if (showCompleted) {
      results = await TodoModel.find({ $or: [{ createdBy: userId }, { assignedTo: userId }] })
        .sort({ dueDate: 1 })
        .populate('createdBy')
        .populate('assignedTo')
    } else {
      results = await TodoModel.find({
        completed: false,
        $or: [{ createdBy: userId }, { assignedTo: userId }]
      })
        .sort({ dueDate: 1 })
        .populate('createdBy')
        .populate('assignedTo')
    }
    return results
  }

  async add(
    todo: Partial<Omit<Todo, 'id'>>,
    createdBy: Types.ObjectId,
    assignedTo?: Types.ObjectId
  ): Promise<Todo> {
    const now = new Date().setHours(0, 0, 0, 0)
    if (Date.parse(todo.dueDate!) < now) {
      throw new PastDateError()
    }

    const assignedUser = await UserModel.findById(assignedTo)

    if (assignedTo != undefined && assignedUser == null) {
      throw new UserNotFoundError()
    }

    const newItem = await TodoModel.create({
      ...todo,
      createdBy: createdBy,
      assignedTo: assignedTo
    })
    const user = await UserModel.findById(newItem.createdBy)
    return (await this.getById(newItem.id, user!.id))!
  }

  async getById(id: string, userId: string): Promise<Todo | null> {
    const item = await TodoModel.findOne({
      _id: id,
      $or: [{ createdBy: userId }, { assignedTo: userId }]
    })
      .populate('createdBy')
      .populate('assignedTo')

    if (!item) {
      return null
    }

    return item
  }

  async check(id: string, completed: boolean, userId: string): Promise<Todo> {
    const existing = await TodoModel.findOne({
      _id: id,
      $or: [{ createdBy: userId }, { assignedTo: userId }]
    })

    if (!existing) {
      throw new NotFoundError()
    }

    const isChecked = existing.completed
    if (isChecked && completed) {
      throw new CheckedError(true)
    } else if (!isChecked && !completed) {
      throw new CheckedError(false)
    }

    Object.assign(existing, { completed: completed })
    await existing.save()
    const updated = await this.getById(id, userId)
    return updated!
  }

  async assign(id: string, userId: string, assignedTo?: Types.ObjectId): Promise<Todo> {
    const existing = await TodoModel.findOne({
      _id: id,
      createdBy: userId
    })
    if (!existing) {
      throw new NotFoundError()
    }

    if (!assignedTo) {
      throw new UserNotFoundError()
    }

    Object.assign(existing, { assignedTo: assignedTo })
    await existing.save()
    const updated = await this.getById(id, userId)
    return updated!
  }
}

export default new TodoService()
