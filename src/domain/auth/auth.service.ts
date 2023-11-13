import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthCredentailsDto } from "./dto/authCredentials.dto";
import { AuthRegisterDto } from "./dto/authRegister.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserInterface } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async login(dto: AuthCredentailsDto) {
    const user = await this.validateUserPassword(dto);

    const payload = { email: user.email, id: user.id };

    if (dto.remember_me) {
      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.REMEMBER_ME_EXPIRES_IN,
          secret: process.env.JWT_SECRET,
        }),
      };
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUserPassword(
    payload: AuthCredentailsDto,
  ): Promise<UserInterface> {
    const { password, email } = payload;

    const user = await this.usersService.findOne({ email });

    if (await this.usersService.validatePassword(user, password)) return user;

    throw new UnauthorizedException("invalid password");
  }

  async register(payload: AuthRegisterDto) {
    const newUser = payload;
    delete newUser.passwordConfirm;
    const salt = await bcrypt.genSalt();

    newUser.password = await this.hashPassword(newUser.password, salt);
    return this.usersService.create(newUser);
  }

  async passwordForgotten(email: string) {
    const user = await this.usersService.findOne({ email });

    if (user) {
      // this.eventEmitter.emit(
      //   ResetPasswordEvent.eventName,
      //   new ResetPasswordEvent({ email: user.email }),
      // );

      return { message: "email envooyé" };
    }

    return new NotFoundException("account not found");
  }

  // logout() {}
}
