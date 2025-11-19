import { Document, Types } from 'mongoose';
export declare class ShiftAssignment {
    employee: Types.ObjectId;
    shift: Types.ObjectId;
    department: Types.ObjectId;
    position: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: string;
}
export declare const ShiftAssignmentSchema: import("mongoose").Schema<ShiftAssignment, import("mongoose").Model<ShiftAssignment, any, any, any, Document<unknown, any, ShiftAssignment, any, {}> & ShiftAssignment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShiftAssignment, Document<unknown, {}, import("mongoose").FlatRecord<ShiftAssignment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ShiftAssignment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
