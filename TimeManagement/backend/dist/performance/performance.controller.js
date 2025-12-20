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
exports.PerformanceController = void 0;
const common_1 = require("@nestjs/common");
const performance_service_1 = require("./performance.service");
const create_appraisal_record_dto_1 = require("./dto/create-appraisal-record.dto");
const update_appraisal_record_dto_1 = require("./dto/update-appraisal-record.dto");
const update_appraisal_status_dto_1 = require("./dto/update-appraisal-status.dto");
const create_dispute_dto_1 = require("./dto/create-dispute.dto");
const resolve_dispute_dto_1 = require("./dto/resolve-dispute.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_groups_1 = require("../common/constants/role-groups");
const common_2 = require("@nestjs/common");
let PerformanceController = class PerformanceController {
    performanceService;
    constructor(performanceService) {
        this.performanceService = performanceService;
    }
    createTemplate(body) {
        return this.performanceService.createTemplate(body);
    }
    getAllTemplates() {
        return this.performanceService.getAllTemplates();
    }
    getTemplateById(id) {
        return this.performanceService.getTemplateById(id);
    }
    updateTemplate(id, body) {
        return this.performanceService.updateTemplate(id, body);
    }
    deleteTemplate(id) {
        return this.performanceService.deleteTemplate(id);
    }
    createCycle(body) {
        return this.performanceService.createCycle(body);
    }
    getAllCycles() {
        return this.performanceService.getAllCycles();
    }
    getCycleById(id) {
        return this.performanceService.getCycleById(id);
    }
    updateCycle(id, body) {
        return this.performanceService.updateCycle(id, body);
    }
    activateCycle(id) {
        return this.performanceService.activateCycle(id);
    }
    closeCycle(id) {
        return this.performanceService.closeCycle(id);
    }
    archiveCycle(id) {
        return this.performanceService.archiveCycle(id);
    }
    createAppraisal(dto, req) {
        const managerProfileId = req.user.id;
        return this.performanceService.createAppraisal(dto, managerProfileId);
    }
    updateAppraisal(id, dto, req) {
        const managerProfileId = req.user.id;
        return this.performanceService.updateAppraisal(id, dto, managerProfileId);
    }
    updateAppraisalStatus(id, dto, req) {
        const managerProfileId = req.user.id;
        return this.performanceService.updateAppraisalStatus(id, dto, managerProfileId);
    }
    publishAppraisal(id, dto, req) {
        const hrEmployeeProfileId = req.user.id;
        return this.performanceService.publishAppraisal(id, hrEmployeeProfileId, dto);
    }
    getAppraisalById(id) {
        return this.performanceService.getAppraisalById(id);
    }
    getCycleAppraisals(cycleId) {
        return this.performanceService.findCycleAppraisals(cycleId);
    }
    getMyAppraisals(req) {
        const employeeProfileId = req.user.id;
        return this.performanceService.findMyAppraisals(employeeProfileId);
    }
    getMyAppraisalById(id, req) {
        const employeeProfileId = req.user.id;
        return this.performanceService.findMyAppraisalById(employeeProfileId, id);
    }
    acknowledgeAppraisal(id, body, req) {
        const employeeProfileId = req.user.id;
        return this.performanceService.employeeAcknowledgeAppraisal(id, employeeProfileId, body.employeeAcknowledgementComment);
    }
    publishCycleResults(id) {
        return this.performanceService.publishCycleResults(id);
    }
    deleteDispute(id) {
        return this.performanceService.deleteDispute(id);
    }
    createDispute(appraisalId, dto, req) {
        const employeeProfileId = req.user.id;
        return this.performanceService.createDispute(appraisalId, dto, employeeProfileId);
    }
    listDisputes(status) {
        return this.performanceService.listDisputes(status);
    }
    resolveDispute(id, dto, req) {
        const hrEmployeeProfileId = req.user.id;
        return this.performanceService.resolveDispute(id, dto, hrEmployeeProfileId);
    }
    async getDisputeById(id) {
        const dispute = await this.performanceService.getDisputeById(id);
        if (!dispute) {
            throw new common_2.NotFoundException('Dispute not found');
        }
        return dispute;
    }
};
exports.PerformanceController = PerformanceController;
__decorate([
    (0, common_1.Post)('templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAllTemplates", null);
__decorate([
    (0, common_1.Get)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getTemplateById", null);
__decorate([
    (0, common_1.Patch)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('templates/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Post)('cycles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createCycle", null);
__decorate([
    (0, common_1.Get)('cycles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAllCycles", null);
__decorate([
    (0, common_1.Get)('cycles/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getCycleById", null);
__decorate([
    (0, common_1.Patch)('cycles/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateCycle", null);
__decorate([
    (0, common_1.Patch)('cycles/:id/activate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "activateCycle", null);
__decorate([
    (0, common_1.Patch)('cycles/:id/close'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "closeCycle", null);
__decorate([
    (0, common_1.Patch)('cycles/:id/archive'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "archiveCycle", null);
__decorate([
    (0, common_1.Post)('appraisals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.MANAGER_ROLES),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appraisal_record_dto_1.CreateAppraisalRecordDto, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createAppraisal", null);
__decorate([
    (0, common_1.Patch)('appraisals/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.MANAGER_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appraisal_record_dto_1.UpdateAppraisalRecordDto, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateAppraisal", null);
__decorate([
    (0, common_1.Patch)('appraisals/:id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.MANAGER_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appraisal_status_dto_1.UpdateAppraisalStatusDto, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "updateAppraisalStatus", null);
__decorate([
    (0, common_1.Patch)('appraisals/:id/publish'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appraisal_status_dto_1.UpdateAppraisalStatusDto, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "publishAppraisal", null);
__decorate([
    (0, common_1.Get)('appraisals/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getAppraisalById", null);
__decorate([
    (0, common_1.Get)('cycles/:cycleId/appraisals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('cycleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getCycleAppraisals", null);
__decorate([
    (0, common_1.Get)('my-appraisals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getMyAppraisals", null);
__decorate([
    (0, common_1.Get)('my-appraisals/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "getMyAppraisalById", null);
__decorate([
    (0, common_1.Patch)('my-appraisals/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "acknowledgeAppraisal", null);
__decorate([
    (0, common_1.Patch)('cycles/:id/publish-results'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "publishCycleResults", null);
__decorate([
    (0, common_1.Delete)('disputes/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "deleteDispute", null);
__decorate([
    (0, common_1.Post)('appraisals/:id/disputes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_dispute_dto_1.CreateDisputeDto, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "createDispute", null);
__decorate([
    (0, common_1.Get)('disputes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "listDisputes", null);
__decorate([
    (0, common_1.Patch)('disputes/:id/resolve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, resolve_dispute_dto_1.ResolveDisputeDto, Object]),
    __metadata("design:returntype", void 0)
], PerformanceController.prototype, "resolveDispute", null);
__decorate([
    (0, common_1.Get)('disputes/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES, ...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "getDisputeById", null);
exports.PerformanceController = PerformanceController = __decorate([
    (0, common_1.Controller)('performance'),
    __metadata("design:paramtypes", [performance_service_1.PerformanceService])
], PerformanceController);
//# sourceMappingURL=performance.controller.js.map