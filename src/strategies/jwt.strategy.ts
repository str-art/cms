import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "src/user.module/jwt.constants";
import { UserService } from "src/user.module/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
            passReqToCallback: true,
        })
    }
    async validate(req, payload: any){
        console.log(payload)
        const user = await this.userService.getUserById(payload.sub);
        console.log(user)
        if(user) return user;
        else return null;
    }
}