import { IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}