import { Document } from 'mongoose';
export type LeaveTypeDocument = LeaveType & Document;
export declare enum LeaveCategory {
    PAID = "PAID",
    UNPAID = "UNPAID",
    DEDUCTIBLE = "DEDUCTIBLE",
    NON_DEDUCTIBLE = "NON_DEDUCTIBLE"
}
export declare enum Gender {
    ALL = "ALL",
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class LeaveType {
    code: string;
    name: string;
    category: LeaveCategory;
    requiresDocument: boolean;
    documentType: string;
    maxDaysPerYear: number;
    maxConsecutiveDays: number;
    minDaysNotice: number;
    allowPartialDays: boolean;
    gender: Gender;
    isActive: boolean;
    payrollPayCode: string;
    description: string;
}
export declare const LeaveTypeSchema: import("mongoose").Schema<LeaveType, import("mongoose").Model<LeaveType, any, any, any, Document<unknown, any, LeaveType, any, {}> & LeaveType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LeaveType, Document<unknown, {}, import("mongoose").FlatRecord<LeaveType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LeaveType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
