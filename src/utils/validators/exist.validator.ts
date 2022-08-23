import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const find = {
      where: {
        [validationArguments.constraints[1]]: validationArguments.value,
      },
    };
    const check = await this.dataSource
      .getRepository(validationArguments.constraints[0])
      .findOne(find);

    if (check) return true;
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property}: ${validationArguments.value} tidak ditemukan`;
  }
}

export function IsExist(option: any, validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExist',
      target: object.constructor,
      constraints: option,
      options: validationOption,
      validator: ExistValidator,
      async: true,
      propertyName,
    });
  };
}
