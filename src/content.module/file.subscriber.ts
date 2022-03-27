import { DeleteObjectCommand,S3Client } from "@aws-sdk/client-s3";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AfterInsert,  BeforeInsert, BeforeRemove,  EntitySubscriberInterface, EventSubscriber, InsertEvent, Like,  RemoveEvent } from "typeorm";
import { File } from "./file.entity";

@EventSubscriber()
export class FileSubscriber implements EntitySubscriberInterface<File>{

    listenTo(): string | Function {
        return File
    }
    @BeforeInsert()
    async beforeInsert(event: InsertEvent<File>){
        const entity = event.entity;
        const repo = event.manager.getRepository(File)
        const first = await repo.count({contentId:entity.contentId})
        if(first>0){
            const forbid = await repo.findOne({
               contentId:entity.contentId,
               width:entity.width,
               height:entity.height,
               orientation:entity.orientation
            })
            if(forbid){
                throw new HttpException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'A file like this already added to this content entity'
                },HttpStatus.UNPROCESSABLE_ENTITY)
            }
            const fileType = entity.contentType.split('/')
            const validType = await repo.findOne({
                contentType: Like(`${fileType[0]}%`)
            })
            if(!validType){
                throw new HttpException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Invalid file type'
                },HttpStatus.UNPROCESSABLE_ENTITY)
            }
        }
    }

    @AfterInsert()
    async afterInsert(event: InsertEvent<File>): Promise<any> {
        const entity = event.entity;
        entity.key=`${entity.contentId}/${entity.id}`;
        await event.manager.getRepository(File).save(entity)
    }

    @BeforeRemove()
    async beforeRemove(event: RemoveEvent<File>){
        console.log(event.entity)
        const cloud = new S3Client( 
            {
                credentials:{
                    accessKeyId:'Zad2m_UvQiDT3axixWFS',
                    secretAccessKey:'eaCcBsVcXL-JmbM90Ww7McDePmhTzSugKMomf_nN'
                },
                region:'ru-central1',
                endpoint:'https://storage.yandexcloud.net'
            }
        )
        const params = {
            Bucket: 'cmsapipurrwebintern',
            Key: event.entity.key
        }
        try{
            await cloud.send(new DeleteObjectCommand(params))
        }
        catch(err){
            throw new HttpException({
                status:HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cant delete file'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        console.log(params)
    }
        
}