import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from '../user.service';
export declare class IsUserIdAlreadyExistConstraint implements ValidatorConstraintInterface {
    private userService;
    constructor(userService: UserService);
    validate(id: any, args: ValidationArguments): Promise<boolean>;
}
export declare function IsUserIdAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
