import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, Response, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ContentService } from "./content.service";
import { AuthGuard } from "src/auth.module/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateContentDto } from "./dto/create.content.dto";
import { ContentGuard } from "src/auth.module/guards/content.guard";
import { Readable } from "stream";
import { User } from "src/user.module/user.entity";
import { GetUser } from "src/decorators/user.decorator";


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
                if(file && (file.mimetype.includes('video')|| file.mimetype.includes('image')||file.mimetype.includes('html'))){
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
    addContent(@UploadedFile()file: Express.Multer.File, @GetUser() user: User, @Body() dto: CreateContentDto){
        return this.service.createContent(file,user, dto)
        
    }

    @Get()
    getContent(@GetUser() user: User){
            return this.service.getContent(user)
        }
    
    @UseGuards(ContentGuard)
    @Get(':contentId')
    getOneContent(@GetUser() user: User, @Param('contentId') contentId: number){
        return this.service.getOneContent(user,contentId)
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
                if(file && (file.mimetype.includes('video')|| file.mimetype.includes('image')||file.mimetype.includes('html'))){
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
    addFile(@UploadedFile() file: Express.Multer.File, @GetUser() user: User, @Param('contentId') contentId: number, @Body() dto: CreateContentDto){
        return this.service.addFile(file,contentId,dto,user)
    }

    @UseGuards(ContentGuard)
    @Delete(':contentId')
    deleteContent( @Param('contentId')contentId: number, @GetUser() user: User){
        return this.service.deleteContent(contentId,user)
    }

    @UseGuards(ContentGuard)
    @Delete(':contentId/:fileId')
    deleteFile(@Param('contentId')contentId: number, @Param('fileId') fileId: number){
        return this.service.deleteFile(contentId,fileId)
    }
}