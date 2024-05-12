import { IsEmail, IsString, IsUrl, Matches, MinLength } from 'class-validator'

export class AddUserDTO {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsUrl()
  picture: string

  @IsEmail()
  username: string

  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'The password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character'
  })
  password: string
}

export class LoginDTO {
  @IsEmail()
  username: string

  @IsString()
  password: string
}
