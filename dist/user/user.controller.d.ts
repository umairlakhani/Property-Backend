/// <reference types="multer" />
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';
import { PropertyService } from 'src/property/property.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    private propertyService;
    private cloudinaryService;
    constructor(userService: UserService, propertyService: PropertyService, cloudinaryService: CloudinaryService);
    create(createUser: CreateUserDto): Promise<{
        token: string;
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<import("@nestjs/common").UnauthorizedException | {
        message: string;
        token: string;
    }>;
    verify(token: string, email: string): Promise<{
        message: string;
    }>;
    updatePass(forgotPassDto: ForgotPasswordDto): Promise<{
        token: string;
    }>;
    changePass(body: {
        email: string;
        token: string;
        password: string;
        confirmPassword: string;
    }): Promise<{
        message: string;
    }>;
    edit(updateUserDto: UpdateUserDto, authUser: any): Promise<{
        message: string;
    }>;
    addProperty(createPropertyDto: CreatePropertyDto, authUser: any, files: Array<Express.Multer.File>): Promise<{
        message: string;
    }>;
}
