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
exports.PermissionValidationController = void 0;
const common_1 = require("@nestjs/common");
const permission_validation_service_1 = require("../services/permission-validation.service");
const roles_guard_1 = require("../../Shift/guards/roles.guard");
const roles_decorator_1 = require("../../Shift/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class ValidatePermissionDto {
    employeeId;
    permissionType;
    durationMinutes;
    requestedDate;
}
let PermissionValidationController = class PermissionValidationController {
    permissionValidationService;
    constructor(permissionValidationService) {
        this.permissionValidationService = permissionValidationService;
    }
    async validatePermission(dto) {
        if (!mongoose_1.Types.ObjectId.isValid(dto.employeeId)) {
            throw new common_1.BadRequestException('Invalid employeeId format');
        }
        const requestedDate = new Date(dto.requestedDate);
        if (isNaN(requestedDate.getTime())) {
            throw new common_1.BadRequestException('Invalid requestedDate format');
        }
        return this.permissionValidationService.validatePermission(new mongoose_1.Types.ObjectId(dto.employeeId), dto.permissionType, dto.durationMinutes, requestedDate);
    }
};
exports.PermissionValidationController = PermissionValidationController;
__decorate([
    (0, common_1.Post)('validate'),
    (0, roles_decorator_1.Roles)('HR Manager', 'HR Admin', 'System Admin', 'Manager', 'department head'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Validate a permission request (BR-TM-16, BR-TM-17, BR-TM-18)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permission validation result' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ValidatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionValidationController.prototype, "validatePermission", null);
exports.PermissionValidationController = PermissionValidationController = __decorate([
    (0, swagger_1.ApiTags)('Time Management - Permission Validation'),
    (0, common_1.Controller)('time-management/permissions'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [permission_validation_service_1.PermissionValidationService])
], PermissionValidationController);
//# sourceMappingURL=permission-validation.controller.js.map