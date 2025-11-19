import { PolicyType, AccrualFrequency, CriterionDate } from '../schemas/leave-policy.schema';
declare class AccrualRulesDto {
    frequency: AccrualFrequency;
    pauseDuringUnpaidLeave?: boolean;
    pauseDuringSuspension?: boolean;
    criterionDate: CriterionDate;
}
declare class ApprovalLevelDto {
    sequence: number;
    role: string;
    autoEscalateAfterHours: number;
    canDelegate: boolean;
}
declare class ApprovalRulesDto {
    levels: ApprovalLevelDto[];
    managerCanOverride?: boolean;
    hrCanOverride?: boolean;
}
declare class ValidationRulesDto {
    minAdvanceNoticeDays: number;
    maxPostLeaveGracePeriodHours: number;
    blockOverlappingRequests: boolean;
    checkTeamAvailability: boolean;
    minTeamAvailabilityPercent: number;
}
declare class CalculationRulesDto {
    excludeWeekends: boolean;
    excludePublicHolidays: boolean;
    allowNegativeBalance: boolean;
    autoConvertToUnpaid: boolean;
}
export declare class CreatePolicyDto {
    name: string;
    policyType: PolicyType;
    accrualRules?: AccrualRulesDto;
    approvalRules?: ApprovalRulesDto;
    validationRules?: ValidationRulesDto;
    calculationRules?: CalculationRulesDto;
    isActive?: boolean;
    effectiveFrom?: Date;
    effectiveTo?: Date;
    description?: string;
}
export {};
