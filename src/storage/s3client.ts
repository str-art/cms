import { S3 } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Client extends S3{
    constructor(){
        super({
            credentials:{
                accessKeyId:'Zad2m_UvQiDT3axixWFS',
                secretAccessKey:'eaCcBsVcXL-JmbM90Ww7McDePmhTzSugKMomf_nN'
            },
            region:'ru-central1',
            endpoint:'https://storage.yandexcloud.net'
        })
    }
}