import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseError } from 'sequelize';
import { UserRepository } from './user.repository';
import * as argon from "argon2"
import { createUsersDTO } from './dto/create.users.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository:UserRepository){}

    async create(payload: createUsersDTO) {
        try {
            const hashedPasword = await argon.hash(payload.password)
    
            payload.password = hashedPasword
    
            return await this.userRepository.create(payload)
        } catch(error) {
            throw new DatabaseError(error)
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({email})

            if(!user)
                throw new NotFoundException("User not found.")

            return user
        } catch(error) {
            throw new DatabaseError(error)
        }
    }

    async findUserById(id: string) {
        try {
            const user = await this.userRepository.findById(id)

            if(!user)
                throw new NotFoundException("User not found.")

            return user
        } catch(error) {
            throw new DatabaseError(error)
        }
    }
}
