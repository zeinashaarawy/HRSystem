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
exports.IntegrationController = void 0;
const common_1 = require("@nestjs/common");
const integration_service_1 = require("./integration.service");
let IntegrationController = class IntegrationController {
    integrationService;
    constructor(integrationService) {
        this.integrationService = integrationService;
    }
    getStatus() {
        return this.integrationService.getIntegrationStatus();
    }
    async getEmployeeProfile(employeeId) {
        return this.integrationService.getEmployeeProfile({ employeeId });
    }
    async getReportingLine(employeeId) {
        return this.integrationService.getReportingLine({ employeeId });
    }
    async blockAttendance(request) {
        return this.integrationService.blockAttendance(request);
    }
    async unblockAttendance(body) {
        return this.integrationService.unblockAttendance(body.leaveRequestId);
    }
    async syncLeaveToPayroll(request) {
        return this.integrationService.syncLeaveToPayroll(request);
    }
    async submitLeaveSettlement(settlementData) {
        return this.integrationService.submitLeaveSettlement(settlementData);
    }
};
exports.IntegrationController = IntegrationController;
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IntegrationController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('employee-profile/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "getEmployeeProfile", null);
__decorate([
    (0, common_1.Get)('reporting-line/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "getReportingLine", null);
__decorate([
    (0, common_1.Post)('time-management/block-attendance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "blockAttendance", null);
__decorate([
    (0, common_1.Post)('time-management/unblock-attendance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "unblockAttendance", null);
__decorate([
    (0, common_1.Post)('payroll/sync-leave'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "syncLeaveToPayroll", null);
__decorate([
    (0, common_1.Post)('payroll/submit-settlement'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "submitLeaveSettlement", null);
exports.IntegrationController = IntegrationController = __decorate([
    (0, common_1.Controller)('integration'),
    __metadata("design:paramtypes", [integration_service_1.IntegrationService])
], IntegrationController);
//# sourceMappingURL=integration.controller.js.map