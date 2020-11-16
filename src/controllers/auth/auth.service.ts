import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserPayload } from './models/user-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private _authRepository: AuthRepository,
        private _jwtService: JwtService,
    ) { }

    signUp(signUpDto: SignUpDto): Promise<{ id: number, name: string, username: string }> {
        return this._authRepository.signUp(signUpDto);
    }

    async signIn(credentials: CredentialsDto): Promise<{ accessToken: string }> {
        const payload = await this._authRepository.validateUserPassword(credentials);

        if (!payload)
            throw new UnauthorizedException('Invalid credentials!');

        const accessToken = await this._jwtService.sign(payload);

        return { accessToken };
    }
}
