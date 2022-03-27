import { ApiHideProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateEventDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiHideProperty()
    userId: number;

    
}