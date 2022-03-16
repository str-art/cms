import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
import { AuthModule } from "src/auth.module/auth.module";
import { EventController } from "src/event.module/event.controller";
import { Event } from "./event.entity";
import { EventService } from "./event.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Event]),
        AuthModule
    ],
    controllers:[EventController],
    providers:[EventService]
})
export class EventModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth()).forRoutes(EventController)
    }

}