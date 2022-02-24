
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

    @ManyToOne(()=>User, user=>user.screens)
    user: User;

    @ManyToOne(()=>Event,event=>event.screens)
    event: Event

    @OneToOne(()=>Playlist,playlist => playlist.screen)
    @JoinColumn()
    playlist: Playlist;
}