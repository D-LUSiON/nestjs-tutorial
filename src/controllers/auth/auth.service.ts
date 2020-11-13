import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private _authRepository: AuthRepository
    ) { }

    signUp(signUpDto: SignUpDto): Promise<{ id: number, name: string, username: string }> {
        return this._authRepository.signUp(signUpDto);
    }

    signIn(credentials: CredentialsDto): Promise<{ id: number, name: string, username: string }> {
        return this._authRepository.signIn(credentials);
    }
}
