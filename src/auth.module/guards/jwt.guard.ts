import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
        if(err || !user) 
        { console.log(err);
            console.log(user)
            throw err || new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Invalid token' 
            }, HttpStatus.UNAUTHORIZED)
        }
        return user;
    }
}