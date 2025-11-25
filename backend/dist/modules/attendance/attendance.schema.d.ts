import { HydratedDocument, Types } from 'mongoose';
export type AttendanceDocument = HydratedDocument<Attendance>;
export declare class Attendance {
    employeeId: Types.ObjectId;
    date: Date;
    clockIn: Date;
    clockOut: Date;
    status: string;
    lateMinutes: number;
    overtimeMinutes: number;
    workedMinutes: number;
    notes?: string;
    isManualEdit: boolean;
    editedBy: Types.ObjectId;
}
export declare const AttendanceSchema: import("mongoose").Schema<Attendance, import("mongoose").Model<Attendance, any, any, any, import("mongoose").Document<unknown, any, Attendance, any, {}> & Attendance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attendance, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Attendance>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Attendance> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
