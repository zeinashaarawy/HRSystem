import { Types } from 'mongoose';
export declare class InsuranceBracket {
    name: string;
    code: string;
    insuranceType: string;
    employeePercentage: number;
    employerPercentage: number;
    minSalary: number;
    maxSalary: number;
    effectiveFrom: Date;
    effectiveTo: Date;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const InsuranceBracketSchema: import("mongoose").Schema<InsuranceBracket, import("mongoose").Model<InsuranceBracket, any, any, any, import("mongoose").Document<unknown, any, InsuranceBracket, any, {}> & InsuranceBracket & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InsuranceBracket, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<InsuranceBracket>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<InsuranceBracket> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
