import { Types } from 'mongoose'

export class Todo {
  id: string
  title: string
  dueDate: string
  completed: boolean
  expired: boolean
  createdBy: Types.ObjectId
  assignedTo?: Types.ObjectId
}
