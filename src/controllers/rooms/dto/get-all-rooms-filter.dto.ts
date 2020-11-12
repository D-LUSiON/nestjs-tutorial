import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetAllRoomsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;
}