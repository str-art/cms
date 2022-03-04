import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtGuard } from "src/auth.module/guards/jwt.guard";
import { CreateEventDto } from "../event.module/dto/create.event.dto";
import { UpdateEventDto } from "../event.module/dto/update.event.dto";
import { Event } from "../event.module/event.entity";
import { EventService } from "../event.module/event.service";


@Crud({
    model: {
        type: Event
    },
    dto:{
        create: CreateEventDto,
        update: UpdateEventDto
    }
})
@CrudAuth({
    property: 'user',
    filter: (user) => ({
        userId: user.id
    }),
    persist: (user)=>({userId: user.id})
})
@ApiTags('Working with events')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('event')
export class EventController implements CrudController<Event>{
    constructor(public service: EventService){}
}