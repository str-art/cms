import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Screen } from "./screen.entity";

@Injectable()
export class ScreenService extends TypeOrmCrudService<Screen>{
    constructor(@InjectRepository(Screen) repo){
        super(repo)
    }
}