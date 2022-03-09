import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdatePlaylistNodeDto{
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    id:number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    order?:number;

    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    duration?:number;
}