import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "src/user.module/jwt.constants";
import { User } from "src/user.module/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { LoginGuard } from "./guards/login.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    exports:[AuthService],
    imports:[
        TypeOrmModule.forFeature([User]),
        JwtModule.register({secret: jwtConstants.secret})
    ],
    controllers:[AuthController],
    providers:[
        AuthService,
        LoginGuard,
        JwtGuard,
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthModule{}