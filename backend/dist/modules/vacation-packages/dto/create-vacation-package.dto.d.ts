import { ContractType, AccrualFrequency } from '../schemas/vacation-package.schema';
declare class CustomEntitlementDto {
    leaveTypeId: string;
    days: number;
}
export declare class CreateVacationPackageDto {
    name: string;
    code: string;
    grade?: string;
    contractType: ContractType;
    annualLeaveDays: number;
    sickLeaveDays?: number;
    customEntitlements?: CustomEntitlementDto[];
    accrualFrequency: AccrualFrequency;
    carryOverEnabled?: boolean;
    maxCarryOverDays?: number;
    isActive?: boolean;
    description?: string;
}
export {};
