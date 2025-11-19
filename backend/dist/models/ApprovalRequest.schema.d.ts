import { Types } from 'mongoose';
export declare class ApprovalRequest {
    entityType: string;
    entityId: Types.ObjectId;
    requestedBy: Types.ObjectId;
    approverRole: string;
    status: string;
    reason: string;
    decisionAt: Date;
    decidedBy: Types.ObjectId;
}
export declare const ApprovalRequestSchema: import("mongoose").Schema<ApprovalRequest, import("mongoose").Model<ApprovalRequest, any, any, any, import("mongoose").Document<unknown, any, ApprovalRequest, any, {}> & ApprovalRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ApprovalRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ApprovalRequest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ApprovalRequest> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
