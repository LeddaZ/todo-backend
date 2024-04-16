import { Todo } from './todo.entity'
import { TodoModel } from './todo.model'

export class TodoService {
  async list(): Promise<Todo[]> {
    return TodoModel.find()
  }
}

export default new TodoService()
