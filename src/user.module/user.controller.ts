import {Controller, Delete, Get,  Request, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { GetUser } from "src/decorators/user.decorator";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags('Working with user entity')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    
    @Get()
    getUser(@GetUser() user: User ):User{
        return user;
    }

    @Delete()
    async deleteUser(@GetUser() user: User ){  
        return await this.userService.deleteUser(user)
    }
}