import { CheckedError } from '../../errors/checked'
import { NotFoundError } from '../../errors/not-found'
import { Todo } from './todo.entity'
import { TodoModel } from './todo.model'

export class TodoService {
  async list(showCompleted: boolean): Promise<Todo[]> {
    let results
    if (showCompleted) {
      results = await TodoModel.find()
    } else {
      results = await TodoModel.find({ completed: false })
    }
    return results
  }

  async add(todo: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    todo.completed = false
    const newItem = await TodoModel.create(todo)
    return (await this.getById(newItem.id))!
  }

  async getById(id: string): Promise<Todo | null> {
    const item = await TodoModel.findById(id)
    if (!item) {
      return null
    }
    return item
  }

  async check(id: string, completed: boolean): Promise<Todo> {
    const existing = await TodoModel.findById(id)
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
    const updated = await this.getById(id)
    return updated!
  }
}

export default new TodoService()
