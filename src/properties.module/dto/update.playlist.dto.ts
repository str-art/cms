import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator"

export class ContentPlace{
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    currentOrder: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
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
    contentId:number;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    duration?: number;
    
}

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
    contentToDelete?:number[]
}