import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsValidJobRequisitionConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsValidJobRequisition(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class HasConsentConstraint implements ValidatorConstraintInterface {
    validate(value: boolean, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function HasConsent(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class HasInterviewPanelConstraint implements ValidatorConstraintInterface {
    validate(value: any[], args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function HasInterviewPanel(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class IsValidAssessmentScoreConstraint implements ValidatorConstraintInterface {
    validate(value: number, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsValidAssessmentScore(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class IsValidOfferConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsValidOffer(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
