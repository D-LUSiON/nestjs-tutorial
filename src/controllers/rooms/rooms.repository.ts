import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UserPayload } from '../auth/models/user-payload.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Room } from './entities/room.entity';

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {

    async getRooms(filterDto: GetRoomsFilterDto): Promise<Room[]> {
        const { title, description } = filterDto;

        const query = this.createQueryBuilder('room');

        if (title)
            query.andWhere('room.title LIKE :title', { title: `%${title}%` });

        if (title)
            query.andWhere('room.description LIKE :description', { description: `%${description}%` });

        query.leftJoinAndSelect('room.owner', 'user');

        try {
            const rooms = await query.getMany();

            rooms.forEach(room => {
                room.owner.password = undefined;
                room.owner.salt = undefined;
            });

            return rooms;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to get rooms with filter: ${filterDto.toString()}`, error.stack);
        }
    }

    async createRoom(user: UserPayload, createRoomDto: CreateRoomDto): Promise<Room> {
        const { title, description } = createRoomDto;
        const owner = new User();
        owner.id = user.id;
        owner.name = user.name;
        owner.username = user.username;
        const room = new Room();
        room.title = title;
        room.description = description;
        room.owner = owner;

        try {
            await room.save();
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create room`, error.stack);
        }

        return room;
    }

}