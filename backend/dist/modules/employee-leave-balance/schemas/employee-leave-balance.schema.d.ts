import { Document, Types } from 'mongoose';
export type EmployeeLeaveBalanceDocument = EmployeeLeaveBalance & Document;
export declare class EmployeeLeaveBalance {
    employeeId: Types.ObjectId;
    balances: Map<string, number>;
    pending: Map<string, number>;
    accrued: Map<string, number>;
    auditTrail: Array<any>;
}
export declare const EmployeeLeaveBalanceSchema: import("mongoose").Schema<EmployeeLeaveBalance, import("mongoose").Model<EmployeeLeaveBalance, any, any, any, Document<unknown, any, EmployeeLeaveBalance, any, {}> & EmployeeLeaveBalance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EmployeeLeaveBalance, Document<unknown, {}, import("mongoose").FlatRecord<EmployeeLeaveBalance>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<EmployeeLeaveBalance> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
