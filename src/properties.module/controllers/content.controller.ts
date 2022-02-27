import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtGuard } from "src/guards/jwt.guard";
import { CreateContentDto } from "../dto/create.content.dto";
import { UpdateContentDto } from "../dto/update.content.dto";
import { Content } from "../entities/content.entity";
import { ContentService } from "../services/content.service";

@Crud({
    model:{
        type:Content
    },
    dto:{
        create: CreateContentDto,
        update: UpdateContentDto,
    },

})
@CrudAuth({
    property:'user',
    filter:(user)=>({userId:user.id}),
    persist:(user)=>({userId:user.id})
})
@ApiTags('Working with content base')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('content')
export class ContentController implements CrudController<Content>{
    constructor(public service: ContentService){}
}