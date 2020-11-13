import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { UserPayload } from './models/user-payload.interface';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    async signUp(signUpDto: SignUpDto): Promise<UserPayload> {
        const { name, username, password } = signUpDto;
        const user = new User();
        user.name = name;
        user.username = username;
        user.password = password;

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

    async signIn(credentialsDto: CredentialsDto): Promise<UserPayload> {
        const { username, password } = credentialsDto;
        const user = await this.findOne({
            where: {
                username,
                password
            }
        });

        if (user) {
            return {
                id: user.id,
                name: user.name,
                username
            }
        } else {
            throw new NotFoundException('User not found!');
        }
    }
}