import { Document, Types } from 'mongoose';
export declare class PerformanceCycle extends Document {
    name: string;
    startDate: Date;
    endDate: Date;
    template: Types.ObjectId;
    status: string;
    applicableDepartments: Types.ObjectId[];
}
export declare const PerformanceCycleSchema: import("mongoose").Schema<PerformanceCycle, import("mongoose").Model<PerformanceCycle, any, any, any, Document<unknown, any, PerformanceCycle, any, {}> & PerformanceCycle & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PerformanceCycle, Document<unknown, {}, import("mongoose").FlatRecord<PerformanceCycle>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PerformanceCycle> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
