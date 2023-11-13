import {CreateUserDto} from "../../domain/user/dto/create-user.dto";
import {Injectable} from "@nestjs/common";
import {UserInterface} from "../../domain/user/entities/user.entity";


@Injectable()
export class UserRepository {

    async create(dto: CreateUserDto) {
        return {}
    }

    async getMany() {
        return []
    }

    async getOne(a: any): Promise<UserInterface> {
        return {
            id: 'ok',
            email: "",
            password: "",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }

    async remove(a: any) {
        return {}
    }

    async update(a: any, b: any) {
        return {affected: 0}
    }
}