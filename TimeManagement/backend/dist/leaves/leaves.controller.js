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
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const leaves_service_1 = require("./leaves.service");
const create_leave_type_dto_1 = require("./dto/create-leave-type.dto");
const update_leave_type_dto_1 = require("./dto/update-leave-type.dto");
const create_policy_dto_1 = require("./dto/create-policy.dto");
const update_policy_dto_1 = require("./dto/update-policy.dto");
const create_leave_request_dto_1 = require("./dto/create-leave-request.dto");
const update_leave_request_dto_1 = require("./dto/update-leave-request.dto");
const approve_request_dto_1 = require("./dto/approve-request.dto");
const create_leave_entitlement_dto_1 = require("./dto/create-leave-entitlement.dto");
const update_leave_entitlement_dto_1 = require("./dto/update-leave-entitlement.dto");
const create_adjustment_dto_1 = require("./dto/create-adjustment.dto");
const approve_adjustment_dto_1 = require("./dto/approve-adjustment.dto");
const create_calendar_dto_1 = require("./dto/create-calendar.dto");
const update_calendar_dto_1 = require("./dto/update-calendar.dto");
const create_blocked_period_dto_1 = require("./dto/create-blocked-period.dto");
let LeavesController = class LeavesController {
    service;
    constructor(service) {
        this.service = service;
    }
    createLeaveType(dto) {
        return this.service.leaveType.create(dto);
    }
    findAllLeaveTypes() {
        return this.service.leaveType.findAll();
    }
    findLeaveType(id) {
        return this.service.leaveType.findOne(id);
    }
    findLeaveTypeByCode(code) {
        return this.service.leaveType.findByCode(code);
    }
    updateLeaveType(id, dto) {
        return this.service.leaveType.update(id, dto);
    }
    removeLeaveType(id) {
        return this.service.leaveType.remove(id);
    }
    createPolicy(dto) {
        return this.service.leavePolicy.create(dto);
    }
    findAllPolicies() {
        return this.service.leavePolicy.findAll();
    }
    findPolicy(id) {
        return this.service.leavePolicy.findOne(id);
    }
    updatePolicy(id, dto) {
        return this.service.leavePolicy.update(id, dto);
    }
    removePolicy(id) {
        return this.service.leavePolicy.remove(id);
    }
    createRequest(dto) {
        return this.service.leaveRequest.create(dto);
    }
    findAllRequests() {
        return this.service.leaveRequest.findAll();
    }
    findRequest(id) {
        return this.service.leaveRequest.findOne(id);
    }
    updateRequest(id, dto) {
        return this.service.leaveRequest.update(id, dto);
    }
    approveReq(id, dto) {
        return this.service.leaveRequest.managerApprove(id, dto.approverId);
    }
    rejectReq(id, dto) {
        return this.service.leaveRequest.managerReject(id, dto.approverId, dto.comment);
    }
    createEntitlement(dto) {
        return this.service.leaveEntitlement.create(dto);
    }
    getEmployeeEnt(employeeId) {
        return this.service.leaveEntitlement.findByEmployee(employeeId);
    }
    updateEnt(employeeId, dto) {
        return this.service.leaveEntitlement.update(employeeId, dto);
    }
    removeEnt(employeeId) {
        return this.service.leaveEntitlement.removeByEmployee(employeeId);
    }
    createAdjustment(dto) {
        return this.service.leaveAdjustment.create(dto);
    }
    approveAdjustment(id, dto) {
        return this.service.leaveAdjustment.approve(id, dto);
    }
    createCalendar(dto) {
        return this.service.calendar.create(dto);
    }
    findCalendar(year) {
        return this.service.calendar.findByYear(year);
    }
    updateCalendar(year, dto) {
        return this.service.calendar.update(year, dto);
    }
    addBlocked(year, dto) {
        return this.service.calendar.addBlockedPeriod(year, dto);
    }
    removeBlockedPeriod(year, index) {
        return this.service.calendar.removeBlockedPeriod(year, index);
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Post)('leave-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_type_dto_1.CreateLeaveTypeDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createLeaveType", null);
__decorate([
    (0, common_1.Get)('leave-type'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findAllLeaveTypes", null);
__decorate([
    (0, common_1.Get)('leave-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findLeaveType", null);
__decorate([
    (0, common_1.Get)('leave-type/code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findLeaveTypeByCode", null);
__decorate([
    (0, common_1.Patch)('leave-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_type_dto_1.UpdateLeaveTypeDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateLeaveType", null);
__decorate([
    (0, common_1.Delete)('leave-type/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "removeLeaveType", null);
__decorate([
    (0, common_1.Post)('leave-policy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_policy_dto_1.CreatePolicyDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Get)('leave-policy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findAllPolicies", null);
__decorate([
    (0, common_1.Get)('leave-policy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findPolicy", null);
__decorate([
    (0, common_1.Patch)('leave-policy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_policy_dto_1.UpdatePolicyDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updatePolicy", null);
__decorate([
    (0, common_1.Delete)('leave-policy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "removePolicy", null);
__decorate([
    (0, common_1.Post)('leave-request'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_request_dto_1.CreateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('leave-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findAllRequests", null);
__decorate([
    (0, common_1.Get)('leave-request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findRequest", null);
__decorate([
    (0, common_1.Put)('leave-request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_request_dto_1.UpdateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateRequest", null);
__decorate([
    (0, common_1.Put)('leave-request/:id/approve/manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_request_dto_1.ApproveRequestDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "approveReq", null);
__decorate([
    (0, common_1.Put)('leave-request/:id/reject/manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_request_dto_1.ApproveRequestDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "rejectReq", null);
__decorate([
    (0, common_1.Post)('leave-entitlement'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_entitlement_dto_1.CreateLeaveEntitlementDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createEntitlement", null);
__decorate([
    (0, common_1.Get)('leave-entitlement/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "getEmployeeEnt", null);
__decorate([
    (0, common_1.Put)('leave-entitlement/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_entitlement_dto_1.UpdateLeaveEntitlementDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateEnt", null);
__decorate([
    (0, common_1.Delete)('leave-entitlement/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "removeEnt", null);
__decorate([
    (0, common_1.Post)('leave-adjustment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_adjustment_dto_1.CreateAdjustmentDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createAdjustment", null);
__decorate([
    (0, common_1.Put)('leave-adjustment/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_adjustment_dto_1.ApproveAdjustmentDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "approveAdjustment", null);
__decorate([
    (0, common_1.Post)('calendar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calendar_dto_1.CreateCalendarDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "createCalendar", null);
__decorate([
    (0, common_1.Get)('calendar/:year'),
    __param(0, (0, common_1.Param)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "findCalendar", null);
__decorate([
    (0, common_1.Patch)('calendar/:year'),
    __param(0, (0, common_1.Param)('year', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_calendar_dto_1.UpdateCalendarDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateCalendar", null);
__decorate([
    (0, common_1.Post)('calendar/:year/blocked-period'),
    __param(0, (0, common_1.Param)('year', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_blocked_period_dto_1.CreateBlockedPeriodDto]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "addBlocked", null);
__decorate([
    (0, common_1.Delete)('calendar/:year/blocked-period/:index'),
    __param(0, (0, common_1.Param)('year', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('index', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "removeBlockedPeriod", null);
exports.LeavesController = LeavesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map