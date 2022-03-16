
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateScreenDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    eventId?: number;

    @IsOptional()
    @IsNumber({
        allowNaN: false
    })
    @IsPositive()
    width?: number;

    @IsOptional()
    @IsNumber({
        allowNaN: false
    })
    @IsPositive()
    height?: number;
}