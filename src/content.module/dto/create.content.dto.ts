import { ApiHideProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ScreenOrientation } from "src/screen.module/screen.entity";

export class CreateContentDto{
    @IsOptional()
    @IsString()
    name?: string;

    @ApiHideProperty()
    userId:number;

    @IsNotEmpty()
    width: number;

    @IsNotEmpty()
    height: number;

    @ApiHideProperty()
    contentType:string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['portrait','landscape'],{message:'Invalide orientation'})
    orientation: ScreenOrientation
}