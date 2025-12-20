import { Model, Types } from 'mongoose';
import { EmployeeProfileDocument } from '../../../employee-profile/models/employee-profile.schema';
import { TimePolicyDocument } from '../../policy/schemas/time-policy.schema';
import { TimeExceptionDocument } from '../../attendance/schemas/time-exception.schema';
import { PermissionType } from '../../enums/index';
export declare class PermissionValidationService {
    private employeeModel;
    private policyModel;
    private exceptionModel;
    private readonly logger;
    constructor(employeeModel: Model<EmployeeProfileDocument>, policyModel: Model<TimePolicyDocument>, exceptionModel: Model<TimeExceptionDocument>);
    validatePermission(employeeId: Types.ObjectId, permissionType: PermissionType, durationMinutes: number, requestedDate: Date): Promise<{
        valid: boolean;
        errors: string[];
        warnings: string[];
        payrollImpact?: {
            affectsPayroll: boolean;
            impactType: 'OVERTIME' | 'SHORT_TIME' | 'ADJUSTMENT' | 'NONE';
            impactAmount?: number;
        };
        benefitsImpact?: {
            affectsBenefits: boolean;
            impactType: 'ACCRUAL' | 'DEDUCTION' | 'NONE';
            impactAmount?: number;
        };
    }>;
    private validateDuration;
    private validateDates;
    private calculatePayrollImpact;
    private calculateBenefitsImpact;
    private getApplicablePolicy;
    updateExceptionWithValidation(exceptionId: Types.ObjectId, validationResult: Awaited<ReturnType<typeof this.validatePermission>>): Promise<TimeExceptionDocument>;
}
