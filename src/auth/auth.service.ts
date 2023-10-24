import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as argon from "argon2"
import { SignInDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseError } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()

export class AuthenticationService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        private userService: UserService
    ){}

    async signIn(payload: SignInDTO) {
        let user = null

        try {
            //find user by email
            user = await this.userService.findUserByEmail(payload.email)
        } catch(error) {
            throw new DatabaseError(error)
        }

        if(!user)
            throw new ForbiddenException("Incorrect login credentials.")
        
        //compare passwords
        const passwordMatch = await argon.verify(user.password, payload.password)

        if(!passwordMatch)
            throw new ForbiddenException("Incorrect login credentials.")

        return this.signToken(user.id, payload.email)
    }

    async signToken(id: string, email: string): Promise<{access_token: string}> {
        const secret = this.config.get('JWT_SECRET')

        const payload = {
            sub: id,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })

        return {
            access_token: token
        }
    }
}
