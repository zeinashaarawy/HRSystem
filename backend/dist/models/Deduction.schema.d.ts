import { Types } from 'mongoose';
export declare class Deduction {
    name: string;
    code: string;
    type: string;
    value: number;
    calculationMethod: string;
    appliesToContractTypes: string[];
    status: string;
    createdBy: Types.ObjectId;
}
export declare const DeductionSchema: import("mongoose").Schema<Deduction, import("mongoose").Model<Deduction, any, any, any, import("mongoose").Document<unknown, any, Deduction, any, {}> & Deduction & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Deduction, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Deduction>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Deduction> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
