import { CreateTenantDto } from './dto/create-tenant.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private tenantService;
    constructor(tenantService: TenantService);
    create(createTenantDto: CreateTenantDto): Promise<{
        message: string;
        token: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<import("@nestjs/common").UnauthorizedException | {
        message: string;
        token: string;
    }>;
    verify(token: string, email: string): Promise<string>;
    updatePass(forgotPassDto: ForgotPasswordDto): Promise<{
        token: string;
    }>;
    changePass(body: {
        email: string;
        token: string;
        password: string;
        confirmPassword: string;
    }): Promise<string>;
    edit(id: string, updateTenantDto: UpdateTenantDto): Promise<string>;
}
