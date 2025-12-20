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
exports.TimeManagementController = void 0;
const common_1 = require("@nestjs/common");
const time_management_service_1 = require("./time-management.service");
const create_punch_dto_1 = require("./attendance/dto/create-punch.dto");
const index_1 = require("./enums/index");
const roles_guard_1 = require("./Shift/guards/roles.guard");
const roles_decorator_1 = require("./Shift/decorators/roles.decorator");
let TimeManagementController = class TimeManagementController {
    tmService;
    constructor(tmService) {
        this.tmService = tmService;
    }
    async recordPunch(dto) {
        try {
            if (dto.timestamp && typeof dto.timestamp === 'string') {
                dto.timestamp = new Date(dto.timestamp);
            }
            if (!dto.employeeId || !dto.timestamp || !dto.type) {
                throw new common_1.BadRequestException('Missing required punch data');
            }
            if (!dto.employeeId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new common_1.BadRequestException('Invalid employee ID format');
            }
            return await this.tmService.recordPunch(dto);
        }
        catch (error) {
            console.error('[TimeManagementController] Error in recordPunch:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message || 'Failed to record punch');
        }
    }
    async getAttendance(employeeId, date) {
        if (!employeeId) {
            throw new common_1.BadRequestException('Missing employeeId');
        }
        return this.tmService.getAttendance(employeeId, date);
    }
    async getExceptions(employeeId) {
        if (!employeeId) {
            throw new common_1.BadRequestException('Missing employeeId');
        }
        return this.tmService.getExceptions(employeeId);
    }
    async createException(body) {
        if (!body.employeeId ||
            !body.recordId ||
            !body.reason ||
            !body.assignedToId) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const exceptionType = body.type ? (index_1.TimeExceptionType[body.type] || undefined) : undefined;
        const permissionType = body.permissionType ? (index_1.PermissionType[body.permissionType] || undefined) : undefined;
        const requestedDate = body.requestedDate ? new Date(body.requestedDate) : undefined;
        return this.tmService.createTimeException(body.employeeId, body.recordId, body.reason, body.assignedToId, exceptionType, permissionType, body.durationMinutes, requestedDate);
    }
    async correctAttendance(body) {
        if (!body.employeeId || !body.date || !body.punches) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const dateObj = new Date(body.date);
        return this.tmService.correctAttendance(body.employeeId, dateObj, body.punches);
    }
    async detectMissedPunch(body) {
        if (!body.employeeId || !body.date) {
            throw new common_1.BadRequestException('Missing employeeId/date');
        }
        const dateObj = new Date(body.date);
        return this.tmService.detectMissedPunches(body.employeeId, dateObj);
    }
    async getNotifications(employeeId) {
        return this.tmService.getNotifications(employeeId);
    }
    async approveException(exceptionId, body) {
        if (!body.approvedBy) {
            throw new common_1.BadRequestException('approvedBy is required');
        }
        return this.tmService.approveException(exceptionId, body.approvedBy, body.notes);
    }
    async rejectException(exceptionId, body) {
        if (!body.rejectedBy) {
            throw new common_1.BadRequestException('rejectedBy is required');
        }
        return this.tmService.rejectException(exceptionId, body.rejectedBy, body.reason);
    }
    async getAllExceptions(status, assignedTo, employeeId) {
        return this.tmService.getAllExceptions(status, assignedTo, employeeId);
    }
    async escalateException(exceptionId, body) {
        if (!body.escalatedTo) {
            throw new common_1.BadRequestException('escalatedTo is required');
        }
        return this.tmService.escalateException(exceptionId, body.escalatedTo, body.reason);
    }
};
exports.TimeManagementController = TimeManagementController;
__decorate([
    (0, common_1.Post)('punch'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_punch_dto_1.CreatePunchDto]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "recordPunch", null);
__decorate([
    (0, common_1.Get)('attendance/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Get)('exceptions/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getExceptions", null);
__decorate([
    (0, common_1.Post)('exceptions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "createException", null);
__decorate([
    (0, common_1.Post)('attendance/correct'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "correctAttendance", null);
__decorate([
    (0, common_1.Post)('attendance/detect-missed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "detectMissedPunch", null);
__decorate([
    (0, common_1.Get)('notifications/employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Post)('exceptions/:id/approve'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'department head'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "approveException", null);
__decorate([
    (0, common_1.Post)('exceptions/:id/reject'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'department head'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "rejectException", null);
__decorate([
    (0, common_1.Get)('exceptions'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'department head'),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('assignedTo')),
    __param(2, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "getAllExceptions", null);
__decorate([
    (0, common_1.Post)('exceptions/:id/escalate'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('HR Manager', 'SYSTEM_ADMIN', 'HR_ADMIN', 'department head'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TimeManagementController.prototype, "escalateException", null);
exports.TimeManagementController = TimeManagementController = __decorate([
    (0, common_1.Controller)('time-management'),
    __metadata("design:paramtypes", [time_management_service_1.TimeManagementService])
], TimeManagementController);
//# sourceMappingURL=time-management.controller.js.map