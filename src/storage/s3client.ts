import { S3 } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Client extends S3{
    constructor(){
        super({
            credentials:{
                accessKeyId:process.env.ACCESS_KEY,
                secretAccessKey:process.env.SECRET_KEY
            },
            region:'ru-central1',
            endpoint:'https://storage.yandexcloud.net'
        })
    }
}