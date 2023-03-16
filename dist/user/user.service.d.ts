import { UnauthorizedException } from '@nestjs/common';
import { Logger } from 'winston';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { IFilters, IPagination } from './model/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
export interface IUser {
    email: string;
    id: string;
}
export declare class UserService {
    private userModel;
    private jwtService;
    private emailService;
    private readonly logger;
    constructor(userModel: mongoose.Model<User>, jwtService: JwtService, emailService: EmailService, logger: Logger);
    getAllUsers(options: IPagination, filter: IFilters): Promise<{
        data: (User & {
            _id: mongoose.Types.ObjectId;
        })[];
        count: number;
    }>;
    hashPassword(password: string): Promise<string>;
    generateToken(user: IUser): Promise<string>;
    findByEmail(email: string): Promise<User & {
        _id: mongoose.Types.ObjectId;
    }>;
    generateString(length: number): string;
    create(createUserDto: CreateUserDto): Promise<{
        token: string;
        message: string;
    }>;
    verifyVerificationToken(token: string, email: string): Promise<{
        message: string;
    }>;
    comparePassword(enteredPassword: string, dbPassword: string): Promise<boolean>;
    validateUser(email: string, pass: string): Promise<{
        name: string;
        email: string;
        contact: string;
        type: import("./schema/user.schema").Type;
        isLoggedIn: boolean;
        token: string;
        verification: {
            isVerified: boolean;
            token: string;
            expiry: Date;
        };
        passwordUpdate: {
            token: string;
            expiry: Date;
            passwordUpdatedAt: Date;
        };
        status: import("./schema/user.schema").Status;
        properties: any[];
        tenantsId: string;
        tenantsPropertyId: string;
        createdAt: Date;
        updatedAt: Date;
        _id: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "remove" | "save" | "validate";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection<import("bson").Document>;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            [x: string]: any;
        }>;
    }>;
    loginUser(email: string, password: string): Promise<UnauthorizedException | {
        message: string;
        token: string;
    }>;
    forgotPass(forgotPassDto: ForgotPasswordDto): Promise<{
        token: string;
    }>;
    changePassword(email: string, token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
    findById(id: string): Promise<User & {
        _id: mongoose.Types.ObjectId;
    }>;
    edit(updateUserDto: UpdateUserDto, authUser: any): Promise<{
        message: string;
    }>;
    updateUser(id: string): Promise<void>;
}
