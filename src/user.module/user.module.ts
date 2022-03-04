import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth.module/auth.module";
import { JwtGuard } from "src/auth.module/guards/jwt.guard";
import { LoginGuard } from "src/auth.module/guards/login.guard";
import { JwtStrategy } from "src/auth.module/strategies/jwt.strategy";
import { LocalStrategy } from "src/auth.module/strategies/local.strategy";
import { jwtConstants } from "./jwt.constants";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";



@Module({
    exports:[UserService],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({secret: jwtConstants.secret}),
        AuthModule,
    ],
    providers: [
        UserService,
        LoginGuard,
        JwtGuard
    ],
    controllers: [UserController]
})
export class UserModule{}