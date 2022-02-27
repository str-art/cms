import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    userId: number;

    screenId: number;
}