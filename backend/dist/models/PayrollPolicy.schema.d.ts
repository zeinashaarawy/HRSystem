import { Types, Schema as MongooseSchema } from 'mongoose';
export declare class PayrollPolicy {
    policyName: string;
    policyCode: string;
    value: any;
    description: string;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const PayrollPolicySchema: MongooseSchema<PayrollPolicy, import("mongoose").Model<PayrollPolicy, any, any, any, import("mongoose").Document<unknown, any, PayrollPolicy, any, {}> & PayrollPolicy & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollPolicy, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PayrollPolicy>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollPolicy> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
