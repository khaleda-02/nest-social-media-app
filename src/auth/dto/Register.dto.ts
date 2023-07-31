import { IsNotEmpty ,IsEmail, Length } from "class-validator";

export class RegisterDto{
  @IsNotEmpty() 
  username: string;

  @IsNotEmpty() 
  @Length(6,12) 
  password: string;

  @IsNotEmpty()
  @IsEmail() 
  email :string;
}