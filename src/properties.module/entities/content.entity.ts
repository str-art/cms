import { User } from "src/user.module/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";
import { PlaylistToContent } from "./playlistToContent.entity";


@Entity()
export class Content{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 150})
    url: string;

    @Column({nullable:true})
    name: string;

    @Column({nullable:true,select:false})
    userId: number;

    @ManyToOne(()=>User, user =>user.contents,{onDelete:'CASCADE'})
    user: User;

    @OneToMany(()=>PlaylistToContent,playlistToContent => playlistToContent.content,{onDelete:'SET NULL'})
    playlistToContent: PlaylistToContent[];

    
}