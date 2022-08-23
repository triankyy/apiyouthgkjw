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
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const find = {
      // where: {
      [validationArguments.constraints[1]]: validationArguments.value,
      // },
    };
    const check = await this.dataSource
      .getRepository(validationArguments.constraints[0])
      .findOneBy(find);

    if (check) return false;
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property}: ${validationArguments.value} sudah digunakan`;
  }
}

export function IsUnique(option: any, validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      constraints: option,
      options: validationOption,
      validator: UniqueValidator,
      async: true,
      propertyName,
    });
  };
}
