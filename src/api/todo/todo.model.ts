import mongoose from 'mongoose'
import { Todo } from './todo.entity'

const todoSchema = new mongoose.Schema<Todo>({
  id: { type: String },
  title: String,
  dueDate: Date,
  completed: Boolean,
  expired: Boolean
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    return ret
  }
})

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema)
