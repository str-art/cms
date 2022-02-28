import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { LoginGuard } from "src/guards/login.guard";
import { CreateUserDto } from "./user.dto/createUser.dto";
import { ResponseUser, UpdateUserDto } from "./user.dto/update.user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags('Working with user entity')
@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    @Post('auth')
    async registerUser(@Body()dto: CreateUserDto):Promise<ResponseUser>{
        return await this.userService.registerUser(dto)
    }

    @Post('login')
    @UseGuards(LoginGuard)
    login(@Request()req ): ResponseUser{
        return this.userService.loginUser(req.user)
    }

    
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtGuard)
    getUser(@Request()req ):User{
        return req.user;
    }

    @ApiBearerAuth()
    @Patch()
    @UseGuards(JwtGuard)
    async changeUser(@Body()dto: UpdateUserDto, @Request() req):Promise<ResponseUser>{
        return await this.userService.updateUser(dto, req.user)
    }

    @Delete()
    @UseGuards(JwtGuard)
    async deleteUser(@Request()req ){
        
        return await this.userService.deleteUser(req.user)
    }
}