import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function isIntOrBoolean(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isIntOrBoolean',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          
          return typeof value === 'number' || typeof value === 'boolean' 
        },
      },
    });
  };
}