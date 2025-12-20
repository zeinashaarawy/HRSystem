import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';
export declare class ParseObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
    transform(value: string, metadata: ArgumentMetadata): Types.ObjectId;
}
export declare class ApplicationStatusPipe implements PipeTransform {
    private readonly validTransitions;
    transform(value: any, metadata: ArgumentMetadata): any;
    private isValidStatus;
}
export declare class InterviewSchedulePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class OfferApprovalPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class AnalyticsQueryPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class ReferralValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
