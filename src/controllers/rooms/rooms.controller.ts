import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
// @UseGuards(AuthGuard()) // Guard whole controller
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
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createRoom(
        @Body() createRoomDto: CreateRoomDto,
        @GetUser() user: User
    ): Promise<Room> {
        console.log(`user that's creating the room:`, user);
        return this._roomsService.createRoom(user, createRoomDto);
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
