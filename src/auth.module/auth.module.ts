import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
import { User } from "src/user.module/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    exports:[AuthService],
    imports:[
        TypeOrmModule.forFeature([User])
        
    ],
    controllers:[AuthController],
    providers:[
        AuthService,
        
    ]
})
export class AuthModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth()).forRoutes(AuthController)
    }
}
