
import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ScreenOrientation } from "../screen.entity";

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

    @IsOptional()
    @IsString()
    @IsIn(['portrait','landscape'])
    orientation: ScreenOrientation
}