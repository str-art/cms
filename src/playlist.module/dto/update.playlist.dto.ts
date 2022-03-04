import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator"



export class UpdatePlaylistDto{
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ContentPlace)
    order?: ContentPlace[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ContentDuration)
    duration?: ContentDuration[]

    @IsOptional({each:true})
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ContentToAdd)
    contentToAdd?:ContentToAdd[];

    @IsOptional({each:true})
    @IsArray()
    @IsNumber({allowNaN:false,},{each:true})
    @IsPositive({each:true})
    @ApiProperty({description:'PlaylistToContentId of the content entity you want to delete (id of jointable entity)'})
    contentToDelete?:number[]
}
export class ContentPlace{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({description:'Current order property of content object you want to change order'})
    playlistToContentId: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({description:'Id of join table entity, after wich you want to put '})
    goesAfter?: number;
}
export class ContentDuration{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    playlistToContentId: number;
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    duration: number;
}
export class ContentToAdd{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({description:'Id of content object you want to add. User must have access to it. It will be added to the end of the list by default'})
    contentId:number;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @ApiProperty({description:'Id of content object after wich you want to add this one. Must be present in current playlist'})
    goesAfter?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    duration?: number;
}
