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
exports.LeaveRequestsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_request_schema_1 = require("./schemas/leave-request.schema");
let LeaveRequestsService = class LeaveRequestsService {
    requestModel;
    constructor(requestModel) {
        this.requestModel = requestModel;
    }
    async create(dto) {
        const start = new Date(dto.startDate);
        const end = new Date(dto.endDate);
        if (start > end)
            throw new common_1.BadRequestException('startDate must be <= endDate');
        const doc = new this.requestModel({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            leaveTypeCode: dto.leaveTypeCode,
            startDate: start,
            endDate: end,
            justification: dto.justification,
            documentUrl: dto.documentUrl,
            status: 'pending',
            auditTrail: [{ action: 'created', at: new Date() }],
        });
        return doc.save();
    }
    async findAll() {
        return this.requestModel.find().lean();
    }
    async findByEmployee(employeeId) {
        return this.requestModel
            .find({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .lean();
    }
    async findOne(id) {
        const doc = await this.requestModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Leave request not found');
        return doc;
    }
    async update(id, dto) {
        const doc = await this.requestModel.findByIdAndUpdate(id, {
            $set: {
                ...(dto.startDate ? { startDate: new Date(dto.startDate) } : {}),
                ...(dto.endDate ? { endDate: new Date(dto.endDate) } : {}),
                ...(dto.justification ? { justification: dto.justification } : {}),
                ...(dto.documentUrl ? { documentUrl: dto.documentUrl } : {}),
            },
            $push: { auditTrail: { action: 'update', at: new Date() } },
        }, { new: true });
        if (!doc)
            throw new common_1.NotFoundException('Leave request not found');
        return doc;
    }
    async cancel(id, requestedById) {
        const doc = await this.requestModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Leave request not found');
        doc.status = 'cancelled';
        doc.auditTrail.push({ action: 'cancelled', by: requestedById ?? 'system', at: new Date() });
        return doc.save();
    }
    async managerApprove(id, managerId) {
        const doc = await this.requestModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Leave request not found');
        if (doc.status !== 'pending')
            throw new common_1.BadRequestException('Request not pending');
        doc.status = 'approved';
        doc.managerId = new mongoose_2.Types.ObjectId(managerId);
        doc.auditTrail.push({ action: 'manager_approved', by: managerId, at: new Date() });
        return doc.save();
    }
    async managerReject(id, managerId, reason) {
        const doc = await this.requestModel.findById(id);
        if (!doc)
            throw new common_1.NotFoundException('Leave request not found');
        doc.status = 'rejected';
        doc.managerId = new mongoose_2.Types.ObjectId(managerId);
        doc.auditTrail.push({ action: 'manager_rejected', by: managerId, reason, at: new Date() });
        return doc.save();
    }
};
exports.LeaveRequestsService = LeaveRequestsService;
exports.LeaveRequestsService = LeaveRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_request_schema_1.LeaveRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeaveRequestsService);
//# sourceMappingURL=leave-requests.service.js.map