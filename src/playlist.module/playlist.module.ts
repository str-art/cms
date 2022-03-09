import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth.module/auth.module";
import { PlaylistController } from "./playlist.controller";
import { PlaylistNode } from "./playlist.entity";
import { PlaylistService } from "./playlist.service";


@Module({
    exports:[PlaylistService],
    imports:[
        TypeOrmModule.forFeature([PlaylistNode]),
        AuthModule
    ],
    controllers:[PlaylistController],
    providers:[PlaylistService]
})
export class PlaylistModule{}