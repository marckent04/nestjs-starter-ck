import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentailsDto } from "./dto/authCredentials.dto";
import { AuthRegisterDto } from "./dto/authRegister.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("/login")
  login(@Body() payload: AuthCredentailsDto) {
    return this.authService.login(payload);
  }

  @Post("/register")
  register(@Body() payload: AuthRegisterDto) {
    if (payload.password != payload.passwordConfirm)
      return new BadRequestException("password not identicals");

    return this.authService.register(payload);
  }

  refreshToken() {}

  @Post("/password-forgotten")
  async passwordForgotten(@Body("email") email) {
    return this.authService.passwordForgotten(email);
  }
}
