import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtGuard } from "src/auth.module/guards/jwt.guard";
import { CreateScreenDto } from "./dto/create.screen.dto";
import { UpdateScreenDto } from "./dto/update.screen.dto";
import { Screen } from "./screen.entity";
import { ScreenService } from "./screen.service";

@Crud({
    model:{
        type:Screen
    },
    dto:{
        create: CreateScreenDto,
        update: UpdateScreenDto
    }
})

@CrudAuth({
    property:'user',
    filter:(user)=>({userId:user.id}),
    persist:(user)=>({userId:user.id})
})

@ApiTags('Working with screens')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('screen')
export class ScreenController implements CrudController<Screen>{
    constructor(public service: ScreenService){}
}