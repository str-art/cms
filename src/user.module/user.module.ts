import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
import { AuthModule } from "src/auth.module/auth.module";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";



@Module({
    exports:[UserService],
    imports: [
        TypeOrmModule.forFeature([User]),
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

