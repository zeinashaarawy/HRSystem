import { Document, Types } from 'mongoose';
export type LeaveRequestDocument = LeaveRequest & Document;
export declare class LeaveRequest {
    employeeId: Types.ObjectId;
    leaveTypeCode: string;
    startDate: Date;
    endDate: Date;
    justification?: string;
    documentUrl?: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    managerId?: Types.ObjectId;
    hrAdminId?: Types.ObjectId;
    auditTrail: Array<any>;
}
export declare const LeaveRequestSchema: import("mongoose").Schema<LeaveRequest, import("mongoose").Model<LeaveRequest, any, any, any, Document<unknown, any, LeaveRequest, any, {}> & LeaveRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LeaveRequest, Document<unknown, {}, import("mongoose").FlatRecord<LeaveRequest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LeaveRequest> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
