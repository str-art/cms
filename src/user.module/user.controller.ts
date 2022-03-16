import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { requiresAuth } from "express-openid-connect";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { ResponseUser, UpdateUserDto } from "./user.dto/update.user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags('Working with user entity')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    
    @Get()
    getUser(@Request()req ):User{
        return req.user;
    }

    @Delete()
    async deleteUser(@Request()req ){  
        return await this.userService.deleteUser(req.user)
    }
}