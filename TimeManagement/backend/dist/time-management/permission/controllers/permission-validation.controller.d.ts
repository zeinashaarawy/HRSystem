import { PermissionValidationService } from '../services/permission-validation.service';
import { PermissionType } from '../../enums/index';
declare class ValidatePermissionDto {
    employeeId: string;
    permissionType: PermissionType;
    durationMinutes: number;
    requestedDate: string;
}
export declare class PermissionValidationController {
    private readonly permissionValidationService;
    constructor(permissionValidationService: PermissionValidationService);
    validatePermission(dto: ValidatePermissionDto): Promise<{
        valid: boolean;
        errors: string[];
        warnings: string[];
        payrollImpact?: {
            affectsPayroll: boolean;
            impactType: "OVERTIME" | "SHORT_TIME" | "ADJUSTMENT" | "NONE";
            impactAmount?: number;
        };
        benefitsImpact?: {
            affectsBenefits: boolean;
            impactType: "ACCRUAL" | "DEDUCTION" | "NONE";
            impactAmount?: number;
        };
    }>;
}
export {};
