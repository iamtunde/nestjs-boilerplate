import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [JwtModule.register({}), UserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, UserModule]
})
export class AuthenticationModule {}
