import { Document, Types } from 'mongoose';
export declare class PayrollApproval extends Document {
    payrollRunId: Types.ObjectId;
    role: string;
    status: string;
    reason?: string;
    decidedBy?: Types.ObjectId;
    decidedAt?: Date;
}
export declare const PayrollApprovalSchema: import("mongoose").Schema<PayrollApproval, import("mongoose").Model<PayrollApproval, any, any, any, Document<unknown, any, PayrollApproval, any, {}> & PayrollApproval & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollApproval, Document<unknown, {}, import("mongoose").FlatRecord<PayrollApproval>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollApproval> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
