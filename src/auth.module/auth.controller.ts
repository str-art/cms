import { Controller, Get, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController{
    constructor(private authServce: AuthService){}

    @Get()
    async proceed(@Request()req ){
        console.log(req)
        return await this.authServce.getUser(req.oidc.user)
    }
}