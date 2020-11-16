import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { UserPayload } from './models/user-payload.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    async signUp(signUpDto: SignUpDto): Promise<UserPayload> {
        const { name, username, password } = signUpDto;
        const user = new User();
        user.name = name;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);

        try {
            await user.save();
            return {
                id: user.id,
                name: user.name,
                username: user.username
            };
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists!');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(credentialsDto: CredentialsDto): Promise<UserPayload> {
        const { username, password } = credentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return {
                id: user.id,
                name: user.name,
                username
            };
        } else {
            return null;
        }
    }
}