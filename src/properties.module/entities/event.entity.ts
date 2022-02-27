import { User } from "src/user.module/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Screen } from "./screen.entity";

@Entity()
export class Event{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 40,nullable:true})
    name: string;

    @ManyToOne(()=>User, user =>user.events,{onDelete:'CASCADE'})
    user: User;

    @Column({nullable: true})
    userId: number;
    
    @OneToMany(()=>Screen, screen=>screen.event,{onDelete:'SET NULL'})
    @JoinColumn()
    screens:Screen[];

}