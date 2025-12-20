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
exports.PayrollExecutionController = void 0;
const common_1 = require("@nestjs/common");
const payroll_execution_enum_1 = require("./enums/payroll-execution-enum");
const payroll_execution_service_1 = require("./payroll-execution.service");
let PayrollExecutionController = class PayrollExecutionController {
    payrollExecutionService;
    constructor(payrollExecutionService) {
        this.payrollExecutionService =
            payrollExecutionService ?? this.createUnavailableServiceProxy();
    }
    getProcessedSigningBonuses(employeeId, status) {
        const normalizedStatus = this.parseStatusQuery(status);
        return this.payrollExecutionService.getProcessedSigningBonuses({
            employeeId,
            status: normalizedStatus,
        });
    }
    approveSigningBonus(signingBonusId, body = new payroll_execution_service_1.ApproveSigningBonusDto()) {
        return this.payrollExecutionService.approveSigningBonus(signingBonusId, body);
    }
    manuallyOverrideSigningBonus(signingBonusId, body) {
        return this.payrollExecutionService.manuallyOverrideSigningBonus(signingBonusId, body);
    }
    getProcessedTerminationBenefits(employeeId, status) {
        const normalizedStatus = this.parseBenefitStatusQuery(status);
        return this.payrollExecutionService.getProcessedTerminationBenefits({
            employeeId,
            status: normalizedStatus,
        });
    }
    approveTerminationBenefit(terminationBenefitId, body = new payroll_execution_service_1.ApproveTerminationBenefitDto()) {
        return this.payrollExecutionService.approveTerminationBenefit(terminationBenefitId, body);
    }
    manuallyOverrideTerminationBenefit(terminationBenefitId, body) {
        return this.payrollExecutionService.manuallyOverrideTerminationBenefit(terminationBenefitId, body);
    }
    getPayrollRunsForReview(status, payrollPeriod) {
        return this.payrollExecutionService.getPayrollRunsForReview({
            status,
            payrollPeriod,
        });
    }
    reviewPayrollRun(payrollRunId, body) {
        return this.payrollExecutionService.reviewPayrollRun(payrollRunId, body);
    }
    editPayrollRun(payrollRunId, body) {
        return this.payrollExecutionService.editPayrollRun(payrollRunId, body);
    }
    processPayrollRunAutomatically(body) {
        return this.payrollExecutionService.processPayrollRunAutomatically(body);
    }
    calculatePayrollAutomatically(body) {
        return this.payrollExecutionService.calculatePayrollAutomatically(body);
    }
    generatePayslip(body) {
        return this.payrollExecutionService.generatePayslip(body.employeeId, body.payrollRunId);
    }
    generatePayslipsForPayrollRun(payrollRunId) {
        return this.payrollExecutionService.generatePayslipsForPayrollRun(payrollRunId);
    }
    getPayslip(employeeId, payrollRunId) {
        return this.payrollExecutionService.getPayslip(employeeId, payrollRunId);
    }
    getPayslipsForPayrollRun(payrollRunId) {
        return this.payrollExecutionService.getPayslipsForPayrollRun(payrollRunId);
    }
    generateDraftPayrollAutomatically(body) {
        return this.payrollExecutionService.generateDraftPayrollAutomatically(body);
    }
    getPayrollPreviewDashboard(payrollRunId) {
        return this.payrollExecutionService.getPayrollPreviewDashboard(payrollRunId);
    }
    sendForManagerApproval(payrollRunId, body) {
        return this.payrollExecutionService.sendForManagerApproval(payrollRunId, body.payrollSpecialistId);
    }
    sendForFinanceApproval(payrollRunId, body) {
        return this.payrollExecutionService.sendForFinanceApproval(payrollRunId, body.payrollManagerId);
    }
    finalApprovalByFinance(payrollRunId, body) {
        return this.payrollExecutionService.finalApprovalByFinance(payrollRunId, body.financeStaffId);
    }
    getEscalatedIrregularities(payrollRunId) {
        return this.payrollExecutionService.getEscalatedIrregularities(payrollRunId);
    }
    resolveEscalatedIrregularity(body) {
        return this.payrollExecutionService.resolveEscalatedIrregularity(body);
    }
    managerReviewAndApprove(payrollRunId, body) {
        return this.payrollExecutionService.managerReviewAndApprove(payrollRunId, body.payrollManagerId, body.comment);
    }
    lockPayroll(payrollRunId, body) {
        return this.payrollExecutionService.lockPayroll(payrollRunId, body);
    }
    unlockPayroll(payrollRunId, body) {
        return this.payrollExecutionService.unlockPayroll(payrollRunId, body);
    }
    getPayslipDistributionStatus(payrollRunId) {
        return this.payrollExecutionService.getPayslipDistributionStatus(payrollRunId);
    }
    downloadPayslipPDF(payslipId) {
        return this.payrollExecutionService.downloadPayslipPDF(payslipId);
    }
    resendPayslip(payslipId, body) {
        return this.payrollExecutionService.resendPayslip(payslipId, body.distributionMethod);
    }
    parseStatusQuery(status) {
        if (!status) {
            return undefined;
        }
        return Object.values(payroll_execution_enum_1.BonusStatus).find((candidate) => candidate.toLowerCase() === status.toLowerCase());
    }
    parseBenefitStatusQuery(status) {
        if (!status) {
            return undefined;
        }
        return Object.values(payroll_execution_enum_1.BenefitStatus).find((candidate) => candidate.toLowerCase() === status.toLowerCase());
    }
    createUnavailableServiceProxy() {
        return new Proxy({}, {
            get: (_, prop) => {
                throw new Error(`PayrollExecutionService is unavailable (missing provider for "${String(prop)}").`);
            },
        });
    }
};
exports.PayrollExecutionController = PayrollExecutionController;
__decorate([
    (0, common_1.Get)('signing-bonuses/processed'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getProcessedSigningBonuses", null);
__decorate([
    (0, common_1.Post)('signing-bonuses/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_execution_service_1.ApproveSigningBonusDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "approveSigningBonus", null);
__decorate([
    (0, common_1.Patch)('signing-bonuses/:id/manual-override'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_execution_service_1.ManualOverrideSigningBonusDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "manuallyOverrideSigningBonus", null);
__decorate([
    (0, common_1.Get)('termination-benefits/processed'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getProcessedTerminationBenefits", null);
__decorate([
    (0, common_1.Post)('termination-benefits/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_execution_service_1.ApproveTerminationBenefitDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "approveTerminationBenefit", null);
__decorate([
    (0, common_1.Patch)('termination-benefits/:id/manual-override'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_execution_service_1.ManualOverrideTerminationBenefitDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "manuallyOverrideTerminationBenefit", null);
__decorate([
    (0, common_1.Get)('payroll-runs/review'),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('payrollPeriod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getPayrollRunsForReview", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/review'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_execution_service_1.ReviewPayrollRunDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "reviewPayrollRun", null);
__decorate([
    (0, common_1.Patch)('payroll-runs/:id/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_execution_service_1.EditPayrollRunDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "editPayrollRun", null);
__decorate([
    (0, common_1.Post)('payroll-runs/process-automatic'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_execution_service_1.ProcessPayrollRunDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "processPayrollRunAutomatically", null);
__decorate([
    (0, common_1.Post)('payroll-runs/calculate-automatic'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_execution_service_1.CalculatePayrollDto]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "calculatePayrollAutomatically", null);
__decorate([
    (0, common_1.Post)('payslips/generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "generatePayslip", null);
__decorate([
    (0, common_1.Post)('payslips/generate-batch/:payrollRunId'),
    __param(0, (0, common_1.Param)('payrollRunId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "generatePayslipsForPayrollRun", null);
__decorate([
    (0, common_1.Get)('payslips'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('payrollRunId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getPayslip", null);
__decorate([
    (0, common_1.Get)('payslips/payroll-run/:payrollRunId'),
    __param(0, (0, common_1.Param)('payrollRunId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getPayslipsForPayrollRun", null);
__decorate([
    (0, common_1.Post)('draft/generate-automatic'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "generateDraftPayrollAutomatically", null);
__decorate([
    (0, common_1.Get)('preview/:payrollRunId'),
    __param(0, (0, common_1.Param)('payrollRunId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getPayrollPreviewDashboard", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/send-for-manager-approval'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "sendForManagerApproval", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/send-for-finance-approval'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "sendForFinanceApproval", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/final-approval'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "finalApprovalByFinance", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:id/escalated-irregularities'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getEscalatedIrregularities", null);
__decorate([
    (0, common_1.Post)('irregularities/resolve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "resolveEscalatedIrregularity", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/manager-review-approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "managerReviewAndApprove", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/lock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "lockPayroll", null);
__decorate([
    (0, common_1.Post)('payroll-runs/:id/unlock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "unlockPayroll", null);
__decorate([
    (0, common_1.Get)('payroll-runs/:id/payslip-distribution-status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "getPayslipDistributionStatus", null);
__decorate([
    (0, common_1.Get)('payslips/:id/download'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "downloadPayslipPDF", null);
__decorate([
    (0, common_1.Post)('payslips/:id/resend'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PayrollExecutionController.prototype, "resendPayslip", null);
exports.PayrollExecutionController = PayrollExecutionController = __decorate([
    (0, common_1.Controller)('payroll-execution'),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [payroll_execution_service_1.PayrollExecutionService])
], PayrollExecutionController);
//# sourceMappingURL=payroll-execution.controller.js.map