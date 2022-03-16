import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StorageService } from "src/storage/storage.service";
import { User } from "src/user.module/user.entity";
import { Repository } from "typeorm";
import { Content } from "./content.entity";
import { CreateContentDto } from "./dto/create.content.dto";
import probe = require('probe-image-size');
import ffprobe = require('ffprobe')

@Injectable()
export class ContentService{
    constructor(
        @InjectRepository(Content) private repo: Repository<Content>,
        private storage: StorageService
        ){}

    async createContent (file: Express.Multer.File, user:User, dto: CreateContentDto){
        console.log(file)
        const newContent = this.repo.create({name:dto.name,userId:user.id})
        const created = await this.repo.save(newContent);
        const uploaded = await this.storage.uploadFile(file.buffer,user.id,created.id)
        if(uploaded){
            created.url = `${user.id}/${created.id}`
            await this.repo.save(created);
        }
        return await this.repo.findOne(created.id)
    }

    async getContent(user:User){
        return await this.repo.find({
            where:{userId:user.id}
        })
    }

    async deleteContent(contentId: number, user:User){
        const content = await this.repo.findOne({where:{
            id:contentId,
            userId:user.id
        }})
        await this.storage.deleteFile(content.url)
        return await this.repo.delete(content);
    }
}