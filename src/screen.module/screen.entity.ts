
import { ApiHideProperty } from "@nestjs/swagger";
import { User } from "src/user.module/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../event.module/event.entity";
import {PlaylistNode } from "../playlist.module/playlist.entity";

export type ScreenOrientation = 'portrait'|'landscape'

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

    @ApiHideProperty()
    @ManyToOne(()=>User, user=>user.screens,{onDelete:'CASCADE'})
    user: User;

    @ApiHideProperty()
    @ManyToOne(()=>Event,event=>event.screens,{onDelete:'SET NULL'})
    event: Event

    @ApiHideProperty()
    @OneToOne(()=>PlaylistNode,playlist => playlist.screen,{cascade:true,onDelete:'SET NULL'})
    playlist: PlaylistNode[];

    @Column({default: 1080,nullable:false})
    width:number;

    @Column({default: 1920, nullable: false})
    height: number;

    @Column({
        type:'enum',
        enum:['portrait','landscape'],
        default:'portrait'
    })
    orientation: ScreenOrientation
}