import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "src/content.module/content.entity";
import { Event } from "src/event.module/event.entity";
import { Playlist } from "src/playlist.module/playlist.entity";
import { PlaylistToContent } from "src/playlist.module/playlistToContent.entity";
import { Screen } from "src/screen.module/screen.entity";
import { jwtConstants } from "src/user.module/jwt.constants";
import { User } from "src/user.module/user.entity";
import { SeedController } from "./seed.controller";
import { EventModule } from "src/event.module/event.module";
import { ScreenModule } from "src/screen.module/screen.module";
import { UserModule } from "src/user.module/user.module";
import { AuthModule } from "src/auth.module/auth.module";
import { ContentModule } from "src/content.module/content.module";
import { PlaylistModule } from "src/playlist.module/playlist.module";
import { SeedService } from "./seed.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,Event,Screen,Playlist,Content,PlaylistToContent]),
        JwtModule.register({secret: jwtConstants.secret}),
        UserModule,
        PlaylistModule,
        AuthModule
    ],
    controllers:[SeedController],
    providers:[SeedService],
})
export class Seeder{}