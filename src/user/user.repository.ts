import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { createUsersDTO } from './dto/create.users.dto';
import { USER_REPOSITORY } from 'src/constants';

@Injectable()

export class UserRepository {
    constructor(@Inject(USER_REPOSITORY) private readonly userModel: typeof User) {}

    async create(payload: createUsersDTO): Promise<User> {
        return await this.userModel.create<User>(payload)
    }

    async findOne(payload: object) {
        return await this.userModel.findOne({
            where: {...payload}
        })
    }

    async findById(id: string) {
        return await this.userModel.findByPk(id)
    }

    async findAll(params: object) {
        return await this.userModel.findAll({
            where: {...params}
        })
    }

    async updateOne() {}

    async deleteOne() {}

}