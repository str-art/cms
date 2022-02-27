import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user.module/user.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "../dto/create.playlist.dto";
import { ContentDuration, ContentPlace, ContentToAdd, UpdatePlaylistDto } from "../dto/update.playlist.dto";
import { Playlist } from "../entities/playlist.entity";
import { PlaylistToContent } from "../entities/playlistToContent.entity";

export class ContentList{
    constructor(newName:string,newUrl:string,newDuration:number,newOrder:number){
        this.name = newName;
        this.url = newUrl;
        this.duration = newDuration;
        this.order = newOrder;

    }
    name: string;
    url: string;
    duration: number;
    order: number;
}

export class PlaylistModified{
    name: string;
    content: ContentList[]
}

@Injectable()
export class PlaylistService{
    constructor(
        @InjectRepository(Playlist)private repo:Repository<Playlist>,
        @InjectRepository(PlaylistToContent)private repo2:Repository<PlaylistToContent>
        ){}

    async createPlaylist(screenId: number,dto: CreatePlaylistDto,user: User){
        await this.deletePlaylist(screenId);
        dto.userId = user.id;
        dto.screenId = screenId;
        const playlist = this.repo.create(dto);
        return this.modifyPlaylist(await this.repo.save(playlist));
    }

    async findPlaylist(screenId:number, user: User){
        const playlistUnMod = await this.getPlaylist(screenId,user);
        return this.modifyPlaylist(playlistUnMod)
    }
    
    async deletePlaylist(screenId: number){
        return await this.repo.delete({screenId:screenId})
    }

    async changePlaylist(screenId: number, dto: UpdatePlaylistDto, user: User){
        console.log(dto);
        const playlist = await this.getPlaylist(screenId,user);
        if(!playlist)throw new UnprocessableEntityException('Playlist doesnt exist','Create a playlist first')
        if(dto.name) playlist.name = dto.name;
        if(dto.order) playlist.playlistToContent=this.changeOrder(dto.order,playlist.playlistToContent);
        if(dto.duration) playlist.playlistToContent=this.changeDuration(dto.duration,playlist.playlistToContent);
        if(dto.contentToAdd) playlist.playlistToContent.push(...this.addContent(dto.contentToAdd,playlist.playlistToContent.length,user,playlist.id));
        if(dto.contentToDelete) playlist.playlistToContent = this.deleteContent(dto.contentToDelete,playlist.playlistToContent)
        console.log(playlist);
        await this.repo.save(playlist)
        return await this.findPlaylist(screenId,user)
    }

    private changeOrder(newOrder:ContentPlace[],existingOrder:PlaylistToContent[]) {
        console.log(newOrder)
        const sorted = newOrder.sort((a,b)=>{
            return a.newOrder - b.newOrder
        });
        console.log(newOrder)
        sorted.forEach((content)=>{
            const exists = existingOrder.findIndex((c)=>c.order==content.currentOrder)
            if(exists>=0){
                let temp = existingOrder[content.newOrder-1]
                existingOrder[content.newOrder-1]=existingOrder[exists]
                existingOrder[exists]=temp;
                // let i: number;
                // for(i=content.newOrder;i<existingOrder.length;i++){
                //     if(i!=exists){existingOrder[i].order++;}
                // }
                
            }
        })
        console.log(existingOrder)
        this.synchOrder(existingOrder);
        console.log(existingOrder)
        return existingOrder;
    }
    
    private changeDuration(newDuration: ContentDuration[],existingDuration:PlaylistToContent[]){
        newDuration.forEach((i)=>{
            const exists = existingDuration.findIndex((c)=>c.contentId==i.contentId)
            if(exists>=0)existingDuration[exists].duration=i.duration;
        })
        return existingDuration;
    }

    private addContent(newContent: ContentToAdd[], length: number, user: User, playlistId:number){
        const arr: PlaylistToContent[] = [];
        let l: number;
        if(length == 0){l = 1}else{l = length}
        newContent.forEach((contToAdd)=>{
                const exists = user.contents.find((c)=>c.id==contToAdd.contentId)
            if(exists){
                const contentToAdd = new PlaylistToContent();
                contentToAdd.contentId = contToAdd.contentId;
                contentToAdd.playlistId = playlistId;
                contentToAdd.order = l;
                l++;
                if(contToAdd.duration) contentToAdd.duration = contToAdd.duration;
                
                arr.push(contentToAdd)
            }
        })
        return arr;
    }

    private deleteContent(contentToDelete: number[],contentList:PlaylistToContent[]){
        contentToDelete.forEach((c)=>{
            console.log('round')
            const exist = contentList.findIndex((content)=>content.order==c)
            console.log(exist)
            if(exist>=0){
                this.repo2.delete(contentList[exist].id)
                contentList.splice(exist,1);
                console.log(contentList)   
            }
        })
        this.synchOrder(contentList)
        return contentList;
    }

    private async getPlaylist(screenId: number,user: User){
        return await this.repo.createQueryBuilder('Playlist')
            .leftJoinAndSelect('Playlist.playlistToContent','playlistToContent')
            .leftJoinAndSelect('playlistToContent.content','content')
            .where('Playlist.screenId = :screenId',{screenId})
            .andWhere('Playlist.userId = :toFind',{toFind:user.id})
            .orderBy('playlistToContent.order','ASC')
            .getOne()
    }

    private modifyPlaylist(playlist: Playlist){
        const playlistMod = new PlaylistModified()
        playlistMod.name = playlist.name;
        
        if(playlist.playlistToContent){
            let arr = [];
            playlist.playlistToContent.forEach((ptc)=>{
            let i = new ContentList(ptc.content.name,ptc.content.url,ptc.duration,ptc.order)
            arr.push(i);  
        })
        playlistMod.content = arr;}
        
        return playlistMod;
    }

    private synchOrder(contentList: PlaylistToContent[]){
        let i: number;
        contentList[0].order = 1;
        for(i=0;i<contentList.length-1;i++){
            let correctOrder = contentList[i+1].order-contentList[i].order;
            if(correctOrder!=1){
                contentList[i+1].order = contentList[i].order+1;
            }
        }
    }

    
}