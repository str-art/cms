import { IsOptional, IsString } from "class-validator";

export class UpdateEventDto{
    @IsOptional()
    @IsString()
    name?: string;

}