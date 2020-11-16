import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from './auth.repository';
import { UserPayload } from './models/user-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(AuthRepository)
        private _authRepository: AuthRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'chatSuperSecret'
        });
    }

    async validate(payload: UserPayload) {
        // Here you can get full user from the database and return it to the caller like this:

        // const { id } = payload;
        // const user = this._authRepository.findOne(id);

        if (!payload)
            throw new UnauthorizedException('Invalid credentials!');

        return payload;
    }
}