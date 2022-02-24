

import { Content } from 'src/properties.module/entities/content.entity';
import { Event } from 'src/properties.module/entities/event.entity';
import { Playlist } from 'src/properties.module/entities/playlist.entity';
import { Screen } from 'src/properties.module/entities/screen.entity';
import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({unique: true, length: 30, nullable: false})
    email: string;

    @Column({select: false, nullable: false})
    password?: string;

    @OneToMany(()=>Event, event=>event.user)
    events: Event[];

    @OneToMany(()=>Screen, screen=>screen.user)
    screens: Screen[];

    @OneToMany(()=>Content, content=>content.user)
    contents: Content[];

    @OneToMany(()=>Playlist, playlist=>playlist.user)
    playlists: Playlist[];

    

}