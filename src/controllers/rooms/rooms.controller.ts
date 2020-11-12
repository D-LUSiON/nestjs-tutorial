import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Room } from './models/room.model';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

    constructor(
        private _roomsService: RoomsService
    ){}

    @Get()
    getRooms(): Room[] {
        return this._roomsService.getRooms();
    }

    @Get(':id')
    getRoomById(@Param('id') id: string): Room {
        return this._roomsService.getRoomById(id);
    }

    @Post()
    createRoom(@Body() data: any): Room {
        return this._roomsService.createRoom(data);
    }

    @Patch()
    updateRoom(@Body() room: any): Room {
        return this._roomsService.updateRoom(room);
    }

    @Delete(':id')
    deleteRoom(@Param('id') id: string): void {
        return this._roomsService.deleteRoom(id);
    }
}
