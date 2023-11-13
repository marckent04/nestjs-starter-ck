import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserInterface } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import {UserRepository} from "../../database/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {

  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.repository.create(createUserDto)
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async validatePassword(user: UserInterface, password: string) {
    return await bcrypt.compare(password, user.password);
  }

   findAll() {
    return this.repository.getMany();
  }

  async findOne(payload: UpdateUserDto): Promise<UserInterface> {
    try {
      return await this.repository.getOne(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.repository.update({ id }, updateUserDto);

    if (result.affected === 0)
      throw new HttpException(result, HttpStatus.NOT_FOUND);

    return result;
  }

  async remove(id: number) {
    const result = await this.repository.remove({ id });
    return result;
  }
}
