import mongoose from 'mongoose'
import { User as iUser } from './user.entity'

export const userSchema = new mongoose.Schema<iUser>({
  firstName: String,
  lastName: String,
  picture: String
})

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

userSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
    return ret
  }
})

export const UserModel = mongoose.model<iUser>('User', userSchema)
