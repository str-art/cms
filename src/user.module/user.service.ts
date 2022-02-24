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


        async validateUser(email: string, pass: string){
            const user = await this.userRep.createQueryBuilder('User')
                .addSelect('User.password')
                .where('email = :toFind',{toFind: email})
                .getOne()
            
            if(user && user.password === pass){
                const {password, ...validatedUser} = user;
                return validatedUser;
            }
            return null;
        }

        async registerUser(dto: CreateUserDto){
            const emailTaken = await this.checkEmail(dto.email);
            if(emailTaken){throw new HttpException({
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

        async updateUser(dto: UpdateUserDto, user: User){
            if(dto.email && !this.checkEmail(dto.email)){
                await this.userRep.createQueryBuilder('User')
                    .update()
                    .set({
                        email: dto.email
                    })
                    .where('id = :toFind',{toFind: user.id})
                    .execute()
                
            }

            if(dto.password){
                await this.userRep.createQueryBuilder('User')
                        .update()
                        .set({password: dto.password})
                        .where('id = :toFind', {toFind: user.id})
                        .execute()      
            }
            return this.loginUser(await this.getUserById(user.id));
        }

        async deleteUser(user: User){
            return await this.userRep.delete(user)
        }

        async getUserById(userId: number){
            return await this.userRep.createQueryBuilder('user')
                    .where('user.id = :toFind', {toFind: userId})
                    .leftJoinAndSelect('user.events','event')
                    .leftJoinAndSelect('user.screens','screen')
                    .leftJoinAndSelect('user.playlists','playlist')
                    .leftJoinAndSelect('user.contents','contents')
                    .getOne()
        }

        private async createUser(dto: CreateUserDto){
            const newUser = this.userRep.create(dto);
            return await this.userRep.save(newUser)
        }

        private async checkEmail(email: string): Promise<Boolean>{
            const emailTaken = await this.userRep.createQueryBuilder('user')
                .select('email')
                .where('email = :emailToFind', {emailToFind: email})
                .getCount()

            if(emailTaken) {return true}
            else {return false}   
        }

        

}