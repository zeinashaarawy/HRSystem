import { Document } from 'mongoose';
export type ShiftDocument = Shift & Document;
export declare class Shift {
    name: string;
    type: string;
    startTime: string;
    endTime: string;
    pattern: string;
    isActive: boolean;
}
export declare const ShiftSchema: import("mongoose").Schema<Shift, import("mongoose").Model<Shift, any, any, any, Document<unknown, any, Shift, any, {}> & Shift & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Shift, Document<unknown, {}, import("mongoose").FlatRecord<Shift>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Shift> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
