import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('rooms')
export class RoomsController {

    @Get()
    getRooms(): string {
        return 'List of all rooms retrieved!';
    }

    @Get(':id')
    getRoomById(): string {
        return 'Single room retrieved by id!';
    }

    @Post()
    createRoom(): string {
        return 'User created a room';
    }

    @Patch(':id')
    updateRoom(): string {
        return 'User updated a room';
    }

    @Delete(':id')
    deleteRoom(): string {
        return 'User deleted a room';
    }
}
