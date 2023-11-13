import { IsEmail, Matches } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/,
  )
  password: string;
}
