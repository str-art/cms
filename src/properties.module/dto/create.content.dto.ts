import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContentDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    userId:number;
}