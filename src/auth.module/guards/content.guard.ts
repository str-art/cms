import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class ContentGuard implements CanActivate{
    canActivate(context: ExecutionContext):boolean{
        const req = context.switchToHttp().getRequest();
        const content = req.user;
        const dto = req.body
        if(dto.contentId){
            const allow = content.contents.find((c)=>c.id==dto.contentId)
        if(!allow)return false
        }
        return true;
    }
}