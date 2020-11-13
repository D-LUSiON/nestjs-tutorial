import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Room } from './entities/room.entity';

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {

    async getTasks(filterDto: GetRoomsFilterDto): Promise<Room[]> {
        const { title, description } = filterDto;

        const query = this.createQueryBuilder('room');

        if (title)
            query.andWhere('task.title LIKE :title', { title: `%${title}%` });

        if (title)
            query.andWhere('task.description LIKE :description', { description: `%${description}%` });

        try {
            const rooms = await query.getMany();
            return rooms;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to get rooms with filter: ${filterDto.toString()}`, error.stack);
        }
    }

    async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
        const { title, description } = createRoomDto;
        const room = new Room();
        room.title = title;
        room.description = description;

        try {
            await room.save();
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create room`, error.stack);
        }

        return room;
    }

}