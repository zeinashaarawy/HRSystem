import { Document, Types } from 'mongoose';
export declare class Payslip extends Document {
    payrollRunId: Types.ObjectId;
    employeeId: Types.ObjectId;
    breakdown: any;
    fileUrl?: string;
}
export declare const PayslipSchema: import("mongoose").Schema<Payslip, import("mongoose").Model<Payslip, any, any, any, Document<unknown, any, Payslip, any, {}> & Payslip & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payslip, Document<unknown, {}, import("mongoose").FlatRecord<Payslip>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payslip> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
