import { Document, Types } from 'mongoose';
export declare class TerminationBenefitProcessing extends Document {
    employeeId: Types.ObjectId;
    amount: number;
    status: string;
    overrideReason?: string;
    reviewedBy?: Types.ObjectId;
}
export declare const TerminationBenefitProcessingSchema: import("mongoose").Schema<TerminationBenefitProcessing, import("mongoose").Model<TerminationBenefitProcessing, any, any, any, Document<unknown, any, TerminationBenefitProcessing, any, {}> & TerminationBenefitProcessing & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TerminationBenefitProcessing, Document<unknown, {}, import("mongoose").FlatRecord<TerminationBenefitProcessing>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TerminationBenefitProcessing> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
