import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

const isIp4 = new RegExp(/^[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+$/);

@ValidatorConstraint({ name: "isIp4", async: false })
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isIp4.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return "must be an ip address";
  }
}
