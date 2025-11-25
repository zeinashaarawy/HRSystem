import { Types } from 'mongoose';
export declare class PayrollArea {
    name: string;
    description: string;
    departments: Types.ObjectId[];
    employees: Types.ObjectId[];
    payrollSchema: Types.ObjectId;
    payCycle: string;
    createdBy: Types.ObjectId;
    status: string;
    isActive: boolean;
}
export declare const PayrollAreaSchema: import("mongoose").Schema<PayrollArea, import("mongoose").Model<PayrollArea, any, any, any, import("mongoose").Document<unknown, any, PayrollArea, any, {}> & PayrollArea & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollArea, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PayrollArea>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollArea> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
