import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/properties.module/entities/content.entity";
import { Event } from "src/properties.module/entities/event.entity";
import { Playlist } from "src/properties.module/entities/playlist.entity";
import { PlaylistToContent } from "src/properties.module/entities/playlistToContent.entity";
import { Screen } from "src/properties.module/entities/screen.entity";
import { ContentService } from "src/properties.module/services/content.service";
import { EventService } from "src/properties.module/services/event.service";
import { PlaylistService } from "src/properties.module/services/playlist.service";
import { ScreenService } from "src/properties.module/services/screen.service";
import { jwtConstants } from "src/user.module/jwt.constants";
import { User } from "src/user.module/user.entity";
import { UserService } from "src/user.module/user.service";
import { SeedController } from "./seed.controller";
import { SeedService } from "./seed.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,Event,Screen,Playlist,Content,PlaylistToContent]),
        JwtModule.register({secret: jwtConstants.secret}),
    ],
    controllers:[SeedController],
    providers:[UserService,ContentService,EventService,ScreenService,PlaylistService,SeedService],
})
export class Seeder{}