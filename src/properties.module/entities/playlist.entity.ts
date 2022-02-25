import { User } from "src/user.module/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./content.entity";
import { Screen } from "./screen.entity";

@Entity()
export class Playlist{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 20})
    name: string;

    @ManyToOne(()=>User, user=>user.playlists)
    user: User;

    @OneToOne(()=>Screen, screen=>screen.playlist)
    screen: Screen;

    @ManyToMany(()=>Content, content=>content.id)
    @JoinTable()
    contents: Content[];
}