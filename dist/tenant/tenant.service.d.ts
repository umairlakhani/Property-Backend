import { UnauthorizedException } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from './schema/tenant.schema';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'winston';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export interface IUser {
    email: string;
    id: string;
}
export declare class TenantService {
    private tenantModel;
    private jwtService;
    private readonly logger;
    constructor(tenantModel: mongoose.Model<Tenant>, jwtService: JwtService, logger: Logger);
    findByEmail(email: string): Promise<Tenant & {
        _id: mongoose.Types.ObjectId;
    }>;
    hashPassword(password: string): Promise<string>;
    generateToken(user: IUser): Promise<string>;
    comparePassword(enteredPassword: string, dbPassword: string): Promise<boolean>;
    validateUser(email: string, pass: string): Promise<{
        name: string;
        email: string;
        alert: boolean;
        isLoggedIn: boolean;
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
        status: import("./schema/tenant.schema").TenantStatus;
        contact: string;
        favorites: string[];
        properties: string[];
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
    verifyVerificationToken(token: string, email: string): Promise<string>;
    forgotPass(forgotPassDto: ForgotPasswordDto): Promise<{
        token: string;
    }>;
    create(createTenantDto: CreateTenantDto): Promise<{
        message: string;
        token: string;
    }>;
    loginUser(email: string, password: string): Promise<UnauthorizedException | {
        message: string;
        token: string;
    }>;
    changePassword(email: string, token: string, password: string, confirmPassword: string): Promise<string>;
    findById(id: string): Promise<Tenant & {
        _id: mongoose.Types.ObjectId;
    }>;
    edit(id: string, updateTenantDto: UpdateTenantDto): Promise<string>;
}
