import { ApiHideProperty } from "@nestjs/swagger";
import { Content } from "src/content.module/content.entity";
import { Screen } from "src/screen.module/screen.entity";
import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class PlaylistNode{
    @PrimaryGeneratedColumn()
    id: number;

    @ApiHideProperty()
    @ManyToOne(()=>Screen, screen=>screen.playlist,{onDelete:'CASCADE',orphanedRowAction:'delete'})
    screen: Screen;

    @Column()
    screenId: number;

    @ManyToOne(()=>Content,content=>content.playlistNode,{onDelete:'CASCADE',orphanedRowAction:'delete',eager:true})
    content: Content;

    @Column()
    contentId: number;

    @Column({default:1000})
    duration: number;

    @Column({nullable:false})
    order: number;

}