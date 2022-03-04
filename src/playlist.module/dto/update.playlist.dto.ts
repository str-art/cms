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
    @ApiProperty({description:'Order property of content object you want to delete'})
    contentToDelete?:number[]
}
export class ContentPlace{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({description:'Current order property of content object you want to change order'})
    currentOrder: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({description:'New order property of content object after switching order (place where you want this object to be'})
    newOrder: number;
}
export class ContentDuration{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    contentId: number;
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
    
    duration?: number;
    
}