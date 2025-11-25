import { Document, Types } from 'mongoose';
export declare class PayrollRunEmployee extends Document {
    payrollRunId: Types.ObjectId;
    employeeId: Types.ObjectId;
    employeeStatus: string;
    signingBonusApplied: boolean;
    signingBonusAmount?: number;
    resignationBenefitAmount?: number;
    terminationBenefitAmount?: number;
    grossSalary: number;
    allowances: any;
    taxes: any;
    insurance: any;
    deductions: any;
    netSalary: number;
    finalSalary: number;
    calculationStatus: string;
}
export declare const PayrollRunEmployeeSchema: import("mongoose").Schema<PayrollRunEmployee, import("mongoose").Model<PayrollRunEmployee, any, any, any, Document<unknown, any, PayrollRunEmployee, any, {}> & PayrollRunEmployee & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PayrollRunEmployee, Document<unknown, {}, import("mongoose").FlatRecord<PayrollRunEmployee>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PayrollRunEmployee> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
