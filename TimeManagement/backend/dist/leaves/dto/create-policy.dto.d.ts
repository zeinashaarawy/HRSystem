export declare enum AccrualMethod {
    MONTHLY = "MONTHLY",
    ANNUAL = "ANNUAL",
    NONE = "NONE"
}
export declare class EligibilityDto {
    minTenureMonths: number;
    positionsAllowed?: string[];
    contractTypesAllowed?: string[];
}
export declare class CreatePolicyDto {
    leaveTypeId: string;
    policyType: string;
    accrualMethod?: AccrualMethod;
    accrualRate?: number;
    carryForwardAllowed?: boolean;
    maxCarryForward?: number;
    maxPerYear?: number;
    effectiveFrom?: string;
    effectiveTo?: string;
    eligibility?: EligibilityDto;
    approvalChain?: {
        level: number;
        role: string;
    }[];
}
