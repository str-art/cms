import { Controller, Get, Param, Post, UseGuards, Request, Patch, Body, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { ContentGuard } from "src/auth.module/guards/content.guard";
import { ScreenGuard } from "src/auth.module/guards/screen.guard";
import { GetUser } from "src/decorators/user.decorator";
import { User } from "src/user.module/user.entity";
import { CreatePlaylistNodeDto } from "./dto/create.playlistNode.dto";
import { DeleteOptions } from "./dto/delete.options";
import { UpdatePlaylistNodeDto } from "./dto/update.playlistNode.dto";
import { PlaylistService } from "./playlist.service";


@ApiTags('Working with playlists')
@ApiBearerAuth()
@UseGuards(AuthGuard,ScreenGuard)
@Controller('screen/:screenId/playlist')
export class PlaylistController{
    constructor(private service: PlaylistService){}

    
    @Get()
    async getPlaylist(@Param('screenId')screenId: number){
        return await this.service.getPlaylist(screenId);
    }

    @UseGuards(ContentGuard)
    @Post()
    async createPlaylist(@Param('screenId')screenId: number, @GetUser() user: User, @Body()dto: CreatePlaylistNodeDto ){
        return await this.service.createNode(screenId,user,dto)
    }

    
    @Patch()
    async changePlaylisst(@Param('screenId')screenId: number, @Body()dto: UpdatePlaylistNodeDto, @GetUser() user: User ){
        return await this.service.changePlaylist(screenId,user,dto)
    }

    @Delete()
    async deletePlaylist(@Param('screenId')screenId: number,@GetUser() user: User, @Body()dto: DeleteOptions){
        return await this.service.deletePlaylist(screenId,user,dto)
    }
    
}