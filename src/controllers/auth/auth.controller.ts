import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
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
}
