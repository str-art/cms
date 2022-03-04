import { Controller, Get, Param, Post, UseGuards, Request, Patch, Body, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth.module/guards/jwt.guard";
import { CreatePlaylistDto } from "./dto/create.playlist.dto";
import { UpdatePlaylistDto } from "./dto/update.playlist.dto";
import { PlaylistService } from "./playlist.service";


@ApiTags('Working with playlists')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('screen/:screenId/playlist')
export class PlaylistController{
    constructor(private service: PlaylistService){}

    @Get()
    async getPlaylist(@Param('screenId')screenId: number, @Request()req ){
        return await this.service.findPlaylist(screenId,req.user);
    }

    @Post()
    async createPlaylist(@Param('screenId')screenId: number, @Request()req, @Body()dto: CreatePlaylistDto ){
        return await this.service.createPlaylist(screenId,dto,req.user)
    }

    @Patch()
    async changePlaylisst(@Param('screenId')screenId: number, @Body()dto: UpdatePlaylistDto, @Request()req ){
        return await this.service.changePlaylist(screenId,dto,req.user)
    }

    @Delete()
    async deletePlaylist(@Param('screenId')screenId: number){
        return await this.service.deletePlaylist(screenId)
    }
}