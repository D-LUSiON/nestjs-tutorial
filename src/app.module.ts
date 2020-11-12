import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { RoomsModule } from './controllers/rooms/rooms.module';

@Module({
    imports: [
        RoomsModule,
        TypeOrmModule.forRoot(TypeOrmConfig)
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
