import { ApiHideProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateContentDto{
    @IsOptional()
    @IsString()
    name?: string;

    @ApiHideProperty()
    userId:number;

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