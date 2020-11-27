import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../auth/models/user-payload.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {

    constructor(
        @InjectRepository(RoomsRepository)
        private _roomsRepository: RoomsRepository
    ) { }

    async getAllRooms(filterDto: GetRoomsFilterDto): Promise<Room[]> {
        return this._roomsRepository.getRooms(filterDto);
    }

    async getRoomById(id: number) {
        const found = await this._roomsRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id "${id}" not found!`);
        }

        return found;
    }

    async createRoom(user: UserPayload, createRoomDto: CreateRoomDto): Promise<Room> {
        return this._roomsRepository.createRoom(user, createRoomDto);
    }

    async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
        const room = await this.getRoomById(id);

        const { title, description } = updateRoomDto;

        if (title)
            room.title = title;

        if (description)
            room.description = description;

        await room.save();
        return room;
    }

    async deleteRoom(id: number): Promise<void> {
        const result = await this._roomsRepository.delete(id);

        if (!result.affected) {
            throw new NotFoundException(`Room with id "${id}" not found!`);
        }
    }

}
