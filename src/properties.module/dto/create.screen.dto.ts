import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateScreenDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    userId: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    eventId?: number;
}