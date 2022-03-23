import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

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
        if(req.params.contentId){
            const allow = content.contents.find((c)=>c.id==req.params.contentId)
            if(!allow)return false
        }
        return true;
    }
}