import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, Response, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { Content } from "./content.entity";
import { ContentService } from "./content.service";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateContentDto } from "./dto/create.content.dto";
import { createReadStream } from "fs";
import { ContentGuard } from "src/auth.module/guards/content.guard";
import { GetObjectCommandOutput, GetObjectOutput } from "@aws-sdk/client-s3";
import { Readable } from "stream";


@ApiTags('Working with content base')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('content')
export class ContentController{
    constructor(public service: ContentService){}

    @Post()
    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                fileFilter: (req,file,cb)=>{
                if(file && file.mimetype == 'text/html' || 'image/jpeg' || "image/png" || 'video/mp4' ){
                    cb(null,true)
                }else{
                    cb(new HttpException({
                        status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                        message: 'Wrong file format'
                    }, HttpStatus.UNSUPPORTED_MEDIA_TYPE),false)}
                }  
            }
        )
    )
    addContent(@UploadedFile()file: Express.Multer.File, @Request() req, @Body() dto: CreateContentDto){
        return this.service.createContent(file,req.user, dto)
        
    }

    @Get()
    getContent( @Request() req){
            return this.service.getContent(req.user)
        }
    
    @UseGuards(ContentGuard)
    @Get(':contentId')
    getOneContent(@Request() req, @Param('contentId') contentId: number){
        return this.service.getOneContent(req.user,contentId)
    }

    @UseGuards(ContentGuard)
    @Get(':contentId/:fileId')
    async getFile(@Param('contentId') contentId: number, @Param('fileId') fileId: number){
        const file= await this.service.getFile(contentId,fileId)
        return new StreamableFile(file.Body as Readable,{type:file.contentType})
    }

    @UseGuards(ContentGuard)
    @Patch(':contentId')
    @UseInterceptors(
        FileInterceptor('file',{
            fileFilter: (req,file,cb)=>{
                if(file.mimetype == 'text/html' || 'image/jpeg' || "image/png" || 'video/mp4' ){
                    cb(null,true)
                }else{
                    cb(new HttpException({
                        status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                        message: 'Wrong file format'
                    }, HttpStatus.UNSUPPORTED_MEDIA_TYPE),false)
                }
            }  
        })
    )
    addFile(@UploadedFile() file: Express.Multer.File, @Request() req, @Param('contentId') contentId: number, @Body() dto: CreateContentDto){
        return this.service.addFile(file,contentId,dto,req.user)
    }

    @UseGuards(ContentGuard)
    @Delete(':contentId')
    deleteContent( @Param('contentId')contentId: number, @Request() req){
        return this.service.deleteContent(contentId,req.user)
    }

    @UseGuards(ContentGuard)
    @Delete(':contentId/:fileId')
    deleteFile(@Param('contentId')contentId: number, @Param('fileId') fileId: number){
        return this.service.deleteFile(contentId,fileId)
    }
}