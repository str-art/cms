import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/user.module/user.dto/createUser.dto";
import { User } from "src/user.module/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)private userRep: Repository<User>,
        ){}

   async getUser(user):Promise<User>{
        const existingUser = await this.getUserByEmail(user.email);
        if(existingUser){return existingUser}
        const newUser = this.userRep.create({email:user.email})
        await this.userRep.save(newUser);

        return await this.getUserByEmail(newUser.email)
   }

   async getUserByEmail(email:string){
       return await this.userRep.findOne({
           relations:['events','screens','contents'],
           where:{
               email:email
           }
       }
       )
   }
}