import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class ScreenGuard implements CanActivate{
    canActivate(context: ExecutionContext):boolean{
        const req = context.switchToHttp().getRequest();
        const content = req.user;
        const screen = req.params;
        const allow = content.screens.find((s)=>s.id==screen.screenId)
        if(!allow)return false
        return true;
    }
}