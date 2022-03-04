import { ApiHideProperty } from "@nestjs/swagger";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ContentToAdd } from "./update.playlist.dto";

export class CreatePlaylistDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiHideProperty()
    userId: number;

    @ApiHideProperty()
    screenId: number;

    @IsOptional({each:true})
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ContentToAdd)
    contentToAdd?:ContentToAdd[];
}
// export class ContentList{
//     constructor(newName:string,newUrl:string,newDuration:number,newOrder:number){
//         this.name = newName;
//         this.url = newUrl;
//         this.duration = newDuration;
//         this.order = newOrder;

//     }
//     @ApiProperty()
//     name: string;
//     @ApiProperty()
//     url: string;
//     @ApiProperty()
//     duration: number;
//     @ApiProperty()
//     order: number;
// }

// export class PlaylistModified{
//     constructor(name:string,contentList:ContentList[])
//     @ApiProperty()
//     name: string;
//     @ApiProperty()
//     content: ContentList[]
// }