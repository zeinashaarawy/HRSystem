import { Document, Types } from 'mongoose';
export type TimeExceptionDocument = TimeException & Document;
export declare class TimeException {
    employee: Types.ObjectId;
    type: string;
    requestDate: Date;
    targetDate: Date;
    status: string;
    resolvedBy: Types.ObjectId;
    reason: string;
    notes: string;
}
export declare const TimeExceptionSchema: import("mongoose").Schema<TimeException, import("mongoose").Model<TimeException, any, any, any, Document<unknown, any, TimeException, any, {}> & TimeException & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimeException, Document<unknown, {}, import("mongoose").FlatRecord<TimeException>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TimeException> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
