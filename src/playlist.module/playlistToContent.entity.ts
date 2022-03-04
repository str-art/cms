import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { Content } from "../content.module/content.entity";
import { Playlist } from "./playlist.entity";

@Entity()
@Tree('closure-table')
export class PlaylistToContent{
    @ApiProperty({description:"Id of jointable entity. Used to change content order or to delete content from playlist"})
    @PrimaryGeneratedColumn()
    id: number;

    @Column({select:false,nullable:true})
    playlistId: number;

    @Column({select:false,nullable:true})
    contentId: number;

    @Column({nullable:true})
    duration: number;

    @ApiHideProperty()
    @ManyToOne(()=>Playlist, playlist=>playlist.playlistToContent,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    playlist: Playlist;

    @ApiHideProperty()
    @ManyToOne(()=>Content,content=>content.playlistToContent,{onDelete:'CASCADE',onUpdate:'CASCADE',cascade:['update'],eager:true})
    content: Content;

    @TreeChildren({cascade:['insert']})
    children: PlaylistToContent[];

    @TreeParent({onDelete:'SET NULL'})
    parent: PlaylistToContent;

}