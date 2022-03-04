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
        private jwtService: JwtService,
        ){}


        

        async updateUser(dto: UpdateUserDto, user: User){
            if(await this.checkEmail(dto.email)){
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    error: 'This email is already in use'
                }, HttpStatus.CONFLICT)
            }
            if(dto.password){
                await this.userRep.update(user.id,{password:dto.password})    
            }
            if(dto.email){
                await this.userRep.update(user.id,{email:dto.email})
            }
            return this.loginUser(await this.getUserById(user.id));
        }

        async deleteUser(user: User){
            return await this.userRep.delete(user)
        }

        async getUserById(userId: number){
            return await this.userRep.findOne({
                where:{id:userId},
            })
        }

        private loginUser(user: User){
            const {password, ...userToLogin} = user;
            const payload = {sub: userToLogin.id, username: userToLogin.email}
            return {
                user: userToLogin,
                access_token: this.jwtService.sign(payload)
            }
        }

        private async checkEmail(email: string): Promise<Boolean>{
            const emailTaken = await this.userRep.count({
                where:{email:email}
            })

            if(emailTaken) {return true}
            else {return false}   
        }

        

}