import { IsDateString, IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator'

export class CreateTodoDTO {
  @IsString()
  title: string

  @IsDateString()
  @ValidateIf((_object, value) => value !== undefined)
  dueDate: string

  @IsMongoId()
  @IsOptional()
  assignedTo: string
}
