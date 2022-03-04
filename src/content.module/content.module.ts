import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth.module/auth.module";
import { ContentController } from "src/event.module/content.controller";
import { Content } from "./content.entity";
import { ContentService } from "./content.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Content]),
        AuthModule,
    ],
    controllers:[ContentController],
    providers:[ContentService]
})
export class ContentModule{}