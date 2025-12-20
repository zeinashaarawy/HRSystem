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
exports.PayrollConfigurationController = void 0;
const common_1 = require("@nestjs/common");
const payroll_configuration_service_1 = require("./payroll-configuration.service");
const payroll_configuration_enums_1 = require("./enums/payroll-configuration-enums");
const payroll_configuration_dto_1 = require("./dto/payroll-configuration.dto");
let PayrollConfigurationController = class PayrollConfigurationController {
    payrollConfigurationService;
    constructor(payrollConfigurationService) {
        this.payrollConfigurationService = payrollConfigurationService;
    }
    createInsuranceBracket(payload) {
        return this.payrollConfigurationService.createInsuranceBracket(payload);
    }
    listInsuranceBrackets(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listInsuranceBrackets(normalizedStatus);
    }
    getInsuranceBracket(configId) {
        return this.payrollConfigurationService.getInsuranceBracket(configId);
    }
    editInsuranceBracket(configId, { payload }) {
        return this.payrollConfigurationService.updateInsuranceBracket(configId, payload);
    }
    approveInsuranceBracket(configId, { approverId }) {
        return this.payrollConfigurationService.approveInsuranceBracket(configId, approverId);
    }
    rejectInsuranceBracket(configId, { reviewerId }) {
        return this.payrollConfigurationService.rejectInsuranceBracket(configId, reviewerId);
    }
    deleteInsuranceBracket(configId) {
        return this.payrollConfigurationService.deleteInsuranceBracket(configId);
    }
    createPayrollPolicy(payload) {
        return this.payrollConfigurationService.createPayrollPolicy(payload);
    }
    listPayrollPolicies(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listPayrollPolicies(normalizedStatus);
    }
    getPayrollPolicy(configId) {
        return this.payrollConfigurationService.getPayrollPolicy(configId);
    }
    updatePayrollPolicy(configId, { payload }) {
        return this.payrollConfigurationService.updatePayrollPolicy(configId, payload);
    }
    createPayGrade(payload) {
        return this.payrollConfigurationService.createPayGrade(payload);
    }
    listPayGrades(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listPayGrades(normalizedStatus);
    }
    getPayGrade(configId) {
        return this.payrollConfigurationService.getPayGrade(configId);
    }
    updatePayGrade(configId, { payload }) {
        return this.payrollConfigurationService.updatePayGrade(configId, payload);
    }
    createPayType(payload) {
        return this.payrollConfigurationService.createPayType(payload);
    }
    listPayTypes(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listPayTypes(normalizedStatus);
    }
    getPayType(configId) {
        return this.payrollConfigurationService.getPayType(configId);
    }
    updatePayType(configId, { payload }) {
        return this.payrollConfigurationService.updatePayType(configId, payload);
    }
    createAllowance(payload) {
        return this.payrollConfigurationService.createAllowance(payload);
    }
    listAllowances(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listAllowances(normalizedStatus);
    }
    getAllowance(configId) {
        return this.payrollConfigurationService.getAllowance(configId);
    }
    updateAllowance(configId, { payload }) {
        return this.payrollConfigurationService.updateAllowance(configId, payload);
    }
    createSigningBonus(payload) {
        return this.payrollConfigurationService.createSigningBonus(payload);
    }
    listSigningBonuses(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listSigningBonuses(normalizedStatus);
    }
    getSigningBonus(configId) {
        return this.payrollConfigurationService.getSigningBonus(configId);
    }
    updateSigningBonus(configId, { payload }) {
        return this.payrollConfigurationService.updateSigningBonus(configId, payload);
    }
    createTerminationResignationBenefits(payload) {
        return this.payrollConfigurationService.createTerminationResignationBenefits(payload);
    }
    listTerminationResignationBenefits(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listTerminationResignationBenefits(normalizedStatus);
    }
    getTerminationResignationBenefits(configId) {
        return this.payrollConfigurationService.getTerminationResignationBenefits(configId);
    }
    updateTerminationResignationBenefits(configId, { payload }) {
        return this.payrollConfigurationService.updateTerminationResignationBenefits(configId, payload);
    }
    createCompanyWideSettings(payload) {
        return this.payrollConfigurationService.createCompanyWideSettings(payload);
    }
    getActiveCompanyWideSettings() {
        return this.payrollConfigurationService.getActiveCompanyWideSettings();
    }
    listCompanyWideSettings() {
        return this.payrollConfigurationService.listCompanyWideSettings();
    }
    getCompanyWideSettings(configId) {
        return this.payrollConfigurationService.getCompanyWideSettings(configId);
    }
    updateCompanyWideSettings(configId, { payload }) {
        return this.payrollConfigurationService.updateCompanyWideSettings(configId, payload);
    }
    createTaxRule(payload) {
        return this.payrollConfigurationService.createTaxRule(payload);
    }
    listTaxRules(status) {
        const normalizedStatus = this.normalizeStatusFilter(status);
        return this.payrollConfigurationService.listTaxRules(normalizedStatus);
    }
    getTaxRule(configId) {
        return this.payrollConfigurationService.getTaxRule(configId);
    }
    updateTaxRule(configId, { payload }) {
        return this.payrollConfigurationService.updateTaxRule(configId, payload);
    }
    normalizeStatusFilter(rawStatus) {
        if (!rawStatus) {
            return undefined;
        }
        const lowerCased = rawStatus.toLowerCase();
        const allowedStatuses = Object.values(payroll_configuration_enums_1.ConfigStatus);
        if (!allowedStatuses.includes(lowerCased)) {
            throw new common_1.BadRequestException(`Unsupported status filter "${rawStatus}". Allowed statuses: ${allowedStatuses.join(', ')}`);
        }
        return lowerCased;
    }
};
exports.PayrollConfigurationController = PayrollConfigurationController;
__decorate([
    (0, common_1.Post)('insurance-brackets'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createInsuranceBracket", null);
__decorate([
    (0, common_1.Get)('insurance-brackets'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listInsuranceBrackets", null);
__decorate([
    (0, common_1.Get)('insurance-brackets/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getInsuranceBracket", null);
__decorate([
    (0, common_1.Patch)('insurance-brackets/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateInsuranceBracketDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "editInsuranceBracket", null);
__decorate([
    (0, common_1.Patch)('insurance-brackets/:configId/approve'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.ApproveInsuranceBracketDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "approveInsuranceBracket", null);
__decorate([
    (0, common_1.Patch)('insurance-brackets/:configId/reject'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.RejectInsuranceBracketDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "rejectInsuranceBracket", null);
__decorate([
    (0, common_1.Delete)('insurance-brackets/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "deleteInsuranceBracket", null);
__decorate([
    (0, common_1.Post)('payroll-policies'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createPayrollPolicy", null);
__decorate([
    (0, common_1.Get)('payroll-policies'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listPayrollPolicies", null);
__decorate([
    (0, common_1.Get)('payroll-policies/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getPayrollPolicy", null);
__decorate([
    (0, common_1.Patch)('payroll-policies/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updatePayrollPolicy", null);
__decorate([
    (0, common_1.Post)('pay-grades'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createPayGrade", null);
__decorate([
    (0, common_1.Get)('pay-grades'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listPayGrades", null);
__decorate([
    (0, common_1.Get)('pay-grades/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getPayGrade", null);
__decorate([
    (0, common_1.Patch)('pay-grades/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updatePayGrade", null);
__decorate([
    (0, common_1.Post)('pay-types'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createPayType", null);
__decorate([
    (0, common_1.Get)('pay-types'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listPayTypes", null);
__decorate([
    (0, common_1.Get)('pay-types/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getPayType", null);
__decorate([
    (0, common_1.Patch)('pay-types/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updatePayType", null);
__decorate([
    (0, common_1.Post)('allowances'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createAllowance", null);
__decorate([
    (0, common_1.Get)('allowances'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listAllowances", null);
__decorate([
    (0, common_1.Get)('allowances/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getAllowance", null);
__decorate([
    (0, common_1.Patch)('allowances/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updateAllowance", null);
__decorate([
    (0, common_1.Post)('signing-bonuses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createSigningBonus", null);
__decorate([
    (0, common_1.Get)('signing-bonuses'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listSigningBonuses", null);
__decorate([
    (0, common_1.Get)('signing-bonuses/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getSigningBonus", null);
__decorate([
    (0, common_1.Patch)('signing-bonuses/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updateSigningBonus", null);
__decorate([
    (0, common_1.Post)('termination-resignation-benefits'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createTerminationResignationBenefits", null);
__decorate([
    (0, common_1.Get)('termination-resignation-benefits'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listTerminationResignationBenefits", null);
__decorate([
    (0, common_1.Get)('termination-resignation-benefits/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getTerminationResignationBenefits", null);
__decorate([
    (0, common_1.Patch)('termination-resignation-benefits/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updateTerminationResignationBenefits", null);
__decorate([
    (0, common_1.Post)('company-wide-settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createCompanyWideSettings", null);
__decorate([
    (0, common_1.Get)('company-wide-settings/active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getActiveCompanyWideSettings", null);
__decorate([
    (0, common_1.Get)('company-wide-settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listCompanyWideSettings", null);
__decorate([
    (0, common_1.Get)('company-wide-settings/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getCompanyWideSettings", null);
__decorate([
    (0, common_1.Patch)('company-wide-settings/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updateCompanyWideSettings", null);
__decorate([
    (0, common_1.Post)('tax-rules'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_configuration_dto_1.CreateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "createTaxRule", null);
__decorate([
    (0, common_1.Get)('tax-rules'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "listTaxRules", null);
__decorate([
    (0, common_1.Get)('tax-rules/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "getTaxRule", null);
__decorate([
    (0, common_1.Patch)('tax-rules/:configId'),
    __param(0, (0, common_1.Param)('configId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_configuration_dto_1.UpdateConfigurationDto]),
    __metadata("design:returntype", void 0)
], PayrollConfigurationController.prototype, "updateTaxRule", null);
exports.PayrollConfigurationController = PayrollConfigurationController = __decorate([
    (0, common_1.Controller)('payroll-configuration'),
    __metadata("design:paramtypes", [payroll_configuration_service_1.PayrollConfigurationService])
], PayrollConfigurationController);
//# sourceMappingURL=payroll-configuration.controller.js.map