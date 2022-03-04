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
        private jwtService: JwtService
        ){}

    async validateUser(email: string, pass: string){
        const user = await this.userRep.findOne({
            where:{email:email},
            select:['id','email','password','contents','screens','playlists','events']
        })
        console.log(user);
        if(user && user.password === pass){
            const {password, ...validatedUser} = user;
            return validatedUser;
        }
        return null;
    }

    async registerUser(dto: CreateUserDto){
        const emailTaken = await this.userRep.count({where:{email:dto.email}});
        if(emailTaken!=0){throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'This email is already in use'
        }, HttpStatus.CONFLICT)}
        
        const newUser = await this.createUser(dto)
        return this.loginUser(newUser)
    }

    loginUser(user: User){
        const {password, ...userToLogin} = user;
        const payload = {sub: userToLogin.id, username: userToLogin.email}
        return {
            user: userToLogin,
            access_token: this.jwtService.sign(payload)
        }
    }
    async getUserById(userId: number){
        return await this.userRep.findOne({
            join:{
                alias: "user",
                leftJoinAndSelect:{
                    event: 'user.events',
                    content:"user.contents",
                    playlist:"user.playlists",
                    screens:"user.screens"
                    
                }
            },
            where:{id:userId},
            
        })
    }

    private async createUser(dto: CreateUserDto){
        const newUser = this.userRep.create(dto);
        return await this.userRep.save(newUser)
    }
}