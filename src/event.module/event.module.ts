import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth.module/auth.module";
import { EventController } from "src/content.module/event.controller";
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
export class EventModule{

}