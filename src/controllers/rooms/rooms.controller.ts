import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetAllRoomsFilterDto } from './dto/get-all-rooms-filter.dto';
import { Room } from './models/room.model';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

    constructor(
        private _roomsService: RoomsService
    ){}

    @Get()
    getRooms(@Query(ValidationPipe) filterDto: GetAllRoomsFilterDto): Room[] {
        if (Object.keys(filterDto).length)
            return this._roomsService.getRoomsWithFilter(filterDto);
        else
        return this._roomsService.getAllRooms();
    }

    @Get(':id')
    getRoomById(@Param('id', ParseIntPipe) id: string): Room {
        return this._roomsService.getRoomById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRoom(@Body() createRoomDto: CreateRoomDto): Room {
        return this._roomsService.createRoom(createRoomDto);
    }

    @Patch()
    updateRoom(@Body() room: any): Room {
        return this._roomsService.updateRoom(room);
    }

    @Delete(':id')
    deleteRoom(@Param('id', ParseIntPipe) id: string): void {
        return this._roomsService.deleteRoom(id);
    }
}
