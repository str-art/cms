import { IsOptional, IsString } from "class-validator";

export class UpdateContentDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    url?: string;
}