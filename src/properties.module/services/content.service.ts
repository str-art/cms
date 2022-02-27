import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Content } from "../entities/content.entity";

@Injectable()
export class ContentService extends TypeOrmCrudService<Content>{
    constructor(@InjectRepository(Content) repo){
        super(repo)
    }
}