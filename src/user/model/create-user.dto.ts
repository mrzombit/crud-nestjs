import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, Matches } from "class-validator";

export class CreateUserDTO {

  @IsNotEmpty({ message: 'Please Enter Username' })
  @IsString({ message: 'Please Enter Valid Username' })
  @Matches(/[a-zA-Z0-9_-]{6,18}/,
    { message: 'Username length Must be between 6 and 18 charcters without any special characters or symbols' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 20, { message: 'Password length Must be between 8 and 20 charcters' })
  readonly password: string;

}