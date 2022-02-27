import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/guards/jwt.guard";
import { LoginGuard } from "src/guards/login.guard";
import { CreateUserDto } from "./user.dto/createUser.dto";
import { UpdateUserDto } from "./user.dto/update.user.dto";
import { UserService } from "./user.service";

@ApiTags('Working with user entity')
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

    @ApiOkResponse({description:'Returns user entity with all relations',schema:{
        $ref:"#/user.json",
        properties:{
            id:{
                type: 'number',
                description:'Id of user'
            },
            email:{
                type: 'string',
                description:'Users email',
            },
            events:{
                type:'array',
                $ref:"#/event.json",
                description:'List of users events',
            },
            screens:{
                type:'array',
                $ref:"#/screen.json",
                description:'List of users screens',
            },
            playlists:{
                type:'array',
                $ref:"#/playlist.json",
                description:'list of user playlists'
            },
            contents:{
                type:'array',
                $ref:'#/content.json',
                description:'list of user contents'
            }
        }}})
    @ApiBearerAuth()
    @Get()
    @UseGuards(JwtGuard)
    getUser(@Request()req ){
        return req.user;
    }

    @ApiBearerAuth()
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