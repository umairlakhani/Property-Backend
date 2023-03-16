import mongoose from 'mongoose';
import { IUser, UserService } from 'src/user/user.service';
import { Logger } from 'winston';
import { CreateSuperAdminDto } from './dto/create-superadmin.dto';
import { SuperAdmin } from './schema/super-admin.schema';
import { ISuperadmin } from './superadmin.controller';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtService } from '@nestjs/jwt';
export declare class SuperadminService {
    private superAdminModel;
    private jwtService;
    private readonly logger;
    private userService;
    constructor(superAdminModel: mongoose.Model<SuperAdmin>, jwtService: JwtService, logger: Logger, userService: UserService);
    createSuperAdmin(createSuperAdmin: CreateSuperAdminDto): Promise<{
        message: string;
    }>;
    hashPassword(password: string): Promise<string>;
    generateToken(user: IUser): Promise<string>;
    findByEmail(email: string): Promise<SuperAdmin & {
        _id: mongoose.Types.ObjectId;
    }>;
    comparePassword(enteredPassword: string, dbPassword: string): Promise<boolean>;
    superAdminLogin(creds: ISuperadmin): Promise<{
        message: string;
        token: string;
    }>;
    forgotPass(forgotPassDto: ForgotPasswordDto): Promise<{
        token: string;
    }>;
    changePassword(email: string, token: string, password: string, confirmPassword: string): Promise<{
        message: string;
    }>;
}
