import { Document, Types } from 'mongoose';
export type VacationPackageDocument = VacationPackage & Document;
export declare enum ContractType {
    PERMANENT = "PERMANENT",
    CONTRACT = "CONTRACT",
    PART_TIME = "PART_TIME"
}
export declare enum AccrualFrequency {
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
    ANNUALLY = "ANNUALLY"
}
export declare class VacationPackage {
    name: string;
    code: string;
    grade: string;
    contractType: ContractType;
    annualLeaveDays: number;
    sickLeaveDays: number;
    customEntitlements: {
        leaveTypeId: Types.ObjectId;
        days: number;
    }[];
    accrualFrequency: AccrualFrequency;
    carryOverEnabled: boolean;
    maxCarryOverDays: number;
    isActive: boolean;
    description: string;
}
export declare const VacationPackageSchema: import("mongoose").Schema<VacationPackage, import("mongoose").Model<VacationPackage, any, any, any, Document<unknown, any, VacationPackage, any, {}> & VacationPackage & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VacationPackage, Document<unknown, {}, import("mongoose").FlatRecord<VacationPackage>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<VacationPackage> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
