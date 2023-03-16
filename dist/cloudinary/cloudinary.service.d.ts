/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadImages(files: Array<Express.Multer.File>): Promise<Array<UploadApiResponse | UploadApiErrorResponse>>;
    uploadImagesToCloudinary(files: Array<Express.Multer.File>): Promise<Array<UploadApiResponse | UploadApiErrorResponse>>;
    uploadImageToCloudinary(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
