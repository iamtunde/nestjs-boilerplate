import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { usersProviders } from './users.providers';
import { UserRepository } from './user.repository';

@Module({
    providers:[UserService, UserRepository, ...usersProviders],
    exports: [UserService]
})
export class UserModule {}
