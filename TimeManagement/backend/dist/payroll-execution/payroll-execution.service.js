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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExecutionService = exports.UnlockPayrollDto = exports.LockPayrollDto = exports.ResolveIrregularityDto = exports.GenerateDraftPayrollDto = exports.CalculatePayrollDto = exports.ProcessPayrollRunDto = exports.EditPayrollRunDto = exports.ReviewPayrollRunDto = exports.ManualOverrideTerminationBenefitDto = exports.ApproveTerminationBenefitDto = exports.ManualOverrideSigningBonusDto = exports.ApproveSigningBonusDto = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const EmployeeSigningBonus_schema_1 = require("./models/EmployeeSigningBonus.schema");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const payrollRuns_schema_1 = require("./models/payrollRuns.schema");
const employeePayrollDetails_schema_1 = require("./models/employeePayrollDetails.schema");
const payroll_execution_enum_2 = require("./enums/payroll-execution-enum");
const allowance_schema_1 = require("../payroll-configuration/models/allowance.schema");
const taxRules_schema_1 = require("../payroll-configuration/models/taxRules.schema");
const insuranceBrackets_schema_1 = require("../payroll-configuration/models/insuranceBrackets.schema");
const payGrades_schema_1 = require("../payroll-configuration/models/payGrades.schema");
const employee_profile_enums_1 = require("../employee-profile/enums/employee-profile.enums");
const payroll_configuration_enums_1 = require("../payroll-configuration/enums/payroll-configuration-enums");
class ApproveSigningBonusDto {
    approverId;
    comment;
    paymentDate;
}
exports.ApproveSigningBonusDto = ApproveSigningBonusDto;
class ManualOverrideSigningBonusDto {
    authorizedBy;
    comment;
    paymentDate;
    status;
}
exports.ManualOverrideSigningBonusDto = ManualOverrideSigningBonusDto;
class ApproveTerminationBenefitDto {
    approverId;
    comment;
}
exports.ApproveTerminationBenefitDto = ApproveTerminationBenefitDto;
class ManualOverrideTerminationBenefitDto {
    authorizedBy;
    comment;
    status;
}
exports.ManualOverrideTerminationBenefitDto = ManualOverrideTerminationBenefitDto;
class ReviewPayrollRunDto {
    action;
    reviewerId;
    comment;
    rejectionReason;
}
exports.ReviewPayrollRunDto = ReviewPayrollRunDto;
class EditPayrollRunDto {
    authorizedBy;
    comment;
    payrollPeriod;
    entity;
    employees;
    exceptions;
    totalnetpay;
}
exports.EditPayrollRunDto = EditPayrollRunDto;
class ProcessPayrollRunDto {
    payrollSpecialistId;
    payrollPeriod;
    entity;
}
exports.ProcessPayrollRunDto = ProcessPayrollRunDto;
class CalculatePayrollDto {
    employeeIds;
    payrollPeriod;
    payrollRunId;
    payrollSpecialistId;
    entity;
    includeAllowances;
    includeInsurance;
    includeTaxes;
}
exports.CalculatePayrollDto = CalculatePayrollDto;
class GenerateDraftPayrollDto {
    entity;
    payrollSpecialistId;
    payrollPeriod;
}
exports.GenerateDraftPayrollDto = GenerateDraftPayrollDto;
class ResolveIrregularityDto {
    irregularityId;
    resolution;
    resolvedBy;
    action;
}
exports.ResolveIrregularityDto = ResolveIrregularityDto;
class LockPayrollDto {
    payrollManagerId;
    comment;
}
exports.LockPayrollDto = LockPayrollDto;
class UnlockPayrollDto {
    payrollManagerId;
    unlockReason;
    comment;
}
exports.UnlockPayrollDto = UnlockPayrollDto;
let PayrollExecutionService = class PayrollExecutionService {
    signingBonusModel;
    terminationBenefitModel;
    payrollRunModel;
    employeePayrollDetailsModel;
    employeeProfileModel;
    terminationRequestModel;
    clearanceChecklistModel;
    contractModel;
    allowanceModel;
    taxRulesModel;
    insuranceBracketsModel;
    payGradeModel;
    constructor(signingBonusModel, terminationBenefitModel, payrollRunModel, employeePayrollDetailsModel, connection) {
        this.signingBonusModel =
            signingBonusModel ??
                this.createUnavailableModelProxy(EmployeeSigningBonus_schema_1.employeeSigningBonus.name);
        this.terminationBenefitModel =
            terminationBenefitModel ??
                this.createUnavailableModelProxy('EmployeeTerminationResignation');
        this.payrollRunModel =
            payrollRunModel ??
                this.createUnavailableModelProxy(payrollRuns_schema_1.payrollRuns.name);
        this.employeePayrollDetailsModel =
            employeePayrollDetailsModel ??
                this.createUnavailableModelProxy(employeePayrollDetails_schema_1.employeePayrollDetails.name);
        if (!connection) {
            this.employeeProfileModel = this.createUnavailableModelProxy(employee_profile_schema_1.EmployeeProfile.name);
            this.terminationRequestModel = this.createUnavailableModelProxy('TerminationRequest');
            this.clearanceChecklistModel = this.createUnavailableModelProxy('ClearanceChecklist');
            return;
        }
        const existingModel = connection.models[employee_profile_schema_1.EmployeeProfile.name];
        this.employeeProfileModel =
            existingModel ??
                connection.model(employee_profile_schema_1.EmployeeProfile.name);
        this.terminationRequestModel =
            connection.models['TerminationRequest'] ??
                connection.model('TerminationRequest');
        this.clearanceChecklistModel =
            connection.models['ClearanceChecklist'] ??
                connection.model('ClearanceChecklist');
        this.contractModel =
            connection.models['Contract'] ?? connection.model('Contract');
        this.allowanceModel =
            connection.models[allowance_schema_1.allowance.name] ??
                connection.model(allowance_schema_1.allowance.name);
        this.taxRulesModel =
            connection.models[taxRules_schema_1.taxRules.name] ?? connection.model(taxRules_schema_1.taxRules.name);
        this.insuranceBracketsModel =
            connection.models[insuranceBrackets_schema_1.insuranceBrackets.name] ??
                connection.model(insuranceBrackets_schema_1.insuranceBrackets.name);
        this.payGradeModel =
            connection.models[payGrades_schema_1.payGrade.name] ?? connection.model(payGrades_schema_1.payGrade.name);
    }
    async getProcessedSigningBonuses(filter = {}) {
        const query = {
            paymentDate: { $ne: null },
        };
        if (filter.status) {
            if (!Object.values(payroll_execution_enum_1.BonusStatus).includes(filter.status)) {
                throw new common_1.BadRequestException('Unsupported signing bonus status filter');
            }
            query.status = filter.status;
        }
        else {
            query.status = {
                $in: [payroll_execution_enum_1.BonusStatus.PENDING, payroll_execution_enum_1.BonusStatus.APPROVED, payroll_execution_enum_1.BonusStatus.PAID],
            };
        }
        if (filter.employeeId) {
            if (!mongoose_2.Types.ObjectId.isValid(filter.employeeId)) {
                throw new common_1.BadRequestException('Invalid employeeId filter');
            }
            query.employeeId = new mongoose_2.Types.ObjectId(filter.employeeId);
        }
        const signingBonuses = await this.signingBonusModel
            .find(query)
            .populate('signingBonusId')
            .lean()
            .exec();
        if (!signingBonuses.length) {
            return [];
        }
        const employeeIds = Array.from(new Set(signingBonuses
            .map((bonus) => bonus.employeeId?.toString())
            .filter(Boolean)));
        const employees = await this.employeeProfileModel
            .find({ _id: { $in: employeeIds } })
            .lean()
            .exec();
        const employeeMap = new Map(employees.map((employee) => [employee._id.toString(), employee]));
        const reviewItems = [];
        for (const bonus of signingBonuses) {
            if (!bonus.employeeId)
                continue;
            const employee = employeeMap.get(bonus.employeeId.toString());
            if (!employee) {
                continue;
            }
            if (!this.isContractEligible(employee)) {
                continue;
            }
            reviewItems.push(this.buildReviewItem(bonus, employee));
        }
        return reviewItems;
    }
    async approveSigningBonus(signingBonusId, dto = {}) {
        if (!mongoose_2.Types.ObjectId.isValid(signingBonusId)) {
            throw new common_1.BadRequestException('Invalid signing bonus identifier');
        }
        const signingBonus = await this.signingBonusModel
            .findById(signingBonusId)
            .populate('signingBonusId')
            .exec();
        if (!signingBonus) {
            throw new common_1.NotFoundException('Signing bonus record not found');
        }
        if (signingBonus.status === payroll_execution_enum_1.BonusStatus.REJECTED) {
            throw new common_1.BadRequestException('Rejected signing bonuses cannot be approved');
        }
        const employee = await this.employeeProfileModel
            .findById(signingBonus.employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        if (!this.isContractEligible(employee)) {
            throw new common_1.ForbiddenException('Employee contract is not eligible for signing bonuses');
        }
        const overridePaymentDate = this.normalizeDate(dto.paymentDate);
        if (!signingBonus.paymentDate && !overridePaymentDate) {
            throw new common_1.BadRequestException('Signing bonus has not been processed yet');
        }
        if (overridePaymentDate) {
            signingBonus.paymentDate = overridePaymentDate;
        }
        else if (!signingBonus.paymentDate) {
            signingBonus.paymentDate = new Date();
        }
        signingBonus.status = payroll_execution_enum_1.BonusStatus.APPROVED;
        await signingBonus.save();
        const leanBonus = signingBonus.toObject();
        const reviewItem = this.buildReviewItem(leanBonus, employee);
        reviewItem.approvedBy = dto.approverId;
        reviewItem.comment = dto.comment;
        return reviewItem;
    }
    async manuallyOverrideSigningBonus(signingBonusId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(signingBonusId)) {
            throw new common_1.BadRequestException('Invalid signing bonus identifier');
        }
        if (!dto || typeof dto !== 'object') {
            throw new common_1.BadRequestException('Override payload is required');
        }
        const authorizedBy = dto.authorizedBy?.trim();
        if (!authorizedBy) {
            throw new common_1.ForbiddenException('Manual overrides require authorization details');
        }
        if (dto.paymentDate === null) {
            throw new common_1.BadRequestException('Manual overrides require a valid payment date value');
        }
        const signingBonus = await this.signingBonusModel
            .findById(signingBonusId)
            .populate('signingBonusId')
            .exec();
        if (!signingBonus) {
            throw new common_1.NotFoundException('Signing bonus record not found');
        }
        const employee = await this.employeeProfileModel
            .findById(signingBonus.employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        if (!this.isContractEligible(employee)) {
            throw new common_1.ForbiddenException('Employee contract is not eligible for signing bonuses');
        }
        const overrideStatus = this.normalizeOverrideStatus(dto.status);
        if (overrideStatus &&
            signingBonus.status === payroll_execution_enum_1.BonusStatus.APPROVED &&
            overrideStatus !== payroll_execution_enum_1.BonusStatus.APPROVED) {
            signingBonus.status = overrideStatus;
        }
        else if (overrideStatus) {
            signingBonus.status = overrideStatus;
        }
        const overridePaymentDate = dto.paymentDate === undefined
            ? undefined
            : this.normalizeDate(dto.paymentDate);
        if (!signingBonus.paymentDate && !overridePaymentDate) {
            throw new common_1.BadRequestException('Signing bonus has not been processed yet; provide a payment date override first');
        }
        if (overridePaymentDate) {
            signingBonus.paymentDate = overridePaymentDate;
        }
        await signingBonus.save();
        const reviewItem = this.buildReviewItem(signingBonus.toObject(), employee);
        reviewItem.overrideAuthorizedBy = authorizedBy;
        reviewItem.overrideComment = dto.comment;
        return reviewItem;
    }
    isContractEligible(employee) {
        return !!employee?.contractDetails?.signingBonusEligible;
    }
    buildReviewItem(bonus, employee) {
        const { id, amount } = this.extractSigningBonusDetails(bonus.signingBonusId);
        return {
            id: bonus._id?.toString() || '',
            employeeId: bonus.employeeId?.toString() || '',
            employeeName: this.buildEmployeeName(employee),
            status: bonus.status || payroll_execution_enum_1.BonusStatus.PENDING,
            signingBonusId: id,
            signingBonusAmount: amount,
            paymentDate: bonus.paymentDate ?? null,
            eligible: true,
            contractId: this.normalizeObjectId(employee.contractDetails?.contractId),
            contractReference: employee.contractDetails?.contractReference,
        };
    }
    extractSigningBonusDetails(signingBonus) {
        if (!signingBonus) {
            return {};
        }
        if (signingBonus instanceof mongoose_2.Types.ObjectId) {
            return { id: signingBonus.toString() };
        }
        const leanBonus = signingBonus;
        return {
            id: this.normalizeObjectId(leanBonus._id),
            amount: leanBonus.amount,
        };
    }
    buildEmployeeName(employee) {
        if (employee.fullName?.trim()) {
            return employee.fullName.trim();
        }
        return [employee.firstName, employee.lastName]
            .filter(Boolean)
            .join(' ')
            .trim();
    }
    normalizeOverrideStatus(status) {
        if (!status) {
            return undefined;
        }
        const normalized = Object.values(payroll_execution_enum_1.BonusStatus).find((candidate) => candidate === status ||
            candidate.toLowerCase() === status.toString().toLowerCase());
        if (!normalized) {
            throw new common_1.BadRequestException('Unsupported signing bonus status value');
        }
        if (normalized === payroll_execution_enum_1.BonusStatus.APPROVED) {
            throw new common_1.BadRequestException('Manual overrides cannot directly approve signing bonuses');
        }
        return normalized;
    }
    normalizeObjectId(id) {
        if (!id) {
            return undefined;
        }
        return id instanceof mongoose_2.Types.ObjectId ? id.toString() : id;
    }
    normalizeDate(value) {
        if (!value) {
            return undefined;
        }
        const parsed = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            throw new common_1.BadRequestException('Invalid payment date value');
        }
        return parsed;
    }
    async getProcessedTerminationBenefits(filter = {}) {
        const query = {};
        if (filter.status) {
            if (!Object.values(payroll_execution_enum_1.BenefitStatus).includes(filter.status)) {
                throw new common_1.BadRequestException('Unsupported termination benefit status filter');
            }
            query.status = filter.status;
        }
        else {
            query.status = { $in: [payroll_execution_enum_1.BenefitStatus.PENDING, payroll_execution_enum_1.BenefitStatus.PAID] };
        }
        if (filter.employeeId) {
            if (!mongoose_2.Types.ObjectId.isValid(filter.employeeId)) {
                throw new common_1.BadRequestException('Invalid employeeId filter');
            }
            query.employeeId = new mongoose_2.Types.ObjectId(filter.employeeId);
        }
        const terminationBenefits = await this.terminationBenefitModel
            .find(query)
            .populate('benefitId')
            .populate('terminationId')
            .lean()
            .exec();
        if (!terminationBenefits.length) {
            return [];
        }
        const employeeIds = Array.from(new Set(terminationBenefits
            .map((benefit) => benefit.employeeId?.toString())
            .filter(Boolean)));
        const employees = await this.employeeProfileModel
            .find({ _id: { $in: employeeIds } })
            .lean()
            .exec();
        const employeeMap = new Map(employees.map((employee) => [employee._id.toString(), employee]));
        const terminationIds = Array.from(new Set(terminationBenefits
            .map((benefit) => {
            const termId = benefit.terminationId;
            return termId instanceof mongoose_2.Types.ObjectId
                ? termId.toString()
                : termId?._id?.toString();
        })
            .filter(Boolean)));
        const terminationRequests = await this.terminationRequestModel
            .find({ _id: { $in: terminationIds } })
            .lean()
            .exec();
        const terminationMap = new Map(terminationRequests.map((req) => [req._id.toString(), req]));
        const clearanceChecklists = await this.clearanceChecklistModel
            .find({ terminationId: { $in: terminationIds } })
            .lean()
            .exec();
        const clearanceMap = new Map(clearanceChecklists.map((checklist) => [
            checklist.terminationId.toString(),
            checklist,
        ]));
        const reviewItems = [];
        for (const benefit of terminationBenefits) {
            if (!benefit.employeeId)
                continue;
            const employee = employeeMap.get(benefit.employeeId.toString());
            if (!employee) {
                continue;
            }
            const termId = benefit.terminationId instanceof mongoose_2.Types.ObjectId
                ? benefit.terminationId.toString()
                : benefit.terminationId?._id?.toString();
            if (!termId) {
                continue;
            }
            const terminationRequest = terminationMap.get(termId);
            const clearanceChecklist = clearanceMap.get(termId);
            const hrClearanceCompleted = this.isHrClearanceCompleted(terminationRequest, clearanceChecklist);
            if (!hrClearanceCompleted) {
                continue;
            }
            reviewItems.push(this.buildTerminationBenefitReviewItem(benefit, employee, terminationRequest, hrClearanceCompleted));
        }
        return reviewItems;
    }
    async approveTerminationBenefit(terminationBenefitId, dto = {}) {
        if (!mongoose_2.Types.ObjectId.isValid(terminationBenefitId)) {
            throw new common_1.BadRequestException('Invalid termination benefit identifier');
        }
        const terminationBenefit = await this.terminationBenefitModel
            .findById(terminationBenefitId)
            .populate('benefitId')
            .populate('terminationId')
            .exec();
        if (!terminationBenefit) {
            throw new common_1.NotFoundException('Termination benefit record not found');
        }
        if (terminationBenefit.status === payroll_execution_enum_1.BenefitStatus.REJECTED) {
            throw new common_1.BadRequestException('Rejected termination benefits cannot be approved');
        }
        const employee = await this.employeeProfileModel
            .findById(terminationBenefit.employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        const termId = terminationBenefit.terminationId.toString();
        const terminationRequest = await this.terminationRequestModel
            .findById(termId)
            .lean()
            .exec();
        if (!terminationRequest) {
            throw new common_1.NotFoundException('Termination request not found');
        }
        const clearanceChecklist = await this.clearanceChecklistModel
            .findOne({ terminationId: termId })
            .lean()
            .exec();
        const hrClearanceCompleted = this.isHrClearanceCompleted(terminationRequest, clearanceChecklist);
        if (!hrClearanceCompleted) {
            throw new common_1.ForbiddenException('Termination benefits cannot be processed until HR clearance and final approvals are completed');
        }
        if (terminationRequest.status !== 'approved') {
            throw new common_1.ForbiddenException('Termination request must be approved before processing benefits');
        }
        terminationBenefit.status = payroll_execution_enum_1.BenefitStatus.APPROVED;
        await terminationBenefit.save();
        const leanBenefit = terminationBenefit.toObject();
        const reviewItem = this.buildTerminationBenefitReviewItem(leanBenefit, employee, terminationRequest, hrClearanceCompleted);
        reviewItem.approvedBy = dto.approverId;
        reviewItem.comment = dto.comment;
        return reviewItem;
    }
    isHrClearanceCompleted(terminationRequest, clearanceChecklist) {
        if (!terminationRequest) {
            return false;
        }
        if (terminationRequest.status !== 'approved') {
            return false;
        }
        if (!clearanceChecklist) {
            return false;
        }
        if (!clearanceChecklist.items || !Array.isArray(clearanceChecklist.items)) {
            return false;
        }
        const allItemsApproved = clearanceChecklist.items.every((item) => item.status === 'approved');
        if (!allItemsApproved) {
            return false;
        }
        if (clearanceChecklist.equipmentList &&
            Array.isArray(clearanceChecklist.equipmentList)) {
            const allEquipmentReturned = clearanceChecklist.equipmentList.every((equipment) => equipment.returned === true);
            if (!allEquipmentReturned) {
                return false;
            }
        }
        if (clearanceChecklist.cardReturned !== true) {
            return false;
        }
        return true;
    }
    buildTerminationBenefitReviewItem(benefit, employee, terminationRequest, hrClearanceCompleted) {
        const { id, name, amount } = this.extractTerminationBenefitDetails(benefit.benefitId);
        return {
            id: benefit._id?.toString() || '',
            employeeId: benefit.employeeId?.toString() || '',
            employeeName: this.buildEmployeeName(employee),
            status: benefit.status || payroll_execution_enum_1.BenefitStatus.PENDING,
            benefitId: id,
            benefitName: name,
            benefitAmount: amount,
            terminationId: this.normalizeObjectId(benefit.terminationId instanceof mongoose_2.Types.ObjectId
                ? benefit.terminationId
                : benefit.terminationId?._id),
            terminationStatus: terminationRequest?.status,
            hrClearanceCompleted,
            eligible: hrClearanceCompleted,
        };
    }
    extractTerminationBenefitDetails(benefit) {
        if (!benefit) {
            return {};
        }
        if (benefit instanceof mongoose_2.Types.ObjectId) {
            return { id: benefit.toString() };
        }
        const leanBenefit = benefit;
        return {
            id: this.normalizeObjectId(leanBenefit._id),
            name: leanBenefit.name,
            amount: leanBenefit.amount,
        };
    }
    async manuallyOverrideTerminationBenefit(terminationBenefitId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(terminationBenefitId)) {
            throw new common_1.BadRequestException('Invalid termination benefit identifier');
        }
        if (!dto || typeof dto !== 'object') {
            throw new common_1.BadRequestException('Override payload is required');
        }
        const authorizedBy = dto.authorizedBy?.trim();
        if (!authorizedBy) {
            throw new common_1.ForbiddenException('Manual overrides require Payroll Specialist authorization');
        }
        const terminationBenefit = await this.terminationBenefitModel
            .findById(terminationBenefitId)
            .populate('benefitId')
            .populate('terminationId')
            .exec();
        if (!terminationBenefit) {
            throw new common_1.NotFoundException('Termination benefit record not found');
        }
        const employee = await this.employeeProfileModel
            .findById(terminationBenefit.employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        const termId = terminationBenefit.terminationId.toString();
        const terminationRequest = await this.terminationRequestModel
            .findById(termId)
            .lean()
            .exec();
        if (!terminationRequest) {
            throw new common_1.NotFoundException('Termination request not found');
        }
        const clearanceChecklist = await this.clearanceChecklistModel
            .findOne({ terminationId: termId })
            .lean()
            .exec();
        const hrClearanceCompleted = this.isHrClearanceCompleted(terminationRequest, clearanceChecklist);
        if (!hrClearanceCompleted) {
            throw new common_1.ForbiddenException('Termination benefits cannot be manually adjusted until HR clearance is completed');
        }
        const overrideStatus = this.normalizeBenefitStatus(dto.status);
        if (overrideStatus) {
            if (terminationBenefit.status === payroll_execution_enum_1.BenefitStatus.APPROVED &&
                overrideStatus !== payroll_execution_enum_1.BenefitStatus.APPROVED) {
                terminationBenefit.status = overrideStatus;
            }
            else if (overrideStatus !== payroll_execution_enum_1.BenefitStatus.APPROVED) {
                terminationBenefit.status = overrideStatus;
            }
        }
        await terminationBenefit.save();
        this.logSystemAction('TERMINATION_BENEFIT_MANUAL_OVERRIDE', {
            terminationBenefitId: terminationBenefitId,
            authorizedBy,
            previousStatus: terminationBenefit.status,
            newStatus: overrideStatus || terminationBenefit.status,
            comment: dto.comment,
            employeeId: terminationBenefit.employeeId.toString(),
        });
        const leanBenefit = terminationBenefit.toObject();
        const reviewItem = this.buildTerminationBenefitReviewItem(leanBenefit, employee, terminationRequest, hrClearanceCompleted);
        reviewItem.overrideAuthorizedBy = authorizedBy;
        reviewItem.overrideComment = dto.comment;
        return reviewItem;
    }
    async getPayrollRunsForReview(filter = {}) {
        const query = {};
        if (filter.status) {
            if (!Object.values(payroll_execution_enum_2.PayRollStatus).includes(filter.status)) {
                throw new common_1.BadRequestException('Unsupported payroll run status filter');
            }
            query.status = filter.status;
        }
        else {
            query.status = {
                $in: [
                    payroll_execution_enum_2.PayRollStatus.DRAFT,
                    payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW,
                    payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL,
                ],
            };
        }
        if (filter.payrollPeriod) {
            const periodDate = this.normalizeDate(filter.payrollPeriod);
            if (periodDate) {
                query.payrollPeriod = periodDate;
            }
        }
        const payrollRuns = await this.payrollRunModel.find(query).lean().exec();
        return payrollRuns.map((run) => this.buildPayrollRunReviewItem(run));
    }
    async reviewPayrollRun(payrollRunId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        if (!dto.action || !['approve', 'reject'].includes(dto.action)) {
            throw new common_1.BadRequestException('Review action must be either "approve" or "reject"');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (dto.action === 'approve') {
            if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.DRAFT) {
                payrollRun.status = payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW;
                if (dto.reviewerId) {
                    payrollRun.payrollManagerId = new mongoose_2.Types.ObjectId(dto.reviewerId);
                }
                payrollRun.managerApprovalDate = new Date();
            }
            else if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW) {
                payrollRun.status = payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL;
                if (dto.reviewerId) {
                    payrollRun.financeStaffId = new mongoose_2.Types.ObjectId(dto.reviewerId);
                }
                payrollRun.financeApprovalDate = new Date();
            }
            else if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL) {
                payrollRun.status = payroll_execution_enum_2.PayRollStatus.APPROVED;
                payrollRun.paymentStatus = payroll_execution_enum_2.PayRollPaymentStatus.PAID;
            }
            else {
                throw new common_1.BadRequestException('Payroll run cannot be approved in its current status');
            }
        }
        else if (dto.action === 'reject') {
            if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.APPROVED ||
                payrollRun.status === payroll_execution_enum_2.PayRollStatus.LOCKED) {
                throw new common_1.BadRequestException('Approved or locked payroll runs cannot be rejected');
            }
            payrollRun.status = payroll_execution_enum_2.PayRollStatus.REJECTED;
            payrollRun.rejectionReason =
                dto.rejectionReason || dto.comment || 'Rejected by reviewer';
        }
        await payrollRun.save();
        this.logSystemAction('PAYROLL_RUN_REVIEWED', {
            payrollRunId: payrollRunId,
            action: dto.action,
            reviewerId: dto.reviewerId,
            previousStatus: payrollRun.status,
            comment: dto.comment,
            rejectionReason: dto.rejectionReason,
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async editPayrollRun(payrollRunId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        if (!dto || typeof dto !== 'object') {
            throw new common_1.BadRequestException('Edit payload is required');
        }
        const authorizedBy = dto.authorizedBy?.trim();
        if (!authorizedBy) {
            throw new common_1.ForbiddenException('Manual edits require Payroll Specialist authorization');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.REJECTED &&
            payrollRun.status !== payroll_execution_enum_2.PayRollStatus.DRAFT) {
            throw new common_1.ForbiddenException('Payroll runs can only be edited when in DRAFT or REJECTED status');
        }
        const previousState = {
            payrollPeriod: payrollRun.payrollPeriod,
            entity: payrollRun.entity,
            employees: payrollRun.employees,
            exceptions: payrollRun.exceptions,
            totalnetpay: payrollRun.totalnetpay,
        };
        if (dto.payrollPeriod) {
            const periodDate = this.normalizeDate(dto.payrollPeriod);
            if (periodDate) {
                payrollRun.payrollPeriod = periodDate;
            }
        }
        if (dto.entity !== undefined) {
            payrollRun.entity = dto.entity;
        }
        if (dto.employees !== undefined) {
            payrollRun.employees = dto.employees;
        }
        if (dto.exceptions !== undefined) {
            payrollRun.exceptions = dto.exceptions;
        }
        if (dto.totalnetpay !== undefined) {
            payrollRun.totalnetpay = dto.totalnetpay;
        }
        if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.REJECTED) {
            payrollRun.status = payroll_execution_enum_2.PayRollStatus.DRAFT;
            payrollRun.rejectionReason = undefined;
        }
        await payrollRun.save();
        this.logSystemAction('PAYROLL_RUN_MANUAL_EDIT', {
            payrollRunId: payrollRunId,
            authorizedBy,
            previousState,
            newState: {
                payrollPeriod: payrollRun.payrollPeriod,
                entity: payrollRun.entity,
                employees: payrollRun.employees,
                exceptions: payrollRun.exceptions,
                totalnetpay: payrollRun.totalnetpay,
            },
            comment: dto.comment,
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async processPayrollRunAutomatically(dto) {
        if (!dto.payrollPeriod || !dto.entity) {
            throw new common_1.BadRequestException('Payroll period and entity are required for automatic processing');
        }
        const payrollPeriod = this.normalizeDate(dto.payrollPeriod);
        if (!payrollPeriod) {
            throw new common_1.BadRequestException('Invalid payroll period date');
        }
        const existingRun = await this.payrollRunModel
            .findOne({
            payrollPeriod,
            entity: dto.entity,
        })
            .exec();
        if (existingRun && existingRun.status !== payroll_execution_enum_2.PayRollStatus.REJECTED) {
            throw new common_1.BadRequestException('A payroll run already exists for this period and entity');
        }
        const payrollSpecialistId = dto.payrollSpecialistId
            ? new mongoose_2.Types.ObjectId(dto.payrollSpecialistId)
            : undefined;
        const runId = await this.generatePayrollRunId(payrollPeriod);
        const newPayrollRun = new this.payrollRunModel({
            runId,
            payrollPeriod,
            entity: dto.entity,
            status: payroll_execution_enum_2.PayRollStatus.DRAFT,
            employees: 0,
            exceptions: 0,
            totalnetpay: 0,
            payrollSpecialistId: payrollSpecialistId,
            paymentStatus: 'pending',
        });
        await newPayrollRun.save();
        this.logSystemAction('PAYROLL_RUN_AUTOMATIC_PROCESSING_STARTED', {
            payrollRunId: newPayrollRun._id.toString(),
            runId: newPayrollRun.runId,
            payrollPeriod: payrollPeriod.toISOString(),
            entity: dto.entity,
            payrollSpecialistId: dto.payrollSpecialistId,
        });
        return this.buildPayrollRunReviewItem(newPayrollRun.toObject());
    }
    normalizeBenefitStatus(status) {
        if (!status) {
            return undefined;
        }
        const normalized = Object.values(payroll_execution_enum_1.BenefitStatus).find((candidate) => candidate === status ||
            candidate.toLowerCase() === status.toString().toLowerCase());
        if (!normalized) {
            throw new common_1.BadRequestException('Unsupported termination benefit status value');
        }
        if (normalized === payroll_execution_enum_1.BenefitStatus.APPROVED) {
            throw new common_1.BadRequestException('Manual overrides cannot directly approve termination benefits');
        }
        return normalized;
    }
    buildPayrollRunReviewItem(run) {
        return {
            id: run._id.toString(),
            runId: run.runId,
            payrollPeriod: run.payrollPeriod,
            status: run.status,
            entity: run.entity,
            employees: run.employees,
            exceptions: run.exceptions,
            totalnetpay: run.totalnetpay,
            payrollSpecialistId: run.payrollSpecialistId?.toString(),
            payrollManagerId: run.payrollManagerId?.toString(),
            financeStaffId: run.financeStaffId?.toString(),
            paymentStatus: run.paymentStatus,
            rejectionReason: run.rejectionReason,
            managerApprovalDate: run.managerApprovalDate,
            financeApprovalDate: run.financeApprovalDate,
            createdAt: run.createdAt,
            updatedAt: run.updatedAt,
        };
    }
    async generatePayrollRunId(payrollPeriod) {
        const year = payrollPeriod.getFullYear();
        const month = String(payrollPeriod.getMonth() + 1).padStart(2, '0');
        const existingRuns = await this.payrollRunModel
            .find({
            runId: new RegExp(`^PR-${year}-`),
        })
            .sort({ runId: -1 })
            .limit(1)
            .exec();
        let sequence = 1;
        if (existingRuns.length > 0) {
            const lastRunId = existingRuns[0].runId;
            const match = lastRunId.match(/PR-\d{4}-(\d+)/);
            if (match) {
                sequence = parseInt(match[1], 10) + 1;
            }
        }
        return `PR-${year}-${String(sequence).padStart(4, '0')}`;
    }
    async calculatePayrollAutomatically(dto) {
        const payrollPeriod = this.normalizeDate(dto.payrollPeriod);
        if (!payrollPeriod) {
            throw new common_1.BadRequestException('Invalid payroll period date');
        }
        if (!dto.entity) {
            throw new common_1.BadRequestException('Entity name is required');
        }
        let payrollRun;
        if (dto.payrollRunId && mongoose_2.Types.ObjectId.isValid(dto.payrollRunId)) {
            const foundRun = await this.payrollRunModel
                .findById(dto.payrollRunId)
                .exec();
            if (!foundRun) {
                throw new common_1.NotFoundException('Payroll run not found');
            }
            payrollRun = foundRun;
            if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.DRAFT) {
                throw new common_1.BadRequestException('Can only calculate payroll for draft payroll runs');
            }
        }
        else {
            const runId = await this.generatePayrollRunId(payrollPeriod);
            const payrollSpecialistId = dto.payrollSpecialistId
                ? new mongoose_2.Types.ObjectId(dto.payrollSpecialistId)
                : undefined;
            payrollRun = new this.payrollRunModel({
                runId,
                payrollPeriod,
                entity: dto.entity,
                status: payroll_execution_enum_2.PayRollStatus.DRAFT,
                employees: 0,
                exceptions: 0,
                totalnetpay: 0,
                payrollSpecialistId: payrollSpecialistId,
                paymentStatus: payroll_execution_enum_2.PayRollPaymentStatus.PENDING,
            });
            await payrollRun.save();
        }
        let employeeIds = [];
        if (dto.employeeIds && dto.employeeIds.length > 0) {
            employeeIds = dto.employeeIds
                .filter((id) => mongoose_2.Types.ObjectId.isValid(id))
                .map((id) => new mongoose_2.Types.ObjectId(id));
        }
        else {
            const allEmployees = await this.employeeProfileModel
                .find({
                status: { $in: [employee_profile_enums_1.EmployeeStatus.ACTIVE, employee_profile_enums_1.EmployeeStatus.PROBATION] },
            })
                .select('_id')
                .lean()
                .exec();
            employeeIds = allEmployees.map((emp) => emp._id);
        }
        if (employeeIds.length === 0) {
            throw new common_1.BadRequestException('No employees found to process');
        }
        const employees = await this.employeeProfileModel
            .find({ _id: { $in: employeeIds } })
            .lean()
            .exec();
        const contracts = await this.contractModel
            .find({ employeeId: { $in: employeeIds } })
            .lean()
            .exec();
        const contractMap = new Map(contracts.map((contract) => [
            contract.employeeId?.toString(),
            contract,
        ]));
        const allowances = await this.allowanceModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const taxRules = await this.taxRulesModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const insuranceBrackets = await this.insuranceBracketsModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const payGrades = await this.payGradeModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        let totalNetPay = 0;
        let processedEmployees = 0;
        let exceptions = 0;
        const exceptionsList = [];
        for (const employee of employees) {
            try {
                const validationResult = this.validateEmployeeForPayroll(employee, contractMap.get(employee._id.toString()), payrollPeriod);
                if (!validationResult.valid) {
                    exceptions++;
                    exceptionsList.push(`${employee.employeeNumber || employee._id}: ${validationResult.reason}`);
                    continue;
                }
                const contract = contractMap.get(employee._id.toString());
                const includeAllowances = dto.includeAllowances !== false;
                const includeInsurance = dto.includeInsurance !== false;
                const includeTaxes = dto.includeTaxes !== false;
                const calculation = await this.calculateEmployeePayroll(employee, contract, payrollPeriod, { includeAllowances, includeInsurance, includeTaxes }, allowances, taxRules, insuranceBrackets, payGrades);
                const existingDetail = await this.employeePayrollDetailsModel
                    .findOne({
                    employeeId: employee._id,
                    payrollRunId: payrollRun._id,
                })
                    .exec();
                if (existingDetail) {
                    existingDetail.baseSalary = calculation.baseSalary;
                    existingDetail.allowances = calculation.totalAllowances;
                    existingDetail.deductions = calculation.totalDeductions;
                    existingDetail.netSalary = calculation.netSalary;
                    existingDetail.netPay = calculation.netPay;
                    existingDetail.bonus = calculation.bonus;
                    existingDetail.benefit = calculation.benefit;
                    existingDetail.bankStatus = calculation.bankStatus;
                    existingDetail.exceptions = calculation.exceptions;
                    await existingDetail.save();
                }
                else {
                    const payrollDetail = new this.employeePayrollDetailsModel({
                        employeeId: employee._id,
                        payrollRunId: payrollRun._id,
                        baseSalary: calculation.baseSalary,
                        allowances: calculation.totalAllowances,
                        deductions: calculation.totalDeductions,
                        netSalary: calculation.netSalary,
                        netPay: calculation.netPay,
                        bonus: calculation.bonus,
                        benefit: calculation.benefit,
                        bankStatus: calculation.bankStatus,
                        exceptions: calculation.exceptions,
                    });
                    await payrollDetail.save();
                }
                totalNetPay += calculation.netPay;
                processedEmployees++;
            }
            catch (error) {
                exceptions++;
                exceptionsList.push(`${employee.employeeNumber || employee._id}: ${error.message}`);
            }
        }
        payrollRun.employees = processedEmployees;
        payrollRun.exceptions = exceptions;
        payrollRun.totalnetpay = totalNetPay;
        await payrollRun.save();
        this.logSystemAction('PAYROLL_AUTOMATIC_CALCULATION', {
            payrollRunId: payrollRun._id.toString(),
            employeeIds: dto.employeeIds || 'all',
            payrollPeriod: payrollPeriod.toISOString(),
            processedEmployees,
            exceptions,
            totalNetPay,
            exceptionsList,
            includeAllowances: dto.includeAllowances !== false,
            includeInsurance: dto.includeInsurance !== false,
            includeTaxes: dto.includeTaxes !== false,
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    validateEmployeeForPayroll(employee, contract, payrollPeriod) {
        if (!employee) {
            return { valid: false, reason: 'Employee not found' };
        }
        if (employee.status !== employee_profile_enums_1.EmployeeStatus.ACTIVE &&
            employee.status !== employee_profile_enums_1.EmployeeStatus.PROBATION) {
            return {
                valid: false,
                reason: `Employee status is ${employee.status} (must be ACTIVE or PROBATION)`,
            };
        }
        if (employee.status === employee_profile_enums_1.EmployeeStatus.SUSPENDED) {
            return { valid: false, reason: 'Employee is suspended' };
        }
        if (!contract) {
            return { valid: false, reason: 'Employee contract not found' };
        }
        if (employee.contractEndDate &&
            new Date(employee.contractEndDate) < payrollPeriod) {
            return { valid: false, reason: 'Employee contract has expired' };
        }
        if (employee.contractStartDate &&
            new Date(employee.contractStartDate) > payrollPeriod) {
            return { valid: false, reason: 'Employee contract has not started yet' };
        }
        if (!contract.grossSalary || contract.grossSalary <= 0) {
            return { valid: false, reason: 'Invalid contract gross salary' };
        }
        return { valid: true };
    }
    async calculateEmployeePayroll(employee, contract, payrollPeriod, schemaOptions, allowances, taxRules, insuranceBrackets, payGrades) {
        let baseSalary = this.calculateBaseSalary(employee, contract, payGrades);
        const periodStart = new Date(payrollPeriod.getFullYear(), payrollPeriod.getMonth(), 1);
        const periodEnd = new Date(payrollPeriod.getFullYear(), payrollPeriod.getMonth() + 1, 0);
        const daysInPeriod = periodEnd.getDate();
        const contractStart = contract.startDate
            ? new Date(contract.startDate)
            : employee.hireDate
                ? new Date(employee.hireDate)
                : null;
        const contractEnd = contract.endDate
            ? new Date(contract.endDate)
            : employee.contractEndDate
                ? new Date(employee.contractEndDate)
                : null;
        let workedDays = daysInPeriod;
        if (contractStart && contractStart > periodStart) {
            const from = contractStart;
            const to = contractEnd && contractEnd < periodEnd ? contractEnd : periodEnd;
            if (to >= from) {
                workedDays =
                    Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) +
                        1;
            }
            else {
                workedDays = 0;
            }
        }
        else if (contractEnd && contractEnd < periodEnd) {
            const from = contractStart && contractStart > periodStart
                ? contractStart
                : periodStart;
            const to = contractEnd;
            if (to >= from) {
                workedDays =
                    Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) +
                        1;
            }
            else {
                workedDays = 0;
            }
        }
        const prorateFactor = daysInPeriod > 0
            ? Math.max(0, Math.min(1, workedDays / daysInPeriod))
            : 1;
        const proratedBaseSalary = Math.round(baseSalary * prorateFactor * 100) / 100;
        baseSalary = proratedBaseSalary;
        const allowanceBreakdown = [];
        let totalAllowances = 0;
        if (schemaOptions.includeAllowances) {
            for (const allowance of allowances) {
                const amount = allowance.amount || 0;
                const proratedAmount = Math.round(amount * prorateFactor * 100) / 100;
                allowanceBreakdown.push({
                    name: allowance.name,
                    amount: proratedAmount,
                });
                totalAllowances += proratedAmount;
            }
        }
        const grossSalary = Math.round((baseSalary + totalAllowances) * 100) / 100;
        const taxBreakdown = [];
        let totalTaxes = 0;
        if (schemaOptions.includeTaxes) {
            for (const taxRule of taxRules) {
                const taxAmount = Math.round(((grossSalary * (taxRule.rate || 0)) / 100) * 100) / 100;
                taxBreakdown.push({
                    name: taxRule.name,
                    rate: taxRule.rate,
                    amount: taxAmount,
                });
                totalTaxes += taxAmount;
            }
        }
        const insuranceBreakdown = [];
        let totalInsurance = 0;
        if (schemaOptions.includeInsurance) {
            for (const insurance of insuranceBrackets) {
                if (grossSalary >= (insurance.minSalary || 0) &&
                    grossSalary <= (insurance.maxSalary || Infinity)) {
                    const employeeAmount = Math.round(((grossSalary * (insurance.employeeRate || 0)) / 100) * 100) / 100;
                    const employerAmount = Math.round(((grossSalary * (insurance.employerRate || 0)) / 100) * 100) / 100;
                    insuranceBreakdown.push({
                        name: insurance.name,
                        employeeRate: insurance.employeeRate,
                        employerRate: insurance.employerRate,
                        employeeAmount,
                        employerAmount,
                    });
                    totalInsurance += employeeAmount;
                }
            }
        }
        const netSalary = Math.round((grossSalary - totalTaxes - totalInsurance) * 100) / 100;
        const unpaidLeaveDays = employee.unpaidLeaveDays ?? 0;
        const dailyRate = grossSalary / 30;
        const unpaidLeaveDeduction = Math.round(unpaidLeaveDays * dailyRate * 100) / 100;
        const penalties = await this.getEmployeePenalties(employee._id);
        const penaltiesAmount = penalties > 0 ? penalties : 0;
        const payGrade = employee.payGradeId
            ? payGrades.find((pg) => pg._id.toString() === employee.payGradeId.toString())
            : undefined;
        const statutoryMin = contract.minimumWage ||
            payGrade?.minimumWage ||
            Number(process.env.STATUTORY_MIN_WAGE) ||
            6000;
        const netAfterUnpaidLeave = Math.round((netSalary - unpaidLeaveDeduction) * 100) / 100;
        const maxPenaltyAllowed = Math.max(0, netAfterUnpaidLeave - statutoryMin);
        const appliedPenalties = Math.min(penaltiesAmount, maxPenaltyAllowed);
        const recoveries = employee.recoveries ?? 0;
        const refunds = employee.refunds ?? 0;
        let netPay = Math.round((netAfterUnpaidLeave - appliedPenalties - recoveries + refunds) * 100) / 100;
        if (netPay < statutoryMin) {
            netPay = statutoryMin;
        }
        const otherDeductions = [];
        if (unpaidLeaveDeduction > 0) {
            otherDeductions.push({
                name: 'Unpaid Leave',
                amount: unpaidLeaveDeduction,
            });
        }
        if (appliedPenalties > 0) {
            otherDeductions.push({ name: 'Penalties', amount: appliedPenalties });
        }
        if (recoveries > 0) {
            otherDeductions.push({ name: 'Recoveries', amount: recoveries });
        }
        const totalDeductions = Math.round((totalTaxes +
            totalInsurance +
            unpaidLeaveDeduction +
            appliedPenalties +
            recoveries) *
            100) / 100;
        const breakdown = {
            grossSalary,
            baseSalary,
            prorateFactor,
            workedDays,
            daysInPeriod,
            allowances: allowanceBreakdown,
            taxes: taxBreakdown,
            insurance: insuranceBreakdown,
            otherDeductions,
            penalties: penaltiesAmount || 0,
            appliedPenalties,
            unpaidLeaveDays,
            unpaidLeaveDeduction,
            refunds: refunds || 0,
            recoveries: recoveries || 0,
            statutoryMinimum: statutoryMin,
            bonuses: 0,
            benefits: 0,
        };
        const bankStatus = this.checkBankStatus(employee);
        return {
            baseSalary,
            totalAllowances,
            totalDeductions,
            netSalary,
            netPay,
            breakdown,
            bankStatus,
        };
    }
    calculateBaseSalary(employee, contract, payGrades) {
        if (contract?.grossSalary) {
            return contract.grossSalary;
        }
        if (employee.payGradeId) {
            const payGrade = payGrades.find((pg) => pg._id.toString() === employee.payGradeId.toString());
            if (payGrade?.baseSalary) {
                return payGrade.baseSalary;
            }
        }
        throw new common_1.BadRequestException(`Unable to determine base salary for employee ${employee.employeeNumber || employee._id}`);
    }
    async getEmployeePenalties(employeeId) {
        try {
            const penaltiesModel = this.employeeProfileModel.db.models['employeePenalties'];
            if (!penaltiesModel) {
                return 0;
            }
            const penalties = await penaltiesModel.find({ employeeId }).lean().exec();
            return penalties.reduce((sum, p) => sum + (p.amount || 0), 0);
        }
        catch {
            return 0;
        }
    }
    checkBankStatus(employee) {
        return employee.bankAccountNumber ? payroll_execution_enum_2.BankStatus.VALID : payroll_execution_enum_2.BankStatus.MISSING;
    }
    logSystemAction(action, details) {
        const logEntry = {
            timestamp: new Date(),
            action,
            details: JSON.stringify(details),
        };
        console.log('[PAYROLL_SYSTEM_LOG]', JSON.stringify(logEntry, null, 2));
    }
    createUnavailableModelProxy(modelName) {
        return new Proxy({}, {
            get: (_, prop) => {
                throw new Error(`Model "${modelName}" is unavailable (missing provider for property "${String(prop)}").`);
            },
        });
    }
    async handleNewHireEvent(employeeId, onboardingPayload) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employee identifier');
        }
        const employee = await this.employeeProfileModel
            .findById(employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        const contract = await this.contractModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .lean()
            .exec();
        const eligibleByContract = !!(contract &&
            !Array.isArray(contract) &&
            (contract.signingBonusEligible || contract.signingBonusAmount));
        const eligibleByOnboarding = !!onboardingPayload?.signingBonusFlag;
        const amount = onboardingPayload?.signingBonusAmount ??
            (contract && !Array.isArray(contract)
                ? contract.signingBonusAmount
                : undefined) ??
            0;
        if (!eligibleByContract && !eligibleByOnboarding) {
            return null;
        }
        const paymentDate = (onboardingPayload?.paymentDate
            ? this.normalizeDate(onboardingPayload.paymentDate)
            : undefined) ?? new Date();
        const newRecord = {
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            signingBonusId: (contract && !Array.isArray(contract)
                ? contract.signingBonusId
                : undefined) ?? undefined,
            givenAmount: amount,
            paymentDate,
            status: payroll_execution_enum_1.BonusStatus.PENDING,
            processedAutomatically: true,
            createdAt: new Date(),
        };
        const created = await this.signingBonusModel.create(newRecord);
        this.logSystemAction('AUTO_PROCESS_SIGNING_BONUS', {
            employeeId,
            signingBonusId: created._id?.toString?.(),
            amount,
            paymentDate: paymentDate.toISOString(),
        });
        return created;
    }
    async handleResignationEvent(employeeId, terminationId, opts) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employee identifier');
        }
        const employee = await this.employeeProfileModel
            .findById(employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        const contract = await this.contractModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .lean()
            .exec();
        if (!contract || Array.isArray(contract)) {
            throw new common_1.BadRequestException('Employee contract not found');
        }
        const termDate = (opts?.terminationDate
            ? this.normalizeDate(opts.terminationDate)
            : undefined) ?? new Date();
        const start = contract.startDate
            ? new Date(contract.startDate)
            : employee.hireDate
                ? new Date(employee.hireDate)
                : null;
        const tenureYears = start
            ? Math.max(0, (termDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365))
            : 0;
        const grossSalary = contract.grossSalary || 0;
        const gratuity = Math.floor((grossSalary * (tenureYears || 0)) / 12);
        const accruedDays = employee.accruedLeaveDays ?? 0;
        const dailyRate = grossSalary / 30;
        const accruedLeavePayout = Math.round(accruedDays * dailyRate);
        const pendingAllowances = 0;
        const benefitsToCreate = [
            { name: 'Gratuity', amount: gratuity },
            { name: 'Accrued Leave Payout', amount: accruedLeavePayout },
        ];
        const createdRecords = [];
        for (const b of benefitsToCreate) {
            const record = {
                employeeId: new mongoose_2.Types.ObjectId(employeeId),
                benefitId: { _id: b.name, name: b.name, amount: b.amount },
                terminationId: new mongoose_2.Types.ObjectId(terminationId),
                amount: b.amount,
                status: payroll_execution_enum_1.BenefitStatus.PENDING,
                createdAt: new Date(),
                processedAutomatically: true,
            };
            const created = await this.terminationBenefitModel.create(record);
            createdRecords.push(created);
        }
        this.logSystemAction('AUTO_PROCESS_RESIGNATION_BENEFITS', {
            employeeId,
            terminationId,
            termDate: termDate.toISOString(),
            createdCount: createdRecords.length,
        });
        return createdRecords;
    }
    async handleTerminationEvent(employeeId, terminationId, opts) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employee identifier');
        }
        const employee = await this.employeeProfileModel
            .findById(employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        const contract = await this.contractModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .lean()
            .exec();
        if (!contract || Array.isArray(contract)) {
            throw new common_1.BadRequestException('Employee contract not found');
        }
        const termDate = (opts?.terminationDate
            ? this.normalizeDate(opts.terminationDate)
            : undefined) ?? new Date();
        const start = contract.startDate
            ? new Date(contract.startDate)
            : employee.hireDate
                ? new Date(employee.hireDate)
                : null;
        const tenureYears = start
            ? Math.max(0, (termDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365))
            : 0;
        const grossSalary = contract.grossSalary || 0;
        const includeSeverance = opts?.includeSeverance ?? true;
        const severance = includeSeverance
            ? Math.round(grossSalary * tenureYears)
            : 0;
        const gratuity = Math.floor((grossSalary * (tenureYears || 0)) / 12);
        const pendingCompensation = 0;
        const benefitsToCreate = [
            { name: 'Severance', amount: severance },
            { name: 'Gratuity', amount: gratuity },
            { name: 'Pending Compensation', amount: pendingCompensation },
        ];
        const createdRecords = [];
        for (const b of benefitsToCreate) {
            if (!b.amount || b.amount <= 0)
                continue;
            const record = {
                employeeId: new mongoose_2.Types.ObjectId(employeeId),
                benefitId: { _id: b.name, name: b.name, amount: b.amount },
                terminationId: new mongoose_2.Types.ObjectId(terminationId),
                givenAmount: b.amount,
                status: payroll_execution_enum_1.BenefitStatus.PENDING,
                createdAt: new Date(),
                processedAutomatically: true,
            };
            const created = await this.terminationBenefitModel.create(record);
            createdRecords.push(created);
        }
        this.logSystemAction('AUTO_PROCESS_TERMINATION_BENEFITS', {
            employeeId,
            terminationId,
            termDate: termDate.toISOString(),
            createdCount: createdRecords.length,
        });
        return createdRecords;
    }
    async generatePayslip(employeeId, payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId) ||
            !mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid employee or payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        const employeePayrollDetail = await this.employeePayrollDetailsModel
            .findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId),
        })
            .exec();
        if (!employeePayrollDetail) {
            throw new common_1.NotFoundException('Employee payroll details not found for this payroll run');
        }
        const employee = await this.employeeProfileModel
            .findById(employeeId)
            .lean()
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Employee profile not found');
        }
        const contract = await this.contractModel
            .findOne({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .lean()
            .exec();
        const allowances = await this.allowanceModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const taxRules = await this.taxRulesModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const insuranceBrackets = await this.insuranceBracketsModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const payGrades = await this.payGradeModel
            .find({ status: payroll_configuration_enums_1.ConfigStatus.APPROVED })
            .lean()
            .exec();
        const calculation = await this.calculateEmployeePayroll(employee, contract, payrollRun.payrollPeriod, { includeAllowances: true, includeInsurance: true, includeTaxes: true }, allowances, taxRules, insuranceBrackets, payGrades);
        const earningsDetails = {
            baseSalary: calculation.baseSalary,
            allowances: calculation.breakdown.allowances || [],
            bonuses: [],
            benefits: [],
            refunds: calculation.breakdown.refunds > 0
                ? [{ name: 'Refund', amount: calculation.breakdown.refunds }]
                : [],
        };
        const deductionsDetails = {
            taxes: calculation.breakdown.taxes || [],
            insurances: calculation.breakdown.insurance || [],
            penalties: calculation.breakdown.appliedPenalties > 0
                ? {
                    reason: 'Misconduct penalties',
                    amount: calculation.breakdown.appliedPenalties,
                }
                : undefined,
        };
        const PaySlipModel = this.employeeProfileModel.db.models['paySlip'];
        if (!PaySlipModel) {
            throw new Error('PaySlip model not available');
        }
        const existingPayslip = await PaySlipModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId),
        }).exec();
        if (existingPayslip) {
            existingPayslip.earningsDetails = earningsDetails;
            existingPayslip.deductionsDetails = deductionsDetails;
            existingPayslip.totalGrossSalary = calculation.breakdown.grossSalary;
            existingPayslip.totaDeductions = calculation.totalDeductions;
            existingPayslip.netPay = calculation.netPay;
            await existingPayslip.save();
            this.logSystemAction('PAYSLIP_UPDATED', {
                employeeId,
                payrollRunId,
                payslipId: existingPayslip._id.toString(),
                netPay: calculation.netPay,
            });
            return existingPayslip.toObject();
        }
        const newPayslip = new PaySlipModel({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId),
            earningsDetails,
            deductionsDetails,
            totalGrossSalary: calculation.breakdown.grossSalary,
            totaDeductions: calculation.totalDeductions,
            netPay: calculation.netPay,
            paymentStatus: 'pending',
        });
        await newPayslip.save();
        this.logSystemAction('PAYSLIP_GENERATED', {
            employeeId,
            payrollRunId,
            payslipId: newPayslip._id.toString(),
            netPay: calculation.netPay,
        });
        return newPayslip.toObject();
    }
    async generatePayslipsForPayrollRun(payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.APPROVED) {
            throw new common_1.BadRequestException('Payroll run must be approved before generating payslips');
        }
        const employeePayrollDetails = await this.employeePayrollDetailsModel
            .find({ payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId) })
            .lean()
            .exec();
        if (!employeePayrollDetails.length) {
            throw new common_1.NotFoundException('No employee payroll details found for this payroll run');
        }
        const payslips = [];
        const errors = [];
        for (const detail of employeePayrollDetails) {
            try {
                const payslip = await this.generatePayslip(detail.employeeId.toString(), payrollRunId);
                payslips.push(payslip);
            }
            catch (error) {
                errors.push(`Employee ${detail.employeeId}: ${error.message}`);
            }
        }
        this.logSystemAction('PAYSLIPS_BATCH_GENERATED', {
            payrollRunId,
            successCount: payslips.length,
            errorCount: errors.length,
            errors,
        });
        return payslips;
    }
    async getPayslip(employeeId, payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId) ||
            !mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid employee or payroll run identifier');
        }
        const PaySlipModel = this.employeeProfileModel.db.models['paySlip'];
        if (!PaySlipModel) {
            throw new Error('PaySlip model not available');
        }
        const payslip = await PaySlipModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId),
        })
            .populate('employeeId')
            .populate('payrollRunId')
            .lean()
            .exec();
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        return payslip;
    }
    async getPayslipsForPayrollRun(payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const PaySlipModel = this.employeeProfileModel.db.models['paySlip'];
        if (!PaySlipModel) {
            throw new Error('PaySlip model not available');
        }
        const payslips = await PaySlipModel.find({
            payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId),
        })
            .populate('employeeId')
            .lean()
            .exec();
        return payslips;
    }
    async generateDraftPayrollAutomatically(dto) {
        if (!dto.entity) {
            throw new common_1.BadRequestException('Entity name is required');
        }
        let payrollPeriod;
        if (dto.payrollPeriod) {
            payrollPeriod = this.normalizeDate(dto.payrollPeriod);
        }
        else {
            const now = new Date();
            payrollPeriod = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        }
        const existingDraft = await this.payrollRunModel
            .findOne({
            payrollPeriod,
            entity: dto.entity,
            status: payroll_execution_enum_2.PayRollStatus.DRAFT,
        })
            .exec();
        if (existingDraft) {
            return this.getPayrollPreviewDashboard(existingDraft._id.toString());
        }
        const runId = await this.generatePayrollRunId(payrollPeriod);
        const payrollSpecialistId = dto.payrollSpecialistId
            ? new mongoose_2.Types.ObjectId(dto.payrollSpecialistId)
            : undefined;
        const draftPayrollRun = new this.payrollRunModel({
            runId,
            payrollPeriod,
            entity: dto.entity,
            status: payroll_execution_enum_2.PayRollStatus.DRAFT,
            employees: 0,
            exceptions: 0,
            totalnetpay: 0,
            payrollSpecialistId,
            paymentStatus: payroll_execution_enum_2.PayRollPaymentStatus.PENDING,
        });
        await draftPayrollRun.save();
        const calculateDto = {
            payrollPeriod,
            entity: dto.entity,
            payrollRunId: draftPayrollRun._id.toString(),
            payrollSpecialistId: dto.payrollSpecialistId,
            includeAllowances: true,
            includeInsurance: true,
            includeTaxes: true,
        };
        await this.calculatePayrollAutomatically(calculateDto);
        this.logSystemAction('DRAFT_PAYROLL_AUTO_GENERATED', {
            payrollRunId: draftPayrollRun._id.toString(),
            runId,
            payrollPeriod: payrollPeriod.toISOString(),
            entity: dto.entity,
            payrollSpecialistId: dto.payrollSpecialistId,
        });
        return this.getPayrollPreviewDashboard(draftPayrollRun._id.toString());
    }
    async getPayrollPreviewDashboard(payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        const employeePayrollDetails = await this.employeePayrollDetailsModel
            .find({ payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId) })
            .lean()
            .exec();
        const employeeIds = employeePayrollDetails.map((d) => d.employeeId);
        const employees = await this.employeeProfileModel
            .find({ _id: { $in: employeeIds } })
            .lean()
            .exec();
        const employeeMap = new Map(employees.map((emp) => [emp._id.toString(), emp]));
        let totalGrossPay = 0;
        let totalDeductions = 0;
        let totalNetPay = 0;
        const totalTaxes = 0;
        const totalInsurance = 0;
        const employeeBreakdown = [];
        for (const detail of employeePayrollDetails) {
            const employee = employeeMap.get(detail.employeeId.toString());
            if (!employee)
                continue;
            const grossSalary = detail.baseSalary + detail.allowances;
            totalGrossPay += grossSalary;
            totalDeductions += detail.deductions;
            totalNetPay += detail.netPay;
            employeeBreakdown.push({
                employeeId: detail.employeeId.toString(),
                employeeName: this.buildEmployeeName(employee),
                employeeNumber: employee.employeeNumber || 'N/A',
                baseSalary: detail.baseSalary,
                allowances: detail.allowances,
                grossSalary,
                deductions: detail.deductions,
                netSalary: detail.netSalary,
                netPay: detail.netPay,
                bankStatus: detail.bankStatus,
                hasIrregularities: false,
            });
        }
        const irregularities = await this.detectPayrollIrregularities(payrollRunId, employeePayrollDetails, employeeMap);
        const employeesWithIrregularities = new Set(irregularities.map((i) => i.employeeId));
        employeeBreakdown.forEach((emp) => {
            emp.hasIrregularities = employeesWithIrregularities.has(emp.employeeId);
        });
        const approvalWorkflow = this.buildApprovalWorkflow(payrollRun);
        const canEdit = payrollRun.status === payroll_execution_enum_2.PayRollStatus.DRAFT ||
            payrollRun.status === payroll_execution_enum_2.PayRollStatus.REJECTED;
        const canApprove = payrollRun.status !== payroll_execution_enum_2.PayRollStatus.APPROVED &&
            payrollRun.status !== payroll_execution_enum_2.PayRollStatus.LOCKED;
        const canReject = payrollRun.status !== payroll_execution_enum_2.PayRollStatus.APPROVED &&
            payrollRun.status !== payroll_execution_enum_2.PayRollStatus.LOCKED;
        return {
            payrollRunId: payrollRun._id.toString(),
            runId: payrollRun.runId,
            status: payrollRun.status,
            payrollPeriod: payrollRun.payrollPeriod,
            entity: payrollRun.entity,
            summary: {
                totalEmployees: employees.length,
                processedEmployees: payrollRun.employees,
                exceptions: payrollRun.exceptions,
                totalGrossPay: Math.round(totalGrossPay * 100) / 100,
                totalDeductions: Math.round(totalDeductions * 100) / 100,
                totalNetPay: Math.round(totalNetPay * 100) / 100,
                totalTaxes: Math.round(totalTaxes * 100) / 100,
                totalInsurance: Math.round(totalInsurance * 100) / 100,
            },
            irregularities,
            employeeBreakdown,
            approvalWorkflow,
            canEdit,
            canApprove,
            canReject,
        };
    }
    async detectPayrollIrregularities(payrollRunId, currentPayrollDetails, employeeMap) {
        const irregularities = [];
        const currentRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!currentRun)
            return irregularities;
        const previousRun = await this.payrollRunModel
            .findOne({
            entity: currentRun.entity,
            payrollPeriod: { $lt: currentRun.payrollPeriod },
            status: { $in: [payroll_execution_enum_2.PayRollStatus.APPROVED, payroll_execution_enum_2.PayRollStatus.LOCKED] },
        })
            .sort({ payrollPeriod: -1 })
            .limit(1)
            .exec();
        let previousPayrollDetails = [];
        if (previousRun) {
            previousPayrollDetails = await this.employeePayrollDetailsModel
                .find({ payrollRunId: previousRun._id })
                .lean()
                .exec();
        }
        const previousPayrollMap = new Map(previousPayrollDetails.map((d) => [d.employeeId.toString(), d]));
        for (const currentDetail of currentPayrollDetails) {
            const employee = employeeMap.get(currentDetail.employeeId.toString());
            if (!employee)
                continue;
            const employeeName = this.buildEmployeeName(employee);
            const employeeId = currentDetail.employeeId.toString();
            if (currentDetail.bankStatus === payroll_execution_enum_2.BankStatus.MISSING) {
                irregularities.push({
                    type: 'missing_bank',
                    severity: 'high',
                    employeeId,
                    employeeName,
                    message: `Employee ${employeeName} has missing bank account details`,
                });
            }
            if (currentDetail.netPay < 0) {
                irregularities.push({
                    type: 'negative_net_pay',
                    severity: 'high',
                    employeeId,
                    employeeName,
                    message: `Employee ${employeeName} has negative net pay: ${currentDetail.netPay} EGP`,
                    currentValue: currentDetail.netPay,
                });
            }
            if (currentDetail.netPay === 0 && currentDetail.baseSalary > 0) {
                irregularities.push({
                    type: 'zero_salary',
                    severity: 'medium',
                    employeeId,
                    employeeName,
                    message: `Employee ${employeeName} has zero net pay despite having base salary`,
                    currentValue: currentDetail.netPay,
                });
            }
            if (previousPayrollMap.has(employeeId)) {
                const previousDetail = previousPayrollMap.get(employeeId);
                const currentNetPay = currentDetail.netPay;
                const previousNetPay = previousDetail.netPay;
                const threshold = 0.3;
                const percentageChange = Math.abs((currentNetPay - previousNetPay) / previousNetPay);
                if (percentageChange > threshold && previousNetPay > 0) {
                    const direction = currentNetPay > previousNetPay ? 'increase' : 'decrease';
                    irregularities.push({
                        type: 'salary_spike',
                        severity: percentageChange > 0.5 ? 'high' : 'medium',
                        employeeId,
                        employeeName,
                        message: `Employee ${employeeName} has sudden salary ${direction}: ${Math.round(percentageChange * 100)}% change`,
                        currentValue: currentNetPay,
                        previousValue: previousNetPay,
                        threshold: threshold * 100,
                    });
                }
            }
            const grossSalary = currentDetail.baseSalary + currentDetail.allowances;
            const deductionPercentage = (currentDetail.deductions / grossSalary) * 100;
            if (deductionPercentage > 40 && grossSalary > 0) {
                irregularities.push({
                    type: 'unusual_deduction',
                    severity: deductionPercentage > 60 ? 'high' : 'medium',
                    employeeId,
                    employeeName,
                    message: `Employee ${employeeName} has unusually high deductions: ${Math.round(deductionPercentage)}% of gross salary`,
                    currentValue: currentDetail.deductions,
                    threshold: 40,
                });
            }
            if (currentDetail.exceptions && currentDetail.exceptions.trim() !== '') {
                irregularities.push({
                    type: 'zero_salary',
                    severity: 'low',
                    employeeId,
                    employeeName,
                    message: `Employee ${employeeName} has processing exception: ${currentDetail.exceptions}`,
                });
            }
        }
        return irregularities;
    }
    buildApprovalWorkflow(payrollRun) {
        let currentStep = 'specialist';
        if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.DRAFT) {
            currentStep = 'specialist';
        }
        else if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW) {
            currentStep = 'manager';
        }
        else if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL) {
            currentStep = 'finance';
        }
        else if (payrollRun.status === payroll_execution_enum_2.PayRollStatus.APPROVED ||
            payrollRun.status === payroll_execution_enum_2.PayRollStatus.LOCKED) {
            currentStep = 'completed';
        }
        return {
            currentStep,
            specialist: {
                id: payrollRun.payrollSpecialistId?.toString(),
                date: payrollRun.createdAt,
                status: payrollRun.status === payroll_execution_enum_2.PayRollStatus.DRAFT ? 'pending' : 'completed',
            },
            manager: {
                id: payrollRun.payrollManagerId?.toString(),
                date: payrollRun.managerApprovalDate,
                status: payrollRun.status === payroll_execution_enum_2.PayRollStatus.DRAFT
                    ? 'pending'
                    : payrollRun.status === payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW
                        ? 'in_review'
                        : payrollRun.managerApprovalDate
                            ? 'completed'
                            : 'pending',
            },
            finance: {
                id: payrollRun.financeStaffId?.toString(),
                date: payrollRun.financeApprovalDate,
                status: payrollRun.status === payroll_execution_enum_2.PayRollStatus.APPROVED ||
                    payrollRun.status === payroll_execution_enum_2.PayRollStatus.LOCKED
                    ? 'completed'
                    : payrollRun.status === payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL
                        ? 'in_review'
                        : 'pending',
            },
        };
    }
    async sendForManagerApproval(payrollRunId, payrollSpecialistId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.DRAFT) {
            throw new common_1.BadRequestException('Only DRAFT payroll runs can be sent for manager approval');
        }
        const employeePayrollDetails = await this.employeePayrollDetailsModel
            .find({ payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId) })
            .lean()
            .exec();
        const employeeIds = employeePayrollDetails.map((d) => d.employeeId);
        const employees = await this.employeeProfileModel
            .find({ _id: { $in: employeeIds } })
            .lean()
            .exec();
        const employeeMap = new Map(employees.map((emp) => [emp._id.toString(), emp]));
        const irregularities = await this.detectPayrollIrregularities(payrollRunId, employeePayrollDetails, employeeMap);
        const highSeverityIrregularities = irregularities.filter((i) => i.severity === 'high');
        if (highSeverityIrregularities.length > 0) {
            throw new common_1.BadRequestException(`Cannot send for approval: ${highSeverityIrregularities.length} high-severity irregularities detected. Please resolve them first.`);
        }
        payrollRun.status = payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW;
        if (payrollSpecialistId) {
            payrollRun.payrollSpecialistId = new mongoose_2.Types.ObjectId(payrollSpecialistId);
        }
        await payrollRun.save();
        this.logSystemAction('PAYROLL_SENT_FOR_MANAGER_APPROVAL', {
            payrollRunId: payrollRunId,
            runId: payrollRun.runId,
            payrollSpecialistId,
            irregularitiesCount: irregularities.length,
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async sendForFinanceApproval(payrollRunId, payrollManagerId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException('Only payroll runs UNDER_REVIEW can be sent for finance approval');
        }
        payrollRun.status = payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL;
        if (payrollManagerId) {
            payrollRun.payrollManagerId = new mongoose_2.Types.ObjectId(payrollManagerId);
        }
        payrollRun.managerApprovalDate = new Date();
        await payrollRun.save();
        this.logSystemAction('PAYROLL_SENT_FOR_FINANCE_APPROVAL', {
            payrollRunId: payrollRunId,
            runId: payrollRun.runId,
            payrollManagerId,
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async finalApprovalByFinance(payrollRunId, financeStaffId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.PENDING_FINANCE_APPROVAL) {
            throw new common_1.BadRequestException('Only payroll runs PENDING_FINANCE_APPROVAL can be finally approved');
        }
        payrollRun.status = payroll_execution_enum_2.PayRollStatus.APPROVED;
        payrollRun.paymentStatus = payroll_execution_enum_2.PayRollPaymentStatus.PAID;
        if (financeStaffId) {
            payrollRun.financeStaffId = new mongoose_2.Types.ObjectId(financeStaffId);
        }
        payrollRun.financeApprovalDate = new Date();
        await payrollRun.save();
        this.logSystemAction('PAYROLL_FINAL_APPROVAL_BY_FINANCE', {
            payrollRunId: payrollRunId,
            runId: payrollRun.runId,
            financeStaffId,
        });
        try {
            await this.generateAndDistributePayslipsAutomatically(payrollRunId);
        }
        catch (error) {
            this.logSystemAction('PAYSLIP_AUTO_GENERATION_ERROR', {
                payrollRunId,
                error: error.message,
            });
        }
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async getEscalatedIrregularities(payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        const employeePayrollDetails = await this.employeePayrollDetailsModel
            .find({ payrollRunId: new mongoose_2.Types.ObjectId(payrollRunId) })
            .lean()
            .exec();
        const employeeIds = employeePayrollDetails.map((d) => d.employeeId);
        const employees = await this.employeeProfileModel
            .find({ _id: { $in: employeeIds } })
            .lean()
            .exec();
        const employeeMap = new Map(employees.map((emp) => [emp._id.toString(), emp]));
        const irregularities = await this.detectPayrollIrregularities(payrollRunId, employeePayrollDetails, employeeMap);
        const escalatedIrregularities = irregularities
            .filter((i) => i.severity === 'high' || i.severity === 'medium')
            .map((irregularity, index) => ({
            irregularityId: `${payrollRunId}-${irregularity.employeeId}-${index}`,
            type: irregularity.type,
            severity: irregularity.severity,
            employeeId: irregularity.employeeId,
            employeeName: irregularity.employeeName,
            message: irregularity.message,
            status: 'pending',
        }));
        return escalatedIrregularities;
    }
    async resolveEscalatedIrregularity(dto) {
        if (!dto.irregularityId || !dto.resolution || !dto.resolvedBy) {
            throw new common_1.BadRequestException('Irregularity ID, resolution, and resolver are required');
        }
        const resolvedIrregularity = {
            irregularityId: dto.irregularityId,
            type: 'resolved',
            severity: 'low',
            employeeId: '',
            employeeName: '',
            message: dto.resolution,
            resolvedBy: dto.resolvedBy,
            resolvedDate: new Date(),
            resolution: dto.resolution,
            status: dto.action === 'resolve' ? 'resolved' : 'rejected',
        };
        this.logSystemAction('IRREGULARITY_RESOLVED_BY_MANAGER', {
            irregularityId: dto.irregularityId,
            resolution: dto.resolution,
            resolvedBy: dto.resolvedBy,
            action: dto.action,
        });
        return resolvedIrregularity;
    }
    async managerReviewAndApprove(payrollRunId, payrollManagerId, comment) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.UNDER_REVIEW) {
            throw new common_1.BadRequestException('Only payroll runs UNDER_REVIEW can be approved by manager');
        }
        const escalatedIrregularities = await this.getEscalatedIrregularities(payrollRunId);
        const unresolvedHighSeverity = escalatedIrregularities.filter((i) => i.severity === 'high' && i.status === 'pending');
        if (unresolvedHighSeverity.length > 0) {
            throw new common_1.BadRequestException(`Cannot approve: ${unresolvedHighSeverity.length} high-severity irregularities remain unresolved. Please resolve or escalate them first.`);
        }
        return this.sendForFinanceApproval(payrollRunId, payrollManagerId);
    }
    async lockPayroll(payrollRunId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        if (!dto.payrollManagerId) {
            throw new common_1.BadRequestException('Payroll Manager ID is required to lock payroll');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.APPROVED) {
            throw new common_1.BadRequestException('Only APPROVED payroll runs can be locked. Current status: ' +
                payrollRun.status);
        }
        payrollRun.status = payroll_execution_enum_2.PayRollStatus.LOCKED;
        if (!payrollRun.payrollManagerId) {
            payrollRun.payrollManagerId = new mongoose_2.Types.ObjectId(dto.payrollManagerId);
        }
        await payrollRun.save();
        this.logSystemAction('PAYROLL_LOCKED', {
            payrollRunId: payrollRunId,
            runId: payrollRun.runId,
            lockedBy: dto.payrollManagerId,
            comment: dto.comment,
            lockDate: new Date(),
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async unlockPayroll(payrollRunId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        if (!dto.payrollManagerId) {
            throw new common_1.BadRequestException('Payroll Manager ID is required to unlock payroll');
        }
        if (!dto.unlockReason || dto.unlockReason.trim() === '') {
            throw new common_1.BadRequestException('Unlock reason is required for audit trail');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.LOCKED) {
            throw new common_1.BadRequestException('Only LOCKED payroll runs can be unlocked. Current status: ' +
                payrollRun.status);
        }
        payrollRun.status = payroll_execution_enum_2.PayRollStatus.UNLOCKED;
        payrollRun.unlockReason = dto.unlockReason;
        await payrollRun.save();
        this.logSystemAction('PAYROLL_UNLOCKED', {
            payrollRunId: payrollRunId,
            runId: payrollRun.runId,
            unlockedBy: dto.payrollManagerId,
            unlockReason: dto.unlockReason,
            comment: dto.comment,
            unlockDate: new Date(),
        });
        return this.buildPayrollRunReviewItem(payrollRun.toObject());
    }
    async generateAndDistributePayslipsAutomatically(payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payrollRun = await this.payrollRunModel.findById(payrollRunId).exec();
        if (!payrollRun) {
            throw new common_1.NotFoundException('Payroll run not found');
        }
        if (payrollRun.status !== payroll_execution_enum_2.PayRollStatus.APPROVED &&
            payrollRun.status !== payroll_execution_enum_2.PayRollStatus.LOCKED) {
            throw new common_1.BadRequestException('Payslips can only be generated for APPROVED or LOCKED payroll runs');
        }
        const payslips = await this.generatePayslipsForPayrollRun(payrollRunId);
        const distributions = [];
        for (const payslip of payslips) {
            const p = payslip;
            const employee = await this.employeeProfileModel
                .findById(p.employeeId)
                .lean()
                .exec();
            if (!employee)
                continue;
            const distribution = {
                payslipId: p._id?.toString?.(),
                employeeId: p.employeeId?.toString?.(),
                employeeName: this.buildEmployeeName(employee),
                distributionMethod: 'portal',
                distributionDate: new Date(),
                status: 'sent',
                email: employee.email || undefined,
                downloadUrl: `/api/payroll-execution/payslips/${p._id}/download`,
            };
            distributions.push(distribution);
        }
        this.logSystemAction('PAYSLIPS_AUTO_GENERATED_AND_DISTRIBUTED', {
            payrollRunId: payrollRunId,
            runId: payrollRun.runId,
            payslipsGenerated: payslips.length,
            distributionsAttempted: distributions.length,
            distributionDate: new Date(),
        });
        return distributions;
    }
    async getPayslipDistributionStatus(payrollRunId) {
        if (!mongoose_2.Types.ObjectId.isValid(payrollRunId)) {
            throw new common_1.BadRequestException('Invalid payroll run identifier');
        }
        const payslips = await this.getPayslipsForPayrollRun(payrollRunId);
        const distributions = [];
        for (const payslip of payslips) {
            const p = payslip;
            const employee = await this.employeeProfileModel
                .findById(p.employeeId)
                .lean()
                .exec();
            if (!employee)
                continue;
            distributions.push({
                payslipId: p._id?.toString?.(),
                employeeId: p.employeeId?.toString?.(),
                employeeName: this.buildEmployeeName(employee),
                distributionMethod: 'portal',
                distributionDate: p.createdAt || new Date(),
                status: p.paymentStatus === 'paid' ? 'sent' : 'pending',
                email: employee.email || undefined,
                downloadUrl: `/api/payroll-execution/payslips/${p._id}/download`,
            });
        }
        return distributions;
    }
    async downloadPayslipPDF(payslipId) {
        if (!mongoose_2.Types.ObjectId.isValid(payslipId)) {
            throw new common_1.BadRequestException('Invalid payslip identifier');
        }
        const PaySlipModel = this.employeeProfileModel.db.models['paySlip'];
        if (!PaySlipModel) {
            throw new Error('PaySlip model not available');
        }
        const payslip = await PaySlipModel.findById(payslipId)
            .populate('employeeId')
            .populate('payrollRunId')
            .lean()
            .exec();
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        const p = payslip;
        const pdfData = {
            payslipId: p._id?.toString(),
            employee: {
                name: this.buildEmployeeName(p.employeeId),
                employeeNumber: p.employeeId?.employeeNumber,
                department: p.employeeId?.department,
                position: p.employeeId?.position,
            },
            payrollRun: {
                runId: p.payrollRunId?.runId,
                period: p.payrollRunId?.payrollPeriod,
                entity: p.payrollRunId?.entity,
            },
            earnings: {
                baseSalary: p.earningsDetails?.baseSalary,
                allowances: p.earningsDetails?.allowances || [],
                bonuses: p.earningsDetails?.bonuses || [],
                benefits: p.earningsDetails?.benefits || [],
                refunds: p.earningsDetails?.refunds || [],
                totalGross: p.totalGrossSalary,
            },
            deductions: {
                taxes: p.deductionsDetails?.taxes,
                insurances: p.deductionsDetails?.insurances || [],
                penalties: p.deductionsDetails?.penalties,
                totalDeductions: p.totaDeductions,
            },
            netPay: p.netPay,
            paymentStatus: p.paymentStatus,
            generatedDate: p.createdAt,
        };
        return pdfData;
    }
    async resendPayslip(payslipId, distributionMethod) {
        if (!mongoose_2.Types.ObjectId.isValid(payslipId)) {
            throw new common_1.BadRequestException('Invalid payslip identifier');
        }
        const PaySlipModel = this.employeeProfileModel.db.models['paySlip'];
        if (!PaySlipModel) {
            throw new Error('PaySlip model not available');
        }
        const payslip = await PaySlipModel.findById(payslipId)
            .populate('employeeId')
            .lean()
            .exec();
        if (!payslip) {
            throw new common_1.NotFoundException('Payslip not found');
        }
        const p = payslip;
        const employee = p.employeeId;
        const distribution = {
            payslipId: p._id?.toString?.(),
            employeeId: employee._id.toString(),
            employeeName: this.buildEmployeeName(employee),
            distributionMethod,
            distributionDate: new Date(),
            status: 'sent',
            email: employee.email || undefined,
            downloadUrl: `/api/payroll-execution/payslips/${p._id}/download`,
        };
        this.logSystemAction('PAYSLIP_RESENT', {
            payslipId: p._id?.toString?.(),
            employeeId: employee._id.toString(),
            distributionMethod,
        });
        return distribution;
    }
};
exports.PayrollExecutionService = PayrollExecutionService;
exports.PayrollExecutionService = PayrollExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, mongoose_1.InjectModel)(EmployeeSigningBonus_schema_1.employeeSigningBonus.name)),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, mongoose_1.InjectModel)('EmployeeTerminationResignation')),
    __param(2, (0, common_1.Optional)()),
    __param(2, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(3, (0, common_1.Optional)()),
    __param(3, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __param(4, (0, common_1.Optional)()),
    __param(4, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Connection])
], PayrollExecutionService);
//# sourceMappingURL=payroll-execution.service.js.map