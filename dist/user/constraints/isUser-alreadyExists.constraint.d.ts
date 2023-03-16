import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from '../user.service';
export declare class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    private userService;
    constructor(userService: UserService);
    validate(email: any, args: ValidationArguments): Promise<boolean>;
}
export declare function IsUserAlreadyExist(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
