import { ApiHideProperty } from "@nestjs/swagger";
import { Content } from "src/content.module/content.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ApiHideProperty()
    @ManyToOne(()=>Playlist, playlist=>playlist.playlistToContent,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    playlist: Playlist;

    @ApiHideProperty()
    @ManyToOne(()=>Content,content=>content.playlistToContent,{onDelete:'CASCADE',onUpdate:'CASCADE',cascade:['update'],eager:true})
    content: Content;

}