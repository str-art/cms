import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
import { AuthModule } from "src/auth.module/auth.module";
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
    ],
    controllers: [UserController]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth()).forRoutes(UserController)
    }
}

