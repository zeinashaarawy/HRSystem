"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PermissionValidationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionValidationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employee_profile_schema_1 = require("../../../employee-profile/models/employee-profile.schema");
const time_policy_schema_1 = require("../../policy/schemas/time-policy.schema");
const time_exception_schema_1 = require("../../attendance/schemas/time-exception.schema");
const index_1 = require("../../enums/index");
let PermissionValidationService = PermissionValidationService_1 = class PermissionValidationService {
    employeeModel;
    policyModel;
    exceptionModel;
    logger = new common_1.Logger(PermissionValidationService_1.name);
    constructor(employeeModel, policyModel, exceptionModel) {
        this.employeeModel = employeeModel;
        this.policyModel = policyModel;
        this.exceptionModel = exceptionModel;
    }
    async validatePermission(employeeId, permissionType, durationMinutes, requestedDate) {
        const errors = [];
        const warnings = [];
        const employee = await this.employeeModel.findById(employeeId).exec();
        if (!employee) {
            throw new common_1.BadRequestException(`Employee with ID ${employeeId} not found`);
        }
        const policy = await this.getApplicablePolicy(employeeId, requestedDate);
        if (!policy || !policy.permissionValidationRule) {
            warnings.push('No permission validation rules configured. Using default validation.');
            return {
                valid: true,
                errors: [],
                warnings,
            };
        }
        const validationRule = policy.permissionValidationRule;
        const durationValidation = this.validateDuration(permissionType, durationMinutes, validationRule);
        if (!durationValidation.valid) {
            errors.push(...durationValidation.errors);
        }
        const dateValidation = await this.validateDates(employee, requestedDate, validationRule);
        if (!dateValidation.valid) {
            errors.push(...dateValidation.errors);
        }
        const payrollImpact = this.calculatePayrollImpact(permissionType, durationMinutes, validationRule);
        const benefitsImpact = this.calculateBenefitsImpact(permissionType, durationMinutes, validationRule);
        return {
            valid: errors.length === 0,
            errors,
            warnings,
            payrollImpact,
            benefitsImpact,
        };
    }
    validateDuration(permissionType, durationMinutes, rule) {
        const errors = [];
        if (!rule.maxDurationMinutes) {
            return { valid: true, errors: [] };
        }
        const maxDuration = rule.maxDurationMinutes[permissionType];
        if (maxDuration && durationMinutes > maxDuration) {
            errors.push(`Permission duration (${durationMinutes} minutes) exceeds maximum allowed (${maxDuration} minutes) for ${permissionType}`);
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    async validateDates(employee, requestedDate, rule) {
        const errors = [];
        if (rule.requireContractStartDate) {
            if (!employee.contractStartDate) {
                errors.push('Employee contract start date is not set');
            }
            else if (requestedDate < employee.contractStartDate) {
                errors.push(`Requested date (${requestedDate.toISOString()}) is before contract start date (${employee.contractStartDate.toISOString()})`);
            }
        }
        if (rule.requireFinancialCalendar) {
            const financialYearStart = new Date(requestedDate.getFullYear(), 0, 1);
            const financialYearEnd = new Date(requestedDate.getFullYear(), 11, 31);
            if (requestedDate < financialYearStart || requestedDate > financialYearEnd) {
                errors.push(`Requested date (${requestedDate.toISOString()}) is outside the financial calendar year`);
            }
        }
        if (rule.requireProbationEndDate) {
            if (!employee.contractStartDate) {
                errors.push('Employee contract start date is not set');
            }
            else {
                const probationEndDate = new Date(employee.contractStartDate);
                probationEndDate.setMonth(probationEndDate.getMonth() + 3);
                if (requestedDate < probationEndDate) {
                    errors.push(`Requested date (${requestedDate.toISOString()}) is before probation period ends (${probationEndDate.toISOString()})`);
                }
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    calculatePayrollImpact(permissionType, durationMinutes, rule) {
        if (!rule.affectsPayroll) {
            return {
                affectsPayroll: false,
                impactType: 'NONE',
            };
        }
        let impactType = 'NONE';
        switch (permissionType) {
            case index_1.PermissionType.LATE_OUT:
            case index_1.PermissionType.OUT_OF_HOURS:
                impactType = rule.payrollImpactType || 'OVERTIME';
                break;
            case index_1.PermissionType.EARLY_IN:
                impactType = rule.payrollImpactType || 'ADJUSTMENT';
                break;
            case index_1.PermissionType.TOTAL:
                impactType = rule.payrollImpactType || 'ADJUSTMENT';
                break;
        }
        let impactAmount;
        if (impactType !== 'NONE') {
            impactAmount = durationMinutes;
        }
        return {
            affectsPayroll: true,
            impactType: rule.payrollImpactType || impactType,
            impactAmount,
        };
    }
    calculateBenefitsImpact(permissionType, durationMinutes, rule) {
        if (!rule.affectsBenefits) {
            return {
                affectsBenefits: false,
                impactType: 'NONE',
            };
        }
        const impactType = rule.benefitsImpactType || 'NONE';
        let impactAmount;
        if (impactType !== 'NONE') {
            impactAmount = durationMinutes;
        }
        return {
            affectsBenefits: true,
            impactType,
            impactAmount,
        };
    }
    async getApplicablePolicy(employeeId, date) {
        const employeePolicy = await this.policyModel
            .findOne({
            employeeId,
            active: true,
            $or: [
                { effectiveFrom: { $lte: date }, effectiveTo: null },
                { effectiveFrom: { $lte: date }, effectiveTo: { $gte: date } },
            ],
        })
            .sort({ createdAt: -1 })
            .exec();
        if (employeePolicy) {
            return employeePolicy;
        }
        const employee = await this.employeeModel.findById(employeeId).exec();
        if (employee?.primaryDepartmentId) {
            const departmentPolicy = await this.policyModel
                .findOne({
                departmentId: employee.primaryDepartmentId,
                active: true,
                $or: [
                    { effectiveFrom: { $lte: date }, effectiveTo: null },
                    { effectiveFrom: { $lte: date }, effectiveTo: { $gte: date } },
                ],
            })
                .sort({ createdAt: -1 })
                .exec();
            if (departmentPolicy) {
                return departmentPolicy;
            }
        }
        const globalPolicy = await this.policyModel
            .findOne({
            scope: 'GLOBAL',
            active: true,
            $or: [
                { effectiveFrom: { $lte: date }, effectiveTo: null },
                { effectiveFrom: { $lte: date }, effectiveTo: { $gte: date } },
            ],
        })
            .sort({ createdAt: -1 })
            .exec();
        return globalPolicy;
    }
    async updateExceptionWithValidation(exceptionId, validationResult) {
        const exception = await this.exceptionModel.findById(exceptionId).exec();
        if (!exception) {
            throw new common_1.BadRequestException(`Exception with ID ${exceptionId} not found`);
        }
        if (validationResult.valid) {
            exception.contractStartDateValidated = true;
            exception.financialCalendarValidated = true;
            exception.probationDateValidated = true;
        }
        if (validationResult.payrollImpact) {
            exception.affectsPayroll = validationResult.payrollImpact.affectsPayroll;
            exception.payrollImpactType = validationResult.payrollImpact.impactType;
            exception.payrollImpactAmount = validationResult.payrollImpact.impactAmount;
        }
        if (validationResult.benefitsImpact) {
            exception.affectsBenefits = validationResult.benefitsImpact.affectsBenefits;
            exception.benefitsImpactType = validationResult.benefitsImpact.impactType;
            exception.benefitsImpactAmount = validationResult.benefitsImpact.impactAmount;
        }
        return exception.save();
    }
};
exports.PermissionValidationService = PermissionValidationService;
exports.PermissionValidationService = PermissionValidationService = PermissionValidationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(1, (0, mongoose_1.InjectModel)(time_policy_schema_1.TimePolicy.name)),
    __param(2, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PermissionValidationService);
//# sourceMappingURL=permission-validation.service.js.map