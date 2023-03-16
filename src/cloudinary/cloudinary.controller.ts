import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
  import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { CloudinaryService } from './cloudinary.service';
  
  @Controller('cloudinary')
  @ApiTags('Upload')
  export class CloudinaryController {
  
  constructor(private cloudinaryService: CloudinaryService){}
  
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          comment: { type: 'string' },
          outletId: { type: 'integer' },
          files: {
            type: 'array',
            items: {
              type:'string',
              format: 'binary',
            }
          },
        },
      },
    })
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
      const uploadPromises = files.map((file)=>{
        return this.cloudinaryService.uploadImage(file)
      })
      const results = await Promise.all(uploadPromises);
      return results
    }
  }
  