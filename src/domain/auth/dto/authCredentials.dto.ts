import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

export class AuthCredentailsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  remember_me: boolean;
}
