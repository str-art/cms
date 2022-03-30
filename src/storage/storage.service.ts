import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { Client } from "./s3client";

@Injectable()
export class StorageService{
    constructor(private cloud: Client){}

  

    async uploadFile(file: Buffer, path:number, fileName:number){
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `${path}/${fileName}`,
            Body: file 

        }
        try{
            const result = await this.cloud.send(new PutObjectCommand(params))
            return result;
        } catch (err){
            console.log(err)
        }
        
    }

    async download(key:string){
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key
        }
        try{
            const result = await this.cloud.send(new GetObjectCommand(params))
            return result
        } catch(err){
            console.log(err)
        }
    }
    
    async deleteFile(key:string){
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key

        }
        try{
            const result = await this.cloud.send(new DeleteObjectCommand(params))
            return result;
        }catch (err){
            console.log(err)
        }
    }
}