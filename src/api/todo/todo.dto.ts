import { IsDateString, IsString, ValidateIf } from 'class-validator'

export class CreateTodoDTO {
  @IsString()
  title: string

  @IsDateString()
  @ValidateIf((_object, value) => value !== undefined)
  dueDate: string
}
