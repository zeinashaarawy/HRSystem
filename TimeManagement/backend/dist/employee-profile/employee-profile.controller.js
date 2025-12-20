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
exports.EmployeeProfileController = void 0;
const common_1 = require("@nestjs/common");
const employee_profile_service_1 = require("./employee-profile.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const role_groups_1 = require("../common/constants/role-groups");
const employee_profile_enums_1 = require("./enums/employee-profile.enums");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const self_update_dto_1 = require("./dto/self-update.dto");
const create_change_request_dto_1 = require("./dto/create-change-request.dto");
const create_manager_dto_1 = require("./dto/create-manager.dto");
let EmployeeProfileController = class EmployeeProfileController {
    employeeProfileService;
    constructor(employeeProfileService) {
        this.employeeProfileService = employeeProfileService;
    }
    getMyProfile(req) {
        const userId = req.user?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('Not authenticated ❌');
        return this.employeeProfileService.getMyProfile(userId);
    }
    selfUpdate(req, dto) {
        const userId = req.user?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('Not authenticated ❌');
        return this.employeeProfileService.selfUpdate(userId, dto);
    }
    findOne(id) {
        return this.employeeProfileService.findOne(id);
    }
    findAll(page = 1, limit = 10, role) {
        return this.employeeProfileService.findAll(+page, +limit, role);
    }
    create(dto) {
        return this.employeeProfileService.create(dto);
    }
    update(id, dto) {
        return this.employeeProfileService.update(id, dto);
    }
    remove(id) {
        return this.employeeProfileService.deactivate(id);
    }
    createManager(dto) {
        return this.employeeProfileService.createManager(dto);
    }
    assignManager(employeeId, managerId) {
        return this.employeeProfileService.assignManager(employeeId, managerId);
    }
    getManagerTeam(managerId) {
        return this.employeeProfileService.getTeamSummaryForManager(managerId);
    }
    getTeamEmployee(managerId, employeeId) {
        return this.employeeProfileService.getTeamEmployeeSummary(managerId, employeeId);
    }
    createChangeRequest(req, dto) {
        const userId = req.user?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('Not authenticated ❌');
        return this.employeeProfileService.createChangeRequest(userId, dto);
    }
    getMyChangeRequests(req) {
        const userId = req.user?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('Not authenticated ❌');
        return this.employeeProfileService.getEmployeeChangeRequests(userId);
    }
    withdrawChangeRequest(req, id) {
        if (req.user?.role !== employee_profile_enums_1.SystemRole.DEPARTMENT_EMPLOYEE) {
            throw new common_1.ForbiddenException('You do not have permission ❌');
        }
        return this.employeeProfileService.withdrawChangeRequest(id);
    }
    submitDispute(req, originalRequestId, body) {
        const userId = req.user?.id;
        if (!userId)
            throw new common_1.UnauthorizedException('Not authenticated ❌');
        return this.employeeProfileService.submitDispute({
            employeeProfileId: userId,
            originalRequestId,
            dispute: body.dispute,
        });
    }
    getAllChangeRequests() {
        return this.employeeProfileService.getAllChangeRequests();
    }
    getChangeRequestByUUID(requestId) {
        return this.employeeProfileService.findChangeRequestByUUID(requestId);
    }
    approveChangeRequest(id) {
        return this.employeeProfileService.approveChangeRequest(id);
    }
    rejectChangeRequest(id, reason) {
        return this.employeeProfileService.rejectChangeRequest(id, reason);
    }
    approveDispute(id, resolution) {
        return this.employeeProfileService.approveDispute(id, resolution);
    }
    resolveDispute(id, resolution) {
        return this.employeeProfileService.resolveDispute(id, resolution);
    }
    getDepartmentHeads() {
        return this.employeeProfileService.getDepartmentHeads();
    }
    getDepartmentManagers(departmentId) {
        return this.employeeProfileService.getDepartmentManagers(departmentId);
    }
    setPassword(id, dto) {
        return this.employeeProfileService.setPassword(id, dto.password);
    }
};
exports.EmployeeProfileController = EmployeeProfileController;
__decorate([
    (0, common_1.Get)('profile/me'),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Patch)('self-update'),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, self_update_dto_1.SelfUpdateDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "selfUpdate", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.MANAGER_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('create-manager'),
    (0, roles_decorator_1.Roles)(...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manager_dto_1.CreateManagerDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "createManager", null);
__decorate([
    (0, common_1.Patch)('assign-manager'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Body)('employeeId')),
    __param(1, (0, common_1.Body)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "assignManager", null);
__decorate([
    (0, common_1.Get)('manager/team/:managerId'),
    (0, roles_decorator_1.Roles)(...role_groups_1.MANAGER_ROLES),
    __param(0, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getManagerTeam", null);
__decorate([
    (0, common_1.Get)('manager/team/:managerId/employee/:employeeId'),
    (0, roles_decorator_1.Roles)(...role_groups_1.MANAGER_ROLES),
    __param(0, (0, common_1.Param)('managerId')),
    __param(1, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getTeamEmployee", null);
__decorate([
    (0, common_1.Post)('change-requests'),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_change_request_dto_1.CreateChangeRequestDto]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "createChangeRequest", null);
__decorate([
    (0, common_1.Get)('change-requests/my'),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getMyChangeRequests", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/withdraw'),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "withdrawChangeRequest", null);
__decorate([
    (0, common_1.Post)('change-requests/:id/dispute'),
    (0, roles_decorator_1.Roles)(...role_groups_1.EMPLOYEE_ROLES),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "submitDispute", null);
__decorate([
    (0, common_1.Get)('change-requests/all'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getAllChangeRequests", null);
__decorate([
    (0, common_1.Get)('change-requests/request/:requestId'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getChangeRequestByUUID", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/approve'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "approveChangeRequest", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/reject'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "rejectChangeRequest", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/approve-dispute'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('resolution')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "approveDispute", null);
__decorate([
    (0, common_1.Patch)('change-requests/:id/resolve-dispute'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('resolution')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "resolveDispute", null);
__decorate([
    (0, common_1.Get)('department-heads'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getDepartmentHeads", null);
__decorate([
    (0, common_1.Get)('department/:departmentId/managers'),
    (0, roles_decorator_1.Roles)(...role_groups_1.HR_ROLES, ...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "getDepartmentManagers", null);
__decorate([
    (0, common_1.Post)('set-password/:id'),
    (0, roles_decorator_1.Roles)(...role_groups_1.ADMIN_ROLES),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EmployeeProfileController.prototype, "setPassword", null);
exports.EmployeeProfileController = EmployeeProfileController = __decorate([
    (0, common_1.Controller)('employee-profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [employee_profile_service_1.EmployeeProfileService])
], EmployeeProfileController);
//# sourceMappingURL=employee-profile.controller.js.map