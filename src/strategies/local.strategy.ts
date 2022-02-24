import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { UserService } from "src/user.module/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            usernameField: 'email',
        })
    }

    async validate(email: string, password: string){
        const user = await this.userService.validateUser(email, password);
        if(!user) throw new UnauthorizedException('Password or email is invalid')
        return user;
    }

}