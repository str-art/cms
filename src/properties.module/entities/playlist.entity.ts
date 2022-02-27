import { User } from "src/user.module/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./content.entity";
import { PlaylistToContent } from "./playlistToContent.entity";
import { Screen } from "./screen.entity";

@Entity()
export class Playlist{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    userId: number;

    @Column({nullable:true})
    screenId: number;

    @ManyToOne(()=>User, user=>user.playlists,{onDelete:'CASCADE'})
    user: User;

    @OneToOne(()=>Screen, screen=>screen.playlist,{onDelete:'CASCADE'})
    @JoinColumn()
    screen: Screen;

    @OneToMany(()=>PlaylistToContent,playlistToContent=>playlistToContent.playlist,{onDelete:'SET NULL',cascade:true,eager:true})
    playlistToContent: PlaylistToContent[];
}