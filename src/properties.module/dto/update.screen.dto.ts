import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateScreenDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    eventId?: number;
}