import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetRoomsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;
}