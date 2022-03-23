import { Inject, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StorageService } from "src/storage/storage.service";
import { User } from "src/user.module/user.entity";
import { Repository } from "typeorm";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create.content.dto";
import { File } from "./file.entity";

@Injectable()
export class ContentService{
    constructor(
        @InjectRepository(Content) private repo: Repository<Content>,
        @InjectRepository(File) private repoFile: Repository<File>,
        private storage: StorageService,
        ){}

    async createContent (file: Express.Multer.File, user:User, dto: CreateContentDto){
        dto.userId = user.id;
        
        const newContent = await this.repo.save({
            name:dto.name,
            userId:user.id,
        });
        const newFile = await this.repoFile.save({
            width:dto.width,
            height:dto.height,
            contentId:newContent.id,
            contentType: file.mimetype,
            orientation:dto.orientation
        })
        await this.storage.uploadFile(file.buffer,newContent.id,newFile.id);
        return await this.repo.findOne(newContent.id)
    }

    async getContent(user:User){
        return await this.repo.find({
            where:{userId:user.id},
            relations:['files']
        })
    }

    async getOneContent(user:User,contentId:number){
        return await this.repo.findOne({
            relations:['files'],
            where:{
                id:contentId,
                userId:user.id
            },
            
        })
    }

    async getFile(contentId: number, fileId: number){
        const { key, contentType} = await this.repoFile.findOne({
            where:{
                id:fileId,
                contentId: contentId
            }
        })
        const { Body } = await this.storage.download(key)
        return {Body,contentType}
    }

    async addFile(file:Express.Multer.File,contentId:number,dto: CreateContentDto,user:User){
        const newFile = await this.repoFile.save({
            width:dto.width,
            height:dto.height,
            contentId:contentId,
            contentType:file.mimetype,
            orientation:dto.orientation
        })
        await this.storage.uploadFile(file.buffer,contentId,newFile.id)
        return await this.getOneContent(user,contentId)
    }

    async deleteContent(contentId: number, user:User){
        const content = await this.repo.findOne({
            where:{
                id:contentId,
                userId:user.id
                }
            })
            content.files.forEach((f)=>{
                this.repoFile.remove(f)
            })
        return await this.repo.remove(content);
    }

    async deleteFile(contentId:number, fileId: number){
        const file = await this.repoFile.findOne({
            where:{
                contentId:contentId,
                id:fileId
            }
        })
        return await this.repoFile.remove(file)
    }
}