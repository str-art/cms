import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth.module/auth.service";
import { ContentService } from "src/content.module/content.service";
import { EventService } from "src/event.module/event.service";
import { PlaylistService } from "src/playlist.module/playlist.service";
import { ScreenService } from "src/screen.module/screen.service";
import { CreateUserDto } from "src/user.module/user.dto/createUser.dto";
import { UserService } from "src/user.module/user.service";
import { faker } from "@faker-js/faker"
import { CreateEventDto } from "src/event.module/dto/create.event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/event.module/event.entity";
import { Repository } from "typeorm";
import { CreateScreenDto } from "src/screen.module/dto/create.screen.dto";
import { Screen } from "src/screen.module/screen.entity";
import { Content } from "src/content.module/content.entity";
import { CreateContentDto } from "src/content.module/dto/create.content.dto";
import { CreatePlaylistNodeDto } from "src/playlist.module/dto/create.playlistNode.dto";

@Injectable()
export class SeedService{
    constructor(
        private authService: AuthService,
        @InjectRepository(Event)private eventRepo: Repository<Event>,
        @InjectRepository(Screen)private screenRepo: Repository<Screen>,
        private playlistService: PlaylistService,
        @InjectRepository(Content)private contentRepo: Repository<Content>
    ){}

    async seed(){
        let y:number;
        for(y=0;y<30;y++){
            let uDto = new CreateUserDto();
            uDto.email = faker.internet.email();
            uDto.password = faker.internet.password()
            const registredUser = await this.authService.getUser(uDto.email);
            let i:number;
            for(i=0;i<4;i++){
                let eDto = new CreateEventDto();
                eDto.name = faker.word.noun();
                eDto.userId = registredUser.id;
                let eventEntity = this.eventRepo.create(eDto);
                const event = await this.eventRepo.save(eventEntity);
                let k:number;
                for(k=0;k<4;k++){
                    let sDto = new CreateScreenDto();
                    sDto.eventId = event.id;
                    sDto.userId = registredUser.id;
                    sDto.name = faker.word.adjective();
                    const newScreen = this.screenRepo.create(sDto);
                    const screen = await this.screenRepo.save(newScreen);
                    let j:number;
                    for(j=0;j<4;j++){
                        let cDto = new CreateContentDto();
                        cDto.userId = registredUser.id;
                        cDto.name = faker.word.adverb();
                        const newContent = this.contentRepo.create(cDto);
                        const content = await this.contentRepo.save(newContent);
                        let PlaylistNode = new CreatePlaylistNodeDto();
                        PlaylistNode.contentId = content.id;
                        await this.playlistService.createNode(screen.id,registredUser,PlaylistNode)
                    }
                }
            }
        }  
    }
}