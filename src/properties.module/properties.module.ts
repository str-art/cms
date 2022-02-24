import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "./controllers/event.controller";
import { Event } from "./entities/event.entity";
import { EventService } from "./services/event.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event])
    ],
    controllers: [EventController],
    providers: [EventService]
})
export class PropertiesModule{}