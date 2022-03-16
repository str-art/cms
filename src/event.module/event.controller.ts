import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { CreateEventDto } from "./dto/create.event.dto";
import { UpdateEventDto } from "./dto/update.event.dto";
import { Event } from "./event.entity";
import { EventService } from "./event.service";


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
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('event')
export class EventController implements CrudController<Event>{
    constructor(public service: EventService){}
}