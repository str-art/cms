import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { join } from "path/posix";
import { User } from "src/user.module/user.entity";
import { DeleteResult, Repository, TreeRepository } from "typeorm";
import { CreatePlaylistDto} from "./dto/create.playlist.dto";
import { CreatePlaylistToCcontentDto } from "./dto/create.playlstToContent.dto";
import { ContentDuration, ContentPlace, ContentToAdd, UpdatePlaylistDto } from "./dto/update.playlist.dto";
import { Playlist } from "./playlist.entity";
import { PlaylistToContent } from "./playlistToContent.entity";



@Injectable()
export class PlaylistService{
    constructor(
        @InjectRepository(Playlist)private repo:Repository<Playlist>,
        @InjectRepository(PlaylistToContent)private repo2:TreeRepository<PlaylistToContent>
        ){}

   /* async createPlaylist(screenId: number,dto: CreatePlaylistDto,user: User){
        await this.deletePlaylist(screenId);
        dto.userId = user.id;
        dto.screenId = screenId;
        const {contentToAdd,...newPlayList} = dto
        const created = this.repo.create(newPlayList);
        const save = await this.repo.save(created)
        if(contentToAdd){
            await this.addContent(contentToAdd,user,save.id)
        }
        return await this.findPlaylist(screenId,user)
    }

    async findPlaylist(screenId:number, user: User){
        const playlistUnMod = await this.repo.findOne({
            relations:['playlistToContent'],
            where:{screenId:screenId,userId:user.id}
        });
        const start = await this.repo2.findOne({
            where:{
                playlistId:playlistUnMod.id,
                parent: null,
            }
        })
        const content = await this.repo2.findDescendants(start,{relations:['content']})
        return {name:playlistUnMod.name,content:content};
    }
    
    async deletePlaylist(screenId: number){
        return await this.repo.delete({screenId:screenId})
    }

    async changePlaylist(screenId: number, dto: UpdatePlaylistDto, user: User){
        const playlistToChange = await this.repo.findOne({where:{screenId:screenId}})
        if(!playlistToChange){
            throw new HttpException({
                status:HttpStatus.UNPROCESSABLE_ENTITY,
                message:'Create a playlist first'
            },HttpStatus.UNPROCESSABLE_ENTITY)
        }
        if(dto.name)await this.repo.update(playlistToChange,{name:dto.name});
        if(dto.duration) this.changeDuration(dto.duration);
        if(dto.contentToAdd) await this.addContent(dto.contentToAdd,user,playlistToChange.id);
        if(dto.order) await this.changeOrder(dto.order,playlistToChange.id);
        if(dto.contentToDelete) this.deleteContent(dto.contentToDelete);
        return await this.findPlaylist(screenId,user);
    }

    private async changeOrder(newOrder:ContentPlace[],playlistId:number) {
        newOrder.forEach(async(c)=>{
            if(c.goesAfter){
                const newParent = await this.repo2.findOne(c.goesAfter);
                const entity = await this.repo2.findOne(c.playlistToContentId);
                if(!newParent || !entity){
                    throw new HttpException({
                        status:HttpStatus.UNPROCESSABLE_ENTITY,
                        message:`Entity ${c.goesAfter} or ${c.playlistToContentId} doesnt exist. Check if youve chosen right ids`
                    },HttpStatus.UNPROCESSABLE_ENTITY)
                }
                entity.children = newParent.children;
                newParent.children = entity;
                await this.repo2.save([newParent,entity,entity.children]);
            } else {
                const root = await this.repo2.findOne({where:{playlistId:playlistId,children:null}})
                const entity = await this.repo2.findOne(c.playlistToContentId);
                if(!root){
                    throw new HttpException({
                        status:HttpStatus.UNPROCESSABLE_ENTITY,
                        message:`Cant find content in playlist wth id ${playlistId}. Check if youve mentioned right playlist id`
                    },HttpStatus.UNPROCESSABLE_ENTITY)
                }
                if(!entity){
                    throw new HttpException({
                        status:HttpStatus.UNPROCESSABLE_ENTITY,
                        message:`Cant change order of ${c.playlistToContentId}. Check if this entity exists on playlist ${playlistId}`
                    },HttpStatus.UNPROCESSABLE_ENTITY)
                }
                entity.parent.children = entity.children;
                entity.children.parent=entity.parent;
                root.children = entity;
                entity.children = null;
                await this.repo2.save([entity.parent,entity.children,entity,root])
            }
        })

    }
    
    private changeDuration(newDuration: ContentDuration[]){
        newDuration.forEach(async (d)=>{
            await this.repo2.update(d.playlistToContentId,{duration:d.duration})
        })
    }

    private async addContent(newContent: ContentToAdd[], user: User, playlistId:number){
        newContent.forEach(async (contToAdd)=> {
            if(!user.contents.find((c)=>c.id==contToAdd.contentId)){
                throw new HttpException({
                    status:HttpStatus.FORBIDDEN,
                    message:`You dont have access to ${contToAdd.contentId}`
                },HttpStatus.FORBIDDEN)
            }
            if(contToAdd.goesAfter){
               let newRelation = new CreatePlaylistToCcontentDto();
               newRelation.contentId = contToAdd.contentId;
               newRelation.playlistId = playlistId;
               if(contToAdd.duration){
                   newRelation.duration = contToAdd.duration
               }
               const newNode = this.repo2.create(newRelation)
               const parent = await this.repo2.findOne({
                   where:{
                    contentId:contToAdd.goesAfter,
                    playlistId: playlistId
                    }
                })
                if(!parent){
                    throw new HttpException({
                        status:HttpStatus.UNPROCESSABLE_ENTITY,
                        message:`Cant find entity ${contToAdd.goesAfter}. Check if youve mentioned it right. `
                    },HttpStatus.UNPROCESSABLE_ENTITY)
                }
                if(parent.children){
                    const oldChild = parent.children;
                    const newChild = await this.repo2.save(newNode);
                    await this.repo2.update(parent,{children:newChild});
                    await this.repo2.update(oldChild,{parent:newChild});
                }else{
                    const newChild = await this.repo2.save(newNode)
                    await this.repo2.update(parent,{children:newChild})
                }
                
            } else {
                const root = await this.repo2.findOne({
                    where:{
                        playlistId:playlistId,
                    }
                }); 
                if(!root){
                    let newRelation = new CreatePlaylistToCcontentDto();
                    newRelation.contentId = contToAdd.contentId;
                    newRelation.playlistId = playlistId;
                    if(contToAdd.duration){
                        newRelation.duration = contToAdd.duration
                    }
                    const newNode = this.repo2.create(newRelation);
                    await this.repo2.save(newNode)
                } else {
                    let newRelation = new CreatePlaylistToCcontentDto();
                    newRelation.contentId = contToAdd.contentId;
                    newRelation.playlistId = playlistId;
                    if(contToAdd.duration){
                        newRelation.duration = contToAdd.duration
                    }
                    const newNode = this.repo2.create(newRelation);
                    const saved = await this.repo2.save(newNode);
                    await this.repo2.update(root,{children:saved});
                }
                
            }
        })
    }

    private deleteContent(contentToDelete: number[]){
        
        contentToDelete.forEach(async(c)=>{
            try{
                const enetityToDelete = await this.repo2.findOne(c);
                if(enetityToDelete.children && enetityToDelete.parent){
                    await this.repo2.delete(enetityToDelete);
                    await this.repo2.update(enetityToDelete.parent,{children:enetityToDelete.children});
                if(!enetityToDelete.parent){
                    await this.repo2.delete(enetityToDelete);
                }
                }}
            catch(err){
                throw new HttpException({
                    status:HttpStatus.UNPROCESSABLE_ENTITY,
                    message:`Cant delete ${c}, check if ${c} exists on current playlist`
                },HttpStatus.UNPROCESSABLE_ENTITY)
            }
        })
    }
*/
    
}