import { Document, Types } from 'mongoose';
export declare class SigningBonusProcessing extends Document {
    employeeId: Types.ObjectId;
    amount: number;
    status: string;
    reviewedBy?: Types.ObjectId;
    overrideReason?: string;
}
export declare const SigningBonusProcessingSchema: import("mongoose").Schema<SigningBonusProcessing, import("mongoose").Model<SigningBonusProcessing, any, any, any, Document<unknown, any, SigningBonusProcessing, any, {}> & SigningBonusProcessing & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SigningBonusProcessing, Document<unknown, {}, import("mongoose").FlatRecord<SigningBonusProcessing>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SigningBonusProcessing> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
