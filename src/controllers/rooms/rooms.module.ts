import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoomsRepository
        ]),
        AuthModule
    ],
    controllers: [RoomsController],
    providers: [RoomsService]
})
export class RoomsModule { }
