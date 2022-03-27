import { ApiProperty } from "@nestjsx/crud/lib/crud";
import {  IsNotEmpty } from "class-validator";
import { isIntOrBoolean } from "../int.or.boolean.decorator";

export class DeleteOptions{
    @IsNotEmpty()
    @isIntOrBoolean()
    @ApiProperty({
        description: 'Either and id of playlistNode to delete from playlist or true to delete all',
        oneOf: [
            { type: 'number'},
            {type : 'boolean'}
        ]
    })
    delete: number | boolean;
}

