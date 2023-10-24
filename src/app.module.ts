import { Module } from '@nestjs/common';
import { AuthenticationService } from './auth/auth.service';
import { AuthenticationController } from './auth/auth.controller';
import { AuthenticationModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule,
    DatabaseModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserModule],
})
export class AppModule {}
