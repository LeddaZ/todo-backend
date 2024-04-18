import mongoose from 'mongoose'
import { Todo } from './todo.entity'

const todoSchema = new mongoose.Schema<Todo>({
  title: String,
  dueDate: String,
  completed: Boolean,
  expired: Boolean
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    ret.expired = Date.parse(ret.dueDate) < Date.now()
    return ret
  }
})

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema)
