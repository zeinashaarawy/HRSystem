import { Document, Types } from 'mongoose';
export type PayGradeDocument = PayGrade & Document;
export declare class PayGrade {
    name: string;
    code: string;
    baseSalary: number;
    currency: string;
    contractType: string;
    allowances: Types.ObjectId[];
    deductions: Types.ObjectId[];
    department: Types.ObjectId;
    position: Types.ObjectId;
    status: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    notes: string;
}
export declare const PayGradeSchema: import("mongoose").Schema<PayGrade, import("mongoose").Model<PayGrade, any, any, any, Document<unknown, any, PayGrade, any, {}> & PayGrade & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayGrade, Document<unknown, {}, import("mongoose").FlatRecord<PayGrade>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayGrade> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
