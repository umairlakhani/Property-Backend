/// <reference types="multer" />
import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadFiles(files: Array<Express.Multer.File>): Promise<(import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse)[]>;
}
