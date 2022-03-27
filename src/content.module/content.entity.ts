import { ApiHideProperty } from "@nestjs/swagger";
import { PlaylistNode } from "src/playlist.module/playlist.entity";
import { User } from "src/user.module/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file.entity";

export enum FileType{

}

@Entity()
export class Content{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 150,nullable:true})
    url: string;

    @Column({nullable:true})
    name: string;

    @ApiHideProperty()
    @Column({nullable:true,select:false})
    userId: number;

    @ApiHideProperty()
    @ManyToOne(()=>User, user =>user.contents,{onDelete:'CASCADE'})
    user: User;

    @ApiHideProperty()
    @OneToMany(()=>PlaylistNode, PlaylistNode => PlaylistNode.content,{onDelete:'SET NULL'})
    playlistNode:PlaylistNode[];

    @OneToMany(()=>File,file=>file.content,{onDelete:'SET NULL',cascade:true})
    files: File[]
}