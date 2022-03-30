import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user.module/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)private userRep: Repository<User>,
        ){}

   async getUser(user):Promise<User>{
        let exist: User;
        try{
            exist = await this.getUserEntity(user);    
        }
        catch(err){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Couldnt find user ${user.email}`
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
        if(exist){
            return exist
        }else{
            const newUser = new User();
            newUser.email = user.email? user.email:user.nickname
            let created: User;
            try{
                created = await this.userRep.save(newUser);
            }catch(err){
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Couldnt create user ${newUser.email}`
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return created;
        }

   }

   async getUserEntity(user){
       if(user.email){
            return await this.userRep.findOne({
                relations:['events','screens','contents'],
                where:{
                    email:user.email
                }
            })
        }
        else{
            return await this.userRep.findOne({
                relations:['events','screens','contents'],
                where:{
                    email:user.nickname
                }
            })
        }
       
   }
}