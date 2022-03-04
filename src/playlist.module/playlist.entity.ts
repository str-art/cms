import { ApiHideProperty } from "@nestjs/swagger";
import { Screen } from "src/screen.module/screen.entity";
import { User } from "src/user.module/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistToContent } from "./playlistToContent.entity";


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

    @ApiHideProperty()
    @ManyToOne(()=>User, user=>user.playlists,{onDelete:'CASCADE'})
    user: User;

    @ApiHideProperty()
    @OneToOne(()=>Screen, screen=>screen.playlist,{onDelete:'CASCADE'})
    @JoinColumn()
    screen: Screen;

    @OneToMany(()=>PlaylistToContent,playlistToContent=>playlistToContent.playlist,{onDelete:'SET NULL',cascade:true,eager:true})
    playlistToContent: PlaylistToContent[];
}