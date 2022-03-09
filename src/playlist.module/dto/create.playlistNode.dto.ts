import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreatePlaylistNodeDto{
    @ApiHideProperty()
    @IsEmpty()
    screenId?: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    contentId: number;

    @ApiHideProperty()
    @IsEmpty()
    duration?: number;

    @ApiHideProperty()
    @IsEmpty()
    order?: number;
}