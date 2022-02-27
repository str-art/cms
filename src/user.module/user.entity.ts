

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Content } from 'src/properties.module/entities/content.entity';
import { Event } from 'src/properties.module/entities/event.entity';
import { Playlist } from 'src/properties.module/entities/playlist.entity';
import { Screen } from 'src/properties.module/entities/screen.entity';
import { Entity, Column, Index, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class User{
    @ApiProperty({name:'id',description:'User id'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({name:'email',description:'User email'})
    @Index()
    @Column({unique: true, length: 30, nullable: false})
    email: string;

    @ApiHideProperty()
    @Column({select: false, nullable: false})
    password?: string;

    @OneToMany(()=>Event, event=>event.user,{cascade:['remove'],onDelete:'SET NULL'})
    events: Event[];

    @OneToMany(()=>Screen, screen=>screen.user,{cascade:['remove'],onDelete:'SET NULL'})
    screens: Screen[];

    @OneToMany(()=>Content, content=>content.user,{cascade:['remove'],onDelete:'SET NULL'})
    contents: Content[];

    @OneToMany(()=>Playlist, playlist=>playlist.user,{cascade:['remove'],onDelete:'SET NULL'})
    playlists: Playlist[];
}

