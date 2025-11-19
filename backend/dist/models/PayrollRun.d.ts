import { Document, Types } from 'mongoose';
export declare class PayrollRun extends Document {
    period: string;
    status: string;
    initiatedBy: Types.ObjectId;
    initiatedAt?: Date;
    managerApprovedAt?: Date;
    managerApprovedBy?: Types.ObjectId;
    financeApprovedAt?: Date;
    financeApprovedBy?: Types.ObjectId;
    isFrozen: boolean;
    unfreezeReason?: string;
}
export declare const PayrollRunSchema: import("mongoose").Schema<PayrollRun, import("mongoose").Model<PayrollRun, any, any, any, Document<unknown, any, PayrollRun, any, {}> & PayrollRun & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollRun, Document<unknown, {}, import("mongoose").FlatRecord<PayrollRun>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollRun> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
