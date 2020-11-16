import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'chatSuperSecret',
            signOptions: {
                expiresIn: 86400
            }
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        TypeOrmModule.forFeature([
            AuthRepository,
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
