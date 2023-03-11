import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TenantService } from '../tenant.service';
@Injectable()
@ValidatorConstraint({ async: true })
export class IsTenantAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private tenantService: TenantService) {}
  async validate(email: any, args: ValidationArguments) {
    const user = await this.tenantService.findByEmail(email);
    if (user) return false;
    return true;
  }
}

export function IsTenantAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTenantAlreadyExistConstraint,
    });
  };
}
