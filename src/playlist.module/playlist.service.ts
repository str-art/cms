import {HttpException, HttpStatus, Injectable, Sse} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { iif } from "rxjs";
import { User } from "src/user.module/user.entity";
import { Repository } from "typeorm";
import { CreatePlaylistNodeDto } from "./dto/create.playlistNode.dto";
import { DeleteOptions } from "./dto/delete.options";
import { UpdatePlaylistNodeDto } from "./dto/update.playlistNode.dto";
import { PlaylistNode } from "./playlist.entity";


@Injectable()
export class PlaylistService{
   constructor(@InjectRepository(PlaylistNode)private repo:Repository<PlaylistNode>){}

    async createNode(screenId:number, user:User, dto:CreatePlaylistNodeDto){
        dto.screenId = screenId;
        const newNode = this.repo.create(dto);
        await this.repo.insert(newNode);
        return await this.getPlaylist(screenId)
    }

    async getPlaylist(screenId:number){
        
        return await this.repo.find({
            where:{
                screenId:screenId
            },
            relations:['content'],
            order:{
                order:'ASC'
            }
        })
    }

    async changePlaylist(screenId:number,user:User,dto:UpdatePlaylistNodeDto){
        
        const node = await this.repo.findOne({
            where:{
                id:dto.id,
                screenId:screenId
            }
        })
        if(dto.order)node.order = dto.order;
        if(dto.duration)node.duration = dto.duration;
        await this.repo.save(node);
        return await this.getPlaylist(screenId)
    }

    async deletePlaylist(screenId:number,user:User,dto:DeleteOptions){
        if(dto.delete === true){
            await this.repo.delete({
                screenId:screenId
            })
        }
        if(typeof dto.delete === 'number'){
            const entityToDelete = await this.repo.findOne({
                where:{
                    id:dto.delete,
                    screenId:screenId
                }
            })
            if(entityToDelete){await this.repo.remove(entityToDelete);}
            
        }
        return await this.getPlaylist(screenId)
    }

}