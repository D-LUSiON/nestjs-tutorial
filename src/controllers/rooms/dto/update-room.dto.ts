import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateRoomDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    description: string;
}