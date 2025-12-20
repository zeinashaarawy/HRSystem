import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';
export type RepeatedLatenessTrackingDocument = HydratedDocument<RepeatedLatenessTracking>;
export declare class RepeatedLatenessTracking {
    employeeId: Types.ObjectId;
    periodStart: Date;
    periodEnd: Date;
    periodType: string;
    totalLatenessIncidents: number;
    totalLatenessMinutes: number;
    thresholdExceeded: boolean;
    thresholdExceededAt?: Date;
    escalated: boolean;
    escalatedAt?: Date;
    escalatedTo?: Types.ObjectId;
    disciplinaryFlag: boolean;
    disciplinaryFlaggedAt?: Date;
    lateExceptionIds: Types.ObjectId[];
    metadata: {
        notes?: string;
        actionTaken?: string;
        resolved?: boolean;
    };
}
export declare const RepeatedLatenessTrackingSchema: import("mongoose").Schema<RepeatedLatenessTracking, import("mongoose").Model<RepeatedLatenessTracking, any, any, any, import("mongoose").Document<unknown, any, RepeatedLatenessTracking, any, {}> & RepeatedLatenessTracking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RepeatedLatenessTracking, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RepeatedLatenessTracking>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<RepeatedLatenessTracking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
