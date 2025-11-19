import { Document, Types } from 'mongoose';
export declare class PayrollException extends Document {
    payrollRunId: Types.ObjectId;
    employeeRecordId: Types.ObjectId;
    type: string;
    message: string;
    status: string;
    resolvedBy?: Types.ObjectId;
    resolvedAt?: Date;
}
export declare const PayrollExceptionSchema: import("mongoose").Schema<PayrollException, import("mongoose").Model<PayrollException, any, any, any, Document<unknown, any, PayrollException, any, {}> & PayrollException & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollException, Document<unknown, {}, import("mongoose").FlatRecord<PayrollException>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollException> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
