import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
import { jwtConstants } from "src/user.module/jwt.constants";
import { User } from "src/user.module/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    exports:[AuthService],
    imports:[
        TypeOrmModule.forFeature([User]),
        JwtModule.register({secret: jwtConstants.secret})
        
    ],
    controllers:[AuthController],
    providers:[
        AuthService,
        
    ]
})
export class AuthModule{}
