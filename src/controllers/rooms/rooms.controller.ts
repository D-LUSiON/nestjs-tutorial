import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

    constructor(
        private _roomsService: RoomsService
    ){}

    @Get()
    getRooms(@Query(ValidationPipe) filterDto: GetRoomsFilterDto): Promise<Room[]> {
        return this._roomsService.getAllRooms(filterDto);
    }

    @Get(':id')
    getRoomById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
        return this._roomsService.getRoomById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
        return this._roomsService.createRoom(createRoomDto);
    }

    @Patch(':id')
    updateRoom(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoomDto: UpdateRoomDto): Promise<Room> {
        return this._roomsService.updateRoom(id, updateRoomDto);
    }

    @Delete(':id')
    deleteRoom(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._roomsService.deleteRoom(id);
    }
}
