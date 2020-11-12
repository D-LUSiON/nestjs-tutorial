import { Module } from '@nestjs/common';
import { RoomsModule } from './controllers/rooms/rooms.module';

@Module({
    imports: [RoomsModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
