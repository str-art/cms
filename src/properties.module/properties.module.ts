import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtGuard } from "src/guards/jwt.guard";
import { JwtStrategy } from "src/strategies/jwt.strategy";
import { jwtConstants } from "src/user.module/jwt.constants";
import { User } from "src/user.module/user.entity";
import { UserModule } from "src/user.module/user.module";
import { UserService } from "src/user.module/user.service";
import { ContentController } from "./controllers/content.controller";
import { EventController } from "./controllers/event.controller";
import { PlaylistController } from "./controllers/playlist.controller";
import { ScreenController } from "./controllers/screen.controller";
import { Content } from "./entities/content.entity";
import { Event } from "./entities/event.entity";
import { Playlist } from "./entities/playlist.entity";
import { PlaylistToContent } from "./entities/playlistToContent.entity";
import { Screen } from "./entities/screen.entity";
import { ContentService } from "./services/content.service";
import { EventService } from "./services/event.service";
import { PlaylistService } from "./services/playlist.service";
import { ScreenService } from "./services/screen.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event,Screen,Content,Playlist,User,PlaylistToContent]),
        JwtModule.register({secret: jwtConstants.secret})
    ],
    controllers: [
        EventController,
        ScreenController,
        PlaylistController,
        ContentController
    ],
    providers: [
        ScreenService,
        PlaylistService,
        ContentService,
        EventService,
    ]
})
export class PropertiesModule{}