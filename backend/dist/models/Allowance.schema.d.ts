import { Types } from 'mongoose';
export declare class Allowance {
    name: string;
    code: string;
    type: string;
    value: number;
    allowanceType: string;
    description: string;
    appliesToContractTypes: string[];
    status: string;
    createdBy: Types.ObjectId;
}
export declare const AllowanceSchema: import("mongoose").Schema<Allowance, import("mongoose").Model<Allowance, any, any, any, import("mongoose").Document<unknown, any, Allowance, any, {}> & Allowance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Allowance, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Allowance>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Allowance> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
