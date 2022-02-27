import { IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateEventDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    userId: number;

    
}