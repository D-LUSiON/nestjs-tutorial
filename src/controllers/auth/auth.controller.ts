import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserPayload } from './models/user-payload.interface';

@Controller('auth')
export class AuthController {

    constructor(
        private _authService: AuthService
    ) {}

    @Post('sign-up')
    signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<UserPayload> {
        return this._authService.signUp(signUpDto);
    }

    @Post('sign-in')
    signIn(@Body(ValidationPipe) credentials: CredentialsDto): Promise<{ accessToken: string }> {
        return this._authService.signIn(credentials);
    }

    // Route for testing user extraction from request token
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: UserPayload) {
        console.log(user);
        return user;
    }
}
