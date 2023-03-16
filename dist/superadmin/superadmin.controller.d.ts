import { TenantService } from 'src/tenant/tenant.service';
import { UserService } from 'src/user/user.service';
import { CreateSuperAdminDto } from './dto/create-superadmin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SuperadminService } from './superadmin.service';
export interface ISuperadmin {
    email: string;
    password: string;
}
export declare class SuperadminController {
    private superAdminService;
    private userService;
    private tenantService;
    constructor(superAdminService: SuperadminService, userService: UserService, tenantService: TenantService);
    create(createSuperAdmin: CreateSuperAdminDto): Promise<{
        message: string;
    }>;
    superAdminLogin(superAdmin: ISuperadmin): Promise<{
        message: string;
        token: string;
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
}
