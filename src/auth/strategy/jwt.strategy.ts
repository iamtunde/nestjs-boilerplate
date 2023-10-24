import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from  "passport-jwt";
import { USER_REPOSITORY } from 'src/constants';
import { User } from "src/user/entities/user.entity";

@Injectable()

export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
    ) {
        constructor(config: ConfigService, @Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: config.get('JWT_SECRET'),
            })
        }

        async validate(payload: {sub: number, email: string}) {
            const user = await this.userRepository.findOne<User>({
                where: {
                    id: payload.sub
                }
            })

            delete user.password
            return user
        }

    

}



