import { Document, Types } from 'mongoose';
export type LeaveAdjustmentDocument = LeaveAdjustment & Document;
export declare class LeaveAdjustment {
    employeeId: Types.ObjectId;
    leaveTypeCode: string;
    days: number;
    reason?: string;
    status: 'pending' | 'approved' | 'rejected';
    approverId?: Types.ObjectId;
    auditTrail: Array<any>;
}
export declare const LeaveAdjustmentSchema: import("mongoose").Schema<LeaveAdjustment, import("mongoose").Model<LeaveAdjustment, any, any, any, Document<unknown, any, LeaveAdjustment, any, {}> & LeaveAdjustment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LeaveAdjustment, Document<unknown, {}, import("mongoose").FlatRecord<LeaveAdjustment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LeaveAdjustment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
