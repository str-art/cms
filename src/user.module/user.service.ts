import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto/createUser.dto";
import { UpdateUserDto } from "./user.dto/update.user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)private userRep: Repository<User>,
        ){}

        async deleteUser(user: User){
            return await this.userRep.delete(user)
        }

       


        

}