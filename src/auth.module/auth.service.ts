import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user.module/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)private userRep: Repository<User>,
        ){}

   async getUser(user):Promise<User>{
        const exist = await this.getUserByEmail(user);
        if(exist){
            return exist
        }else{
            const newUser = new User();
            newUser.email = user.email? user.email:user.nickname
            const created = await this.userRep.save(newUser)
            return created;
        }

   }

   async getUserByEmail(user){
       return await this.userRep.findOne({
           relations:['events','screens','contents'],
           where:{
               email:In([user.email,user.nickname])
           }
       }
       )
   }
}