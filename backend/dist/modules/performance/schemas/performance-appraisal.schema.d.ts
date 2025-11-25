import { Document, Types } from 'mongoose';
export declare class PerformanceAppraisal extends Document {
    employee: Types.ObjectId;
    manager: Types.ObjectId;
    cycle: Types.ObjectId;
    ratings: {
        criterion: string;
        score: number;
        comment?: string;
    }[];
    overallRating?: number;
    managerComment?: string;
    employeeComment?: string;
    status: string;
    disputeReason?: string;
    disputeResolution?: string;
}
export declare const PerformanceAppraisalSchema: import("mongoose").Schema<PerformanceAppraisal, import("mongoose").Model<PerformanceAppraisal, any, any, any, Document<unknown, any, PerformanceAppraisal, any, {}> & PerformanceAppraisal & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PerformanceAppraisal, Document<unknown, {}, import("mongoose").FlatRecord<PerformanceAppraisal>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PerformanceAppraisal> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
