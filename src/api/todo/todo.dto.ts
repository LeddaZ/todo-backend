import { IsDateString, IsString } from 'class-validator'

export class CreateTodoDTO {
  @IsString()
  title: string

  @IsDateString()
  dueDate: string
}
