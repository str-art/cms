import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Request, Response, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { Content } from "./content.entity";
import { ContentService } from "./content.service";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateContentDto } from "./dto/create.content.dto";
import { createReadStream } from "fs";


@ApiTags('Working with content base')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('content')
export class ContentController{
    constructor(public service: ContentService){}

    @Post()
    @UseInterceptors(FileInterceptor('file',{fileFilter: (req,file,cb)=>{
            if(file.mimetype == 'text/html' || 'image/jpeg' || "image/png" || 'video/mp4' ){
                cb(null,true)
            }else{
                cb(new HttpException({
                    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                    message: 'Wrong file format'
                }, HttpStatus.UNSUPPORTED_MEDIA_TYPE),false
            )}
        }  
    }))
    async addContent(@UploadedFile()file: Express.Multer.File, @Request() req, @Body() dto: CreateContentDto){
        return this.service.createContent(file,req.user, dto)
        
    }

    @Get()
    async getContent( @Request() req){
            return await this.service.getContent(req.user)
        }

    @Delete(':contentId')
    async deleteContent( @Param('contentId')contentId: number, @Request() req){
        return await this.service.deleteContent(contentId,req.user)
    }
}