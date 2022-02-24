import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtGuard } from "src/guards/jwt.guard";
import { User } from "src/user.module/user.entity";
import { CreateEventDto } from "../dto/create.event.dto";
import { Event } from "../entities/event.entity";
import { EventService } from "../services/event.service";


@Crud({
    model: {
        type: Event
    },
    dto:{
        create: CreateEventDto,
        update: CreateEventDto
    }
})
@CrudAuth({
    property: 'user',
    filter: (event) => ({
        user: event
    }),
    persist: (user)=>({user: user.id})
})

@UseGuards(JwtGuard)
@Controller('event')
export class EventController implements CrudController<Event>{
    constructor(public service: EventService){}
}