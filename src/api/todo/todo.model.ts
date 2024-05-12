import mongoose, { Schema } from 'mongoose'
import { Todo } from './todo.entity'
import { isExpired } from '../../utils/is-expired'

const todoSchema = new mongoose.Schema<Todo>({
  title: String,
  dueDate: String,
  completed: Boolean,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }
})

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

todoSchema.virtual('expired').get(function () {
  return isExpired(this.dueDate) && !this.completed
})

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema)
