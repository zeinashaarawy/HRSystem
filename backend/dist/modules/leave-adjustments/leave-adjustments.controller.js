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
exports.LeaveAdjustmentsController = void 0;
const common_1 = require("@nestjs/common");
const leave_adjustments_service_1 = require("./leave-adjustments.service");
const create_adjustment_dto_1 = require("./dto/create-adjustment.dto");
const approve_adjustment_dto_1 = require("./dto/approve-adjustment.dto");
let LeaveAdjustmentsController = class LeaveAdjustmentsController {
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
    findOne(id) {
        return this.service.findById(id);
    }
    approve(id, dto) {
        return this.service.approve(id, dto);
    }
    reject(id, dto) {
        return this.service.reject(id, dto.approverId, dto.comment);
    }
};
exports.LeaveAdjustmentsController = LeaveAdjustmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_adjustment_dto_1.CreateAdjustmentDto]),
    __metadata("design:returntype", void 0)
], LeaveAdjustmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaveAdjustmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaveAdjustmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/approve'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_adjustment_dto_1.ApproveAdjustmentDto]),
    __metadata("design:returntype", void 0)
], LeaveAdjustmentsController.prototype, "approve", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_adjustment_dto_1.ApproveAdjustmentDto]),
    __metadata("design:returntype", void 0)
], LeaveAdjustmentsController.prototype, "reject", null);
exports.LeaveAdjustmentsController = LeaveAdjustmentsController = __decorate([
    (0, common_1.Controller)('leave-adjustments'),
    __metadata("design:paramtypes", [leave_adjustments_service_1.LeaveAdjustmentsService])
], LeaveAdjustmentsController);
//# sourceMappingURL=leave-adjustments.controller.js.map