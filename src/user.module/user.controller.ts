import {Controller, Delete, Get,  Request, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
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