import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user.module/user.dto/createUser.dto";
import { UserService } from "src/user.module/user.service";
import { faker } from "@faker-js/faker"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Content } from "src/content.module/content.entity";
import { PlaylistService } from "src/playlist.module/playlist.service";
import { Screen } from "src/screen.module/screen.entity";
import { CreateEventDto } from "src/event.module/dto/create.event.dto";
import { CreateScreenDto } from "src/screen.module/dto/create.screen.dto";
import { CreateContentDto } from "src/content.module/dto/create.content.dto";
import { CreatePlaylistDto } from "src/playlist.module/dto/create.playlist.dto";
import { ContentToAdd, UpdatePlaylistDto } from "src/playlist.module/dto/update.playlist.dto";
import { AuthService } from "src/auth.module/auth.service";
import { Event } from "src/event.module/event.entity";

@Injectable()
export class SeedService{
    constructor(
        private userService: UserService,
        @InjectRepository(Content) private contentRepo: Repository<Content>,
        @InjectRepository(Screen) private screenRepo: Repository<Screen>,
        private playlistService: PlaylistService,
        private authService: AuthService,
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
            let b = await this.authService.registerUser(uDto);
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
                    let user2 = await this.authService.getUserById(b.user.id)
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