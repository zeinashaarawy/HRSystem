import { Types } from 'mongoose';
export declare class PayrollSchema {
    name: string;
    description: string;
    taxRules: Types.ObjectId[];
    insuranceBrackets: Types.ObjectId[];
    allowances: Types.ObjectId[];
    deductions: Types.ObjectId[];
    status: string;
    createdBy: Types.ObjectId;
}
export declare const PayrollSchemaSchema: import("mongoose").Schema<PayrollSchema, import("mongoose").Model<PayrollSchema, any, any, any, import("mongoose").Document<unknown, any, PayrollSchema, any, {}> & PayrollSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollSchema, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PayrollSchema>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollSchema> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
