import { Injectable } from '@nestjs/common';
import { Room } from './models/room.model';

@Injectable()
export class RoomsService {

    private _rooms: Room[] = [];

    getRooms(): Room[] {
        return [...this._rooms];
    }

    getRoomById(id: string): Room {
        const found = this._rooms.find(room => room.id === id);

        return found;
    }

    createRoom(room): Room {
        const { title, description } = room;
        const new_room = new Room({
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
