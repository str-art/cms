import { Injectable } from "@nestjs/common";
import { PlaylistService } from "src/properties.module/services/playlist.service";
import { CreateUserDto } from "src/user.module/user.dto/createUser.dto";
import { UserService } from "src/user.module/user.service";
import { faker } from "@faker-js/faker"
import { CreateEventDto } from "src/properties.module/dto/create.event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "src/properties.module/entities/event.entity";
import { CreateScreenDto } from "src/properties.module/dto/create.screen.dto";
import { Screen } from "src/properties.module/entities/screen.entity";
import { CreateContentDto } from "src/properties.module/dto/create.content.dto";
import { Content } from "src/properties.module/entities/content.entity";
import { CreatePlaylistDto } from "src/properties.module/dto/create.playlist.dto";
import { ContentToAdd, UpdatePlaylistDto } from "src/properties.module/dto/update.playlist.dto";

@Injectable()
export class SeedService{
    constructor(
        private userService: UserService,
        @InjectRepository(Content) private contentRepo: Repository<Content>,
        @InjectRepository(Screen) private screenRepo: Repository<Screen>,
        private playlistService: PlaylistService,
        @InjectRepository(Event) private eventRepo: Repository<Event>,
    ){}

    async SeedDataBase(){
        let uDto = new CreateUserDto();
        let eDto = new CreateEventDto();
        let sDto = new CreateScreenDto();
        let cDto = new CreateContentDto();
        let pDto = new CreatePlaylistDto();
        let upPDto = new UpdatePlaylistDto();
        
        let y: number;
        for(y=0;y<30;y++){uDto.email = faker.internet.email();
            uDto.password = faker.internet.password();
            let b = await this.userService.registerUser(uDto);
            let user = await this.userService.getUserById(b.user.id)
            let contentList:ContentToAdd[] = [];
            
            let i: number;
            for(i = 0; i<5; i++){
                eDto.name = faker.lorem.word();
                eDto.userId = user.id;
                await this.eventRepo.insert(eDto);
                let event = await this.eventRepo.findOne({
                    where:{
                        name: eDto.name
                    }
                })
    
                let l: number;
                let j: number;
                for(j=0;j<6;j++){
                    cDto.name = faker.word.noun();
                    cDto.userId = user.id;
                    cDto.url = faker.image.abstract();
                    await this.contentRepo.insert(cDto);
                    let content = await this.contentRepo.findOne({
                        where: {name: cDto.name}
                    })
                    
                    let a = new ContentToAdd();
                        a.contentId = content.id;
                        a.duration = 5000;
                        contentList.push(a);
                }
                for(l = 0; l<4; l++){
                    sDto.eventId = event.id;
                    sDto.userId = user.id;
                    sDto.name = faker.word.noun();
                    await this.screenRepo.insert(sDto);
                    let screen = await this.screenRepo.findOne({
                        where: {
                            name: sDto.name
                        }
                    })
                    let user2 = await this.userService.getUserById(b.user.id)
                    pDto.name = faker.word.adjective();
                    pDto.screenId = screen.id;
                    await this.playlistService.createPlaylist(screen.id,pDto,user2)
                    upPDto.contentToAdd = contentList;
                    await this.playlistService.changePlaylist(screen.id,upPDto,user2)
                    }
                }
            }
        
        } 
}