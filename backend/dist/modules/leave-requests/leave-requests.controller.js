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
exports.LeaveRequestsController = void 0;
const common_1 = require("@nestjs/common");
const leave_requests_service_1 = require("./leave-requests.service");
const create_leave_request_dto_1 = require("./dto/create-leave-request.dto");
const update_leave_request_dto_1 = require("./dto/update-leave-request.dto");
const approve_request_dto_1 = require("./dto/approve-request.dto");
let LeaveRequestsController = class LeaveRequestsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findByEmployee(employeeId) {
        return this.service.findByEmployee(employeeId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    cancel(id, requestedBy) {
        return this.service.cancel(id, requestedBy);
    }
    managerApprove(id, dto) {
        return this.service.managerApprove(id, dto.approverId);
    }
    managerReject(id, dto) {
        return this.service.managerReject(id, dto.approverId, dto.comment);
    }
    remove(id) {
        return this.service.cancel(id, 'system');
    }
};
exports.LeaveRequestsController = LeaveRequestsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_request_dto_1.CreateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/employee/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_request_dto_1.UpdateLeaveRequestDto]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('requestedBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Put)(':id/approve/manager'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_request_dto_1.ApproveRequestDto]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "managerApprove", null);
__decorate([
    (0, common_1.Put)(':id/reject/manager'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_request_dto_1.ApproveRequestDto]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "managerReject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveRequestsController.prototype, "remove", null);
exports.LeaveRequestsController = LeaveRequestsController = __decorate([
    (0, common_1.Controller)('leave-requests'),
    __metadata("design:paramtypes", [leave_requests_service_1.LeaveRequestsService])
], LeaveRequestsController);
//# sourceMappingURL=leave-requests.controller.js.map