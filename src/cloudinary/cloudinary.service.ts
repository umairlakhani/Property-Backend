import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
        return resolve(result);
      });


      toStream(file.buffer).pipe(upload);
    });
  }
  async uploadImages(
    files: Array<Express.Multer.File>,
  ): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    const uploadPromises = files.map((file) => {
      return this.uploadImage(file);
    });
    const results = await Promise.all(uploadPromises);
    return results;
  }

  async uploadImagesToCloudinary(
    files: Array<Express.Multer.File>,
  ): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    return await this.uploadImages(files).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
