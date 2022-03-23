import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
import { AuthModule } from "src/auth.module/auth.module";
import { ContentController } from "src/content.module/content.controller";
import { StorageModule } from "src/storage/storage.module";
import { Content } from "./content.entity";
import { ContentService } from "./content.service";
import { File } from "./file.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Content,File]),
        AuthModule,
        StorageModule
    ],
    controllers:[ContentController],
    providers:[ContentService]
})
export class ContentModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(requiresAuth()).forRoutes(ContentController)
    }
}