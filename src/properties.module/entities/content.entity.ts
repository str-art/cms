import { User } from "src/user.module/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";

@Entity()
export class Content{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 150})
    url: string;

    @ManyToOne(()=>User, user =>user.contents)
    user: User;

    @ManyToMany(()=>Playlist, playlist => playlist.contents)
    playlists: Playlist[];
}