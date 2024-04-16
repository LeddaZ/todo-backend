import mongoose from 'mongoose'
import { Todo } from './todo.entity'

const todoSchema = new mongoose.Schema<Todo>({
  title: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
  expired: { type: Boolean, default: false }
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    return ret
  }
})

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema)
