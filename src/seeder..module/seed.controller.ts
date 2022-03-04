import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeedService } from "./seed.service";

@ApiTags('Seed database with random data')
@Controller('seed')
export class SeedController{
    constructor(private seedService: SeedService){}

    @Post()
    async seed(){
        return await this.seedService.SeedDataBase()
    }
    
}