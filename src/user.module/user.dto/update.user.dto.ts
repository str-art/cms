import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { User } from "../user.entity";

export class UpdateUserDto{
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;


}

export class ResponseUser{
    @ApiProperty()
    user: User;
    @ApiProperty({dscription:'JWT token'})
    access_token: string;
    
}