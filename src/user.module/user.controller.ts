import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { JwtGuard } from "src/guards/jwt.guard";
import { LoginGuard } from "src/guards/login.guard";
import { CreateUserDto } from "./user.dto/createUser.dto";
import { UpdateUserDto } from "./user.dto/update.user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    @Post('auth')
    async registerUser(@Body()dto: CreateUserDto){
        return await this.userService.registerUser(dto)
    }

    @Post('login')
    @UseGuards(LoginGuard)
    login(@Request()req ){
        return this.userService.loginUser(req.user)
    }

    @Get()
    @UseGuards(JwtGuard)
    getUser(@Request()req ){
        return req.user;
    }

    @Patch()
    @UseGuards(JwtGuard)
    async changeUser(@Body()dto: UpdateUserDto, @Request() req){
        return await this.userService.updateUser(dto, req.user)
    }

    @Delete()
    @UseGuards(JwtGuard)
    async deleteUser(@Request()req ){
        
        return await this.userService.deleteUser(req.user)
    }
}