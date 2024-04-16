import { Todo } from './todo.entity'
import { TodoModel } from './todo.model'

export class TodoService {
  async list(): Promise<Todo[]> {
    const results = await TodoModel.find()
    return results
  }
}

export default new TodoService()
