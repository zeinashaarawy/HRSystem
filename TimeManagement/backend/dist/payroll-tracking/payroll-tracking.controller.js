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
exports.PayrollTrackingController = void 0;
const common_1 = require("@nestjs/common");
const payroll_tracking_service_1 = require("./payroll-tracking.service");
const create_claim_dto_1 = require("./dto/create-claim.dto");
const update_claim_status_dto_1 = require("./dto/update-claim-status.dto");
const create_dispute_dto_1 = require("./dto/create-dispute.dto");
const update_dispute_status_dto_1 = require("./dto/update-dispute-status.dto");
const create_refund_dto_1 = require("./dto/create-refund.dto");
const update_refund_status_dto_1 = require("./dto/update-refund-status.dto");
let PayrollTrackingController = class PayrollTrackingController {
    payrollTrackingService;
    constructor(payrollTrackingService) {
        this.payrollTrackingService = payrollTrackingService;
    }
    getHealth() {
        return this.payrollTrackingService.getHealth();
    }
    createClaim(dto) {
        return this.payrollTrackingService.createClaim(dto);
    }
    getClaimById(id) {
        return this.payrollTrackingService.getClaimById(id);
    }
    listClaimsByEmployee(employeeId) {
        return this.payrollTrackingService.listClaimsByEmployee(employeeId);
    }
    updateClaimStatus(id, dto) {
        return this.payrollTrackingService.updateClaimStatus(id, dto);
    }
    createDispute(dto) {
        return this.payrollTrackingService.createDispute(dto);
    }
    getDisputeById(id) {
        return this.payrollTrackingService.getDisputeById(id);
    }
    listDisputesByEmployee(employeeId) {
        return this.payrollTrackingService.listDisputesByEmployee(employeeId);
    }
    updateDisputeStatus(id, dto) {
        return this.payrollTrackingService.updateDisputeStatus(id, dto);
    }
    createRefund(dto) {
        return this.payrollTrackingService.createRefund(dto);
    }
    getRefundById(id) {
        return this.payrollTrackingService.getRefundById(id);
    }
    listRefundsByEmployee(employeeId) {
        return this.payrollTrackingService.listRefundsByEmployee(employeeId);
    }
    updateRefundStatus(id, dto) {
        return this.payrollTrackingService.updateRefundStatus(id, dto);
    }
    getPayslipById(id) {
        return this.payrollTrackingService.getPayslipById(id);
    }
    listPayslipsByEmployee(employeeId) {
        return this.payrollTrackingService.listPayslipsByEmployee(employeeId);
    }
    getPayslipStatus(payslipId) {
        return this.payrollTrackingService.getPayslipStatus(payslipId);
    }
    getPayslipByEmployeeAndPeriod(employeeId, payrollRunId) {
        return this.payrollTrackingService.getPayslipByEmployeeAndPeriod(employeeId, payrollRunId);
    }
    getHistoricalSalaryRecords(employeeId, startDate, endDate) {
        return this.payrollTrackingService.getHistoricalSalaryRecords(employeeId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    generateTaxCertificate(employeeId, year) {
        return this.payrollTrackingService.generateTaxCertificate(employeeId, parseInt(year));
    }
    generateInsuranceCertificate(employeeId, year) {
        return this.payrollTrackingService.generateInsuranceCertificate(employeeId, parseInt(year));
    }
    getDepartmentReport(departmentId, startDate, endDate) {
        return this.payrollTrackingService.getDepartmentReport(departmentId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    getMonthEndSummary(month, year) {
        return this.payrollTrackingService.getMonthEndSummary(parseInt(month), parseInt(year));
    }
    getYearEndSummary(year) {
        return this.payrollTrackingService.getYearEndSummary(parseInt(year));
    }
    getTaxReport(startDate, endDate) {
        return this.payrollTrackingService.getTaxReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    getInsuranceReport(startDate, endDate) {
        return this.payrollTrackingService.getInsuranceReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    getBenefitsReport(startDate, endDate) {
        return this.payrollTrackingService.getBenefitsReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
};
exports.PayrollTrackingController = PayrollTrackingController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Post)('claims'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_claim_dto_1.CreateClaimDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "createClaim", null);
__decorate([
    (0, common_1.Get)('claims/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getClaimById", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/claims'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "listClaimsByEmployee", null);
__decorate([
    (0, common_1.Patch)('claims/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_claim_status_dto_1.UpdateClaimStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "updateClaimStatus", null);
__decorate([
    (0, common_1.Post)('disputes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dispute_dto_1.CreateDisputeDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "createDispute", null);
__decorate([
    (0, common_1.Get)('disputes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getDisputeById", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/disputes'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "listDisputesByEmployee", null);
__decorate([
    (0, common_1.Patch)('disputes/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dispute_status_dto_1.UpdateDisputeStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "updateDisputeStatus", null);
__decorate([
    (0, common_1.Post)('refunds'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_refund_dto_1.CreateRefundDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "createRefund", null);
__decorate([
    (0, common_1.Get)('refunds/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getRefundById", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/refunds'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "listRefundsByEmployee", null);
__decorate([
    (0, common_1.Patch)('refunds/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_refund_status_dto_1.UpdateRefundStatusDto]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "updateRefundStatus", null);
__decorate([
    (0, common_1.Get)('payslips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getPayslipById", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/payslips'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "listPayslipsByEmployee", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/payslips/status/:payslipId'),
    __param(0, (0, common_1.Param)('payslipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getPayslipStatus", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/payslips/period/:payrollRunId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('payrollRunId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getPayslipByEmployeeAndPeriod", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/historical-records'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getHistoricalSalaryRecords", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/certificates/tax/:year'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "generateTaxCertificate", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/certificates/insurance/:year'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "generateInsuranceCertificate", null);
__decorate([
    (0, common_1.Get)('reports/department/:departmentId'),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getDepartmentReport", null);
__decorate([
    (0, common_1.Get)('reports/month-end/:month/:year'),
    __param(0, (0, common_1.Param)('month')),
    __param(1, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getMonthEndSummary", null);
__decorate([
    (0, common_1.Get)('reports/year-end/:year'),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getYearEndSummary", null);
__decorate([
    (0, common_1.Get)('reports/taxes'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getTaxReport", null);
__decorate([
    (0, common_1.Get)('reports/insurance'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getInsuranceReport", null);
__decorate([
    (0, common_1.Get)('reports/benefits'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PayrollTrackingController.prototype, "getBenefitsReport", null);
exports.PayrollTrackingController = PayrollTrackingController = __decorate([
    (0, common_1.Controller)('payroll-tracking'),
    __metadata("design:paramtypes", [payroll_tracking_service_1.PayrollTrackingService])
], PayrollTrackingController);
//# sourceMappingURL=payroll-tracking.controller.js.map