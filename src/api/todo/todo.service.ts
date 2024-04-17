import { NotFoundError } from '../../errors/not-found'
import { Todo } from './todo.entity'
import { TodoModel } from './todo.model'

export class TodoService {
  async list(): Promise<Todo[]> {
    const results = await TodoModel.find()
    return results
  }

  async add(todo: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
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

  async check(id: string, data: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    const existing = await TodoModel.findById(id)
    if (!existing) {
      throw new NotFoundError()
    }

    Object.assign(existing, data)
    await existing.save()
    const updated = await this.getById(id)
    return updated!
  }
}

export default new TodoService()
