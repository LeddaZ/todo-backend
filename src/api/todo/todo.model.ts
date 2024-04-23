import mongoose from 'mongoose'
import { Todo } from './todo.entity'
import { isExpired } from '../../utils/is-expired'

const todoSchema = new mongoose.Schema<Todo>({
  title: String,
  dueDate: String,
  completed: Boolean,
  expired: Boolean
})

todoSchema.pre<Todo>('save', function (next) {
  this.expired = isExpired(this.dueDate) && !this.completed
  next()
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    ret.expired = isExpired(ret.dueDate) && !ret.completed
    return ret
  }
})

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema)
