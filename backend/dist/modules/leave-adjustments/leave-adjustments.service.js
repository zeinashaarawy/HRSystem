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
exports.LeaveAdjustmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_adjustment_schema_1 = require("./schemas/leave-adjustment.schema");
const employee_leave_balance_service_1 = require("../employee-leave-balance/employee-leave-balance.service");
let LeaveAdjustmentsService = class LeaveAdjustmentsService {
    adjModel;
    balanceService;
    constructor(adjModel, balanceService) {
        this.adjModel = adjModel;
        this.balanceService = balanceService;
    }
    async create(dto) {
        const doc = new this.adjModel({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            leaveTypeCode: dto.leaveTypeCode,
            days: dto.days,
            reason: dto.reason,
            status: 'pending',
            auditTrail: [{ action: 'created', at: new Date() }],
        });
        return doc.save();
    }
    async findAll() {
        return this.adjModel.find().lean();
    }
    async findById(id) {
        const doc = await this.adjModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Adjustment not found');
        return doc;
    }
    async approve(id, dto) {
        const doc = await this.adjModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Adjustment not found');
        if (doc.status !== 'pending')
            throw new common_1.BadRequestException('Already processed');
        doc.status = 'approved';
        doc.approverId = new mongoose_2.Types.ObjectId(dto.approverId);
        doc.auditTrail.push({ action: 'approved', by: dto.approverId, comment: dto.comment, at: new Date() });
        await doc.save();
        if (this.balanceService) {
            await this.balanceService.adjustBalance(doc.employeeId.toString(), doc.leaveTypeCode, doc.days);
        }
        return doc;
    }
    async reject(id, approverId, reason) {
        const doc = await this.adjModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Adjustment not found');
        doc.status = 'rejected';
        doc.approverId = new mongoose_2.Types.ObjectId(approverId);
        doc.auditTrail.push({ action: 'rejected', by: approverId, reason, at: new Date() });
        return doc.save();
    }
};
exports.LeaveAdjustmentsService = LeaveAdjustmentsService;
exports.LeaveAdjustmentsService = LeaveAdjustmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_adjustment_schema_1.LeaveAdjustment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employee_leave_balance_service_1.EmployeeLeaveBalanceService])
], LeaveAdjustmentsService);
//# sourceMappingURL=leave-adjustments.service.js.map