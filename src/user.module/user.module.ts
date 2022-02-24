import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtGuard } from "src/guards/jwt.guard";
import { LoginGuard } from "src/guards/login.guard";
import { JwtStrategy } from "src/strategies/jwt.strategy";
import { LocalStrategy } from "src/strategies/local.strategy";
import { jwtConstants } from "./jwt.constants";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";



@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({secret: jwtConstants.secret})
    ],
    providers: [
        UserService,
        LoginGuard,
        JwtGuard,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [UserController]
})
export class UserModule{}