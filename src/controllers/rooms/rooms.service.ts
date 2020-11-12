import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetAllRoomsFilterDto } from './dto/get-all-rooms-filter.dto';
import { Room } from './models/room.model';

@Injectable()
export class RoomsService {

    private _rooms: Room[] = [];

    getAllRooms(): Room[] {
        return [...this._rooms];
    }

    getRoomsWithFilter(filterDto: GetAllRoomsFilterDto): Room[] {
        const { title, description } = filterDto;
        let rooms = this.getAllRooms();

        if (title)
            rooms = rooms.filter(room => room.title.indexOf(title) > -1);

        if (description)
            rooms = rooms.filter(room => room.description.indexOf(description) > -1);

        return rooms;
    }

    getRoomById(id: string): Room {
        const found = this._rooms.find(room => room.id === id);

        if (!found)
            throw new NotFoundException(`Task with id "${id}" not found!`);

        return found;
    }

    createRoom(room: CreateRoomDto): Room {
        const { title, description } = room;
        const new_room = new Room({
            id: this._rooms.length + 1,
            title,
            description
        });
        this._rooms.push(new_room);

        return new_room;
    }

    updateRoom(room): Room {
        let found = this.getRoomById(room.id);
        found = new Room({
            ...found,
            ...room
        });

        return found;
    }

    deleteRoom(id: string): void {
        const found = this.getRoomById(id);
        this._rooms = this._rooms.filter(room => room.id !== found.id);
    }

}
