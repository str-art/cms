import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import {auth} from 'express-oauth2-jwt-bearer'
import { configAuth0 } from "src/auth0config";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService){}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        req.user = await this.authService.getUser(req.oidc.user)
        return true
    }
}