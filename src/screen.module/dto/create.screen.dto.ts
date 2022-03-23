import { ApiHideProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ScreenOrientation } from "../screen.entity";

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

    @IsNotEmpty()
    @IsString()
    @IsIn(['portrait','landscape'])
    orientation: ScreenOrientation
}