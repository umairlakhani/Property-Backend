import { ConfigService } from '@nestjs/config';
import { TenantService } from '../tenant.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private tenantService;
    constructor(configServ: ConfigService, tenantService: TenantService);
}
export {};
