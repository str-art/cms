import { ApiHideProperty } from "@nestjs/swagger";
import { PlaylistNode } from "src/playlist.module/playlist.entity";
import { User } from "src/user.module/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Content{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{length: 150})
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
    
}