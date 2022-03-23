import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./content.entity";
import { ScreenOrientation } from "src/screen.module/screen.entity";

@Entity({
    orderBy:{
        width:'DESC',
        height:'DESC'
    }
})
export class File{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    key: string;

    @Column({default:1920})
    width:number;

    @Column({default:1080})
    height:number;

    @Column()
    contentType: string;

    @Column({nullable:false})
    contentId: number;

    @ManyToOne(()=>Content,content=>content.files,{onDelete:'CASCADE',orphanedRowAction:'delete'})
    content: Content;

    @Column({
        type:'enum',
        enum:['portrait','landscape'],
        default:'portrait'
    })
    orientation: ScreenOrientation
}