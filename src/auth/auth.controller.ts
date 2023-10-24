import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignInDTO, SignUpDTO } from './dto';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly userService: UserService
    ) {}

    /* POST auth/signup */
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() payload: SignUpDTO) {
        /* sign up code logic goes here */
        return this.userService.create(payload)
    }

    /* POST auth/signin */
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() payload: SignInDTO) {
        /* login code logic goes here */
        return this.authService.signIn(payload)
    }
}
