import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { TenantService } from '../tenant.service';
export declare class IsTenantAlreadyExistConstraint implements ValidatorConstraintInterface {
    private tenantService;
    constructor(tenantService: TenantService);
    validate(email: any, args: ValidationArguments): Promise<boolean>;
}
export declare function IsTenantAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
