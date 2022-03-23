import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService){}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        if(req.user){return true}
        req.user = await this.authService.getUser(req.oidc.user)
        return true
    }
}