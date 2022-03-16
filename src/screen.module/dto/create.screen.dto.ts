import { ApiHideProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateScreenDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiHideProperty()
    userId: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    eventId?: number;

    @IsNotEmpty()
    @IsNumber({
        allowNaN: false
    })
    @IsPositive()
    width: number;

    @IsNotEmpty()
    @IsNumber({
        allowNaN: false
    })
    @IsPositive()
    height: number;
}