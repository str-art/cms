import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth.module/auth.module";
import { PlaylistController } from "./playlist.controller";
import { Playlist } from "./playlist.entity";
import { PlaylistService } from "./playlist.service";
import { PlaylistToContent } from "./playlistToContent.entity";

@Module({
    exports:[PlaylistService],
    imports:[
        TypeOrmModule.forFeature([Playlist,PlaylistToContent]),
        AuthModule
    ],
    controllers:[PlaylistController],
    providers:[PlaylistService]
})
export class PlaylistModule{}