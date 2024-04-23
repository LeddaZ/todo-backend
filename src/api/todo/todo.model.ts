import mongoose from 'mongoose'
import { Todo } from './todo.entity'

const todoSchema = new mongoose.Schema<Todo>({
  title: String,
  dueDate: String,
  completed: Boolean,
  expired: Boolean
})

todoSchema.pre<Todo>('save', function (next) {
  this.expired = Date.parse(this.dueDate) < Date.now() && !this.completed
  next()
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema)
