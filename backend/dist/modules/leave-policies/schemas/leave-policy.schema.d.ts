import { Document } from 'mongoose';
export type LeavePolicyDocument = LeavePolicy & Document;
export declare enum PolicyType {
    ACCRUAL = "ACCRUAL",
    APPROVAL = "APPROVAL",
    VALIDATION = "VALIDATION",
    CALCULATION = "CALCULATION"
}
export declare enum AccrualFrequency {
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
    ANNUALLY = "ANNUALLY"
}
export declare enum CriterionDate {
    HIRE_DATE = "HIRE_DATE",
    WORK_START_DATE = "WORK_START_DATE"
}
export declare class LeavePolicy {
    name: string;
    policyType: PolicyType;
    accrualRules: {
        frequency: AccrualFrequency;
        pauseDuringUnpaidLeave: boolean;
        pauseDuringSuspension: boolean;
        criterionDate: CriterionDate;
    };
    approvalRules: {
        levels: {
            sequence: number;
            role: string;
            autoEscalateAfterHours: number;
            canDelegate: boolean;
        }[];
        managerCanOverride: boolean;
        hrCanOverride: boolean;
    };
    validationRules: {
        minAdvanceNoticeDays: number;
        maxPostLeaveGracePeriodHours: number;
        blockOverlappingRequests: boolean;
        checkTeamAvailability: boolean;
        minTeamAvailabilityPercent: number;
    };
    calculationRules: {
        excludeWeekends: boolean;
        excludePublicHolidays: boolean;
        allowNegativeBalance: boolean;
        autoConvertToUnpaid: boolean;
    };
    isActive: boolean;
    effectiveFrom: Date;
    effectiveTo: Date;
    description: string;
}
export declare const LeavePolicySchema: import("mongoose").Schema<LeavePolicy, import("mongoose").Model<LeavePolicy, any, any, any, Document<unknown, any, LeavePolicy, any, {}> & LeavePolicy & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LeavePolicy, Document<unknown, {}, import("mongoose").FlatRecord<LeavePolicy>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LeavePolicy> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
