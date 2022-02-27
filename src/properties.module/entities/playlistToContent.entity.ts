import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./content.entity";
import { Playlist } from "./playlist.entity";

@Entity()
export class PlaylistToContent{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({select:false,nullable:true})
    playlistId: number;

    @Column({select:false,nullable:true})
    contentId: number;

    @Column({nullable:true})
    order: number;

    @Column({nullable:true})
    duration: number;

    @ManyToOne(()=>Playlist, playlist=>playlist.playlistToContent,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    playlist: Playlist;

    @ManyToOne(()=>Content,content=>content.playlistToContent,{onDelete:'CASCADE',onUpdate:'CASCADE',cascade:['update'],eager:true})
    content: Content;

}