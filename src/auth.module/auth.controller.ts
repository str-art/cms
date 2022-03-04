import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/user.module/user.dto/createUser.dto";
import { ResponseUser } from "src/user.module/user.dto/update.user.dto";
import { AuthService } from "./auth.service";
import { LoginGuard } from "./guards/login.guard";

@ApiTags('Authentication')
@Controller('signup')
export class AuthController{
    constructor(private authService: AuthService){}
    @Post('auth')
    async registerUser(@Body()dto: CreateUserDto):Promise<ResponseUser>{
        return await this.authService.registerUser(dto)
    }

    @Post('login')
    @UseGuards(LoginGuard)
    login(@Request()req ): ResponseUser{
        return this.authService.loginUser(req.user)
    }
}