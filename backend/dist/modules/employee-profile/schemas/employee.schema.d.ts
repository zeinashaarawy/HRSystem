import { Document, Types } from 'mongoose';
export type EmploymentStatus = 'ACTIVE' | 'INACTIVE' | 'TERMINATED';
export declare class Employee extends Document {
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    nationalId?: string;
    dateOfBirth?: Date;
    hireDate: Date;
    status: EmploymentStatus;
    department?: Types.ObjectId;
    position?: Types.ObjectId;
    manager?: Types.ObjectId;
    profilePictureUrl?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    country?: string;
}
export declare const EmployeeSchema: import("mongoose").Schema<Employee, import("mongoose").Model<Employee, any, any, any, Document<unknown, any, Employee, any, {}> & Employee & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Employee, Document<unknown, {}, import("mongoose").FlatRecord<Employee>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Employee> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
