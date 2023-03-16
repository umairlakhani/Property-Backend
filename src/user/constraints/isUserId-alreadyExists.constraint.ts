import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
// import { SuperAdminService } from '../users.service';
import { UserService } from '../user.service';
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserIdAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}
  async validate(id: any, args: ValidationArguments) {
    const user = await this.userService.findById(id);
    if (user) return false;
    return true;
  }
}

export function IsUserIdAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserIdAlreadyExistConstraint,
    });
  };
}
