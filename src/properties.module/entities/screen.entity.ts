
import { User } from "src/user.module/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { Playlist } from "./playlist.entity";

@Entity()
export class Screen{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 20})
    name: string;

    @Column({nullable:true})
    userId:number;

    @Column({nullable:true})
    eventId:number;

    @ManyToOne(()=>User, user=>user.screens,{onDelete:'CASCADE'})
    user: User;

    @ManyToOne(()=>Event,event=>event.screens,{onDelete:'SET NULL'})
    event: Event

    @OneToOne(()=>Playlist,playlist => playlist.screen,{cascade:true,onDelete:'SET NULL'})
    playlist: Playlist;
}