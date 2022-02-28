import { ApiHideProperty } from "@nestjs/swagger";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiHideProperty()
    userId: number;

    @ApiHideProperty()
    screenId: number;
}
export class ContentList{
    constructor(newName:string,newUrl:string,newDuration:number,newOrder:number){
        this.name = newName;
        this.url = newUrl;
        this.duration = newDuration;
        this.order = newOrder;

    }
    @ApiProperty()
    name: string;
    @ApiProperty()
    url: string;
    @ApiProperty()
    duration: number;
    @ApiProperty()
    order: number;
}

export class PlaylistModified{
    @ApiProperty()
    name: string;
    @ApiProperty()
    content: ContentList[]
}