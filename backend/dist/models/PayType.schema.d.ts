import { Types } from 'mongoose';
export declare class PayType {
    name: string;
    code: string;
    type: string;
    description: string;
    status: string;
    createdBy: Types.ObjectId;
}
export declare const PayTypeSchema: import("mongoose").Schema<PayType, import("mongoose").Model<PayType, any, any, any, import("mongoose").Document<unknown, any, PayType, any, {}> & PayType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PayType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
