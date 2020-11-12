import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoomsRepository
        ])
    ],
    controllers: [RoomsController],
    providers: [RoomsService]
})
export class RoomsModule { }
