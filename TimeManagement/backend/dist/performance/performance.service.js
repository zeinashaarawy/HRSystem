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
exports.PerformanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appraisal_template_schema_1 = require("./models/appraisal-template.schema");
const appraisal_cycle_schema_1 = require("./models/appraisal-cycle.schema");
const appraisal_record_schema_1 = require("./models/appraisal-record.schema");
const appraisal_dispute_schema_1 = require("./models/appraisal-dispute.schema");
const performance_enums_1 = require("./enums/performance.enums");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
let PerformanceService = class PerformanceService {
    templateModel;
    cycleModel;
    recordModel;
    disputeModel;
    employeeModel;
    constructor(templateModel, cycleModel, recordModel, disputeModel, employeeModel) {
        this.templateModel = templateModel;
        this.cycleModel = cycleModel;
        this.recordModel = recordModel;
        this.disputeModel = disputeModel;
        this.employeeModel = employeeModel;
    }
    async createTemplate(dto) {
        if (!dto.criteria || dto.criteria.length === 0) {
            throw new common_1.BadRequestException("Template must have at least one criterion");
        }
        return this.templateModel.create(dto);
    }
    async getAllTemplates() {
        return this.templateModel.find().lean();
    }
    async getTemplateById(id) {
        const template = await this.templateModel.findById(id).lean();
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async updateTemplate(id, body) {
        const updated = await this.templateModel
            .findByIdAndUpdate(id, body, { new: true })
            .lean();
        if (!updated)
            throw new common_1.NotFoundException('Template not found');
        return updated;
    }
    async deleteTemplate(id) {
        const deleted = await this.templateModel.findByIdAndDelete(id).lean();
        if (!deleted)
            throw new common_1.NotFoundException('Template not found');
        return { message: 'Template deleted', id };
    }
    async createCycle(body) {
        const created = new this.cycleModel({
            ...body,
            status: performance_enums_1.AppraisalCycleStatus.PLANNED,
        });
        return created.save();
    }
    async getAllCycles() {
        return this.cycleModel.find().lean();
    }
    async getCycleById(id) {
        const cycle = await this.cycleModel.findById(id).lean();
        if (!cycle)
            throw new common_1.NotFoundException('Cycle not found');
        return cycle;
    }
    async updateCycle(id, body) {
        const updated = await this.cycleModel
            .findByIdAndUpdate(id, body, { new: true })
            .lean();
        if (!updated)
            throw new common_1.NotFoundException('Cycle not found');
        return updated;
    }
    async activateCycle(id) {
        return this.updateCycle(id, {
            status: performance_enums_1.AppraisalCycleStatus.ACTIVE,
            publishedAt: new Date(),
        });
    }
    async closeCycle(id) {
        return this.updateCycle(id, {
            status: performance_enums_1.AppraisalCycleStatus.CLOSED,
            closedAt: new Date(),
        });
    }
    async archiveCycle(id) {
        return this.updateCycle(id, {
            status: performance_enums_1.AppraisalCycleStatus.ARCHIVED,
            archivedAt: new Date(),
        });
    }
    async createAppraisal(dto, managerId) {
        const employee = await this.employeeModel.findOne({
            employeeNumber: dto.employeeProfileId,
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with number ${dto.employeeProfileId} not found`);
        }
        const record = new this.recordModel({
            cycleId: new mongoose_2.Types.ObjectId(dto.cycleId),
            templateId: new mongoose_2.Types.ObjectId(dto.templateId),
            employeeProfileId: employee._id,
            assignmentId: new mongoose_2.Types.ObjectId(),
            managerProfileId: new mongoose_2.Types.ObjectId(managerId),
            status: performance_enums_1.AppraisalRecordStatus.DRAFT,
            createdAt: new Date(),
        });
        return record.save();
    }
    async updateAppraisal(id, dto, managerId) {
        const record = await this.recordModel.findById(id);
        if (!record)
            throw new common_1.NotFoundException('Appraisal not found');
        if (record.managerProfileId.toString() !== managerId) {
            throw new common_1.ForbiddenException('Not the manager of this employee');
        }
        Object.assign(record, dto);
        return record.save();
    }
    async updateAppraisalStatus(id, dto, managerId) {
        const record = await this.recordModel.findById(id);
        if (!record)
            throw new common_1.NotFoundException('Appraisal not found');
        if (record.managerProfileId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You cannot submit this appraisal');
        }
        if (dto.status !== performance_enums_1.AppraisalRecordStatus.MANAGER_SUBMITTED) {
            throw new common_1.ForbiddenException('Managers can ONLY set status = MANAGER_SUBMITTED');
        }
        record.status = performance_enums_1.AppraisalRecordStatus.MANAGER_SUBMITTED;
        record.managerSubmittedAt = new Date();
        return record.save();
    }
    async publishAppraisal(id, hrId, dto) {
        const record = await this.recordModel.findById(id);
        if (!record)
            throw new common_1.NotFoundException('Appraisal not found');
        if (dto.status !== performance_enums_1.AppraisalRecordStatus.HR_PUBLISHED) {
            throw new common_1.ForbiddenException('HR can ONLY set status = HR_PUBLISHED');
        }
        record.status = performance_enums_1.AppraisalRecordStatus.HR_PUBLISHED;
        record.hrPublishedAt = new Date();
        record.publishedByEmployeeId = new mongoose_2.Types.ObjectId(hrId);
        return record.save();
    }
    async findCycleAppraisals(cycleId) {
        return this.recordModel
            .find({ cycleId: new mongoose_2.Types.ObjectId(cycleId) })
            .populate({
            path: "employeeProfileId",
            select: "firstName lastName employeeNumber",
        })
            .lean();
    }
    async findMyAppraisals(employeeId) {
        return this.recordModel.find({
            employeeProfileId: new mongoose_2.Types.ObjectId(employeeId),
        }).lean();
    }
    async findMyAppraisalById(employeeId, recordId) {
        const record = await this.recordModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(recordId),
            employeeProfileId: new mongoose_2.Types.ObjectId(employeeId),
        })
            .populate({
            path: "cycleId",
            select: "name status",
        })
            .populate({
            path: "templateId",
            select: "name",
        })
            .lean();
        if (!record) {
            throw new common_1.NotFoundException("Appraisal not found");
        }
        return record;
    }
    async getAppraisalById(id) {
        const record = await this.recordModel.findById(id).lean();
        if (!record)
            throw new common_1.NotFoundException('Appraisal not found');
        return record;
    }
    async employeeAcknowledgeAppraisal(appraisalId, employeeId, comment) {
        const record = await this.recordModel.findById(appraisalId);
        if (!record)
            throw new common_1.NotFoundException('Appraisal not found');
        if (record.employeeProfileId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('Not your appraisal record');
        }
        record.employeeAcknowledgedAt = new Date();
        record.employeeAcknowledgementComment = comment ?? null;
        await record.save();
        return { message: 'Acknowledgement updated ✅', id: record._id };
    }
    async createDispute(appraisalId, dto, employeeId) {
        const record = await this.recordModel.findById(appraisalId);
        if (!record)
            throw new common_1.NotFoundException('Appraisal not found');
        if (record.employeeProfileId.toString() !== employeeId) {
            throw new common_1.ForbiddenException('Not your appraisal record');
        }
        await this.disputeModel.collection.insertOne({
            appraisalId: record._id,
            assignmentId: record.assignmentId,
            cycleId: record.cycleId,
            raisedByEmployeeId: new mongoose_2.Types.ObjectId(employeeId),
            reason: dto.reason,
            details: dto.details ?? null,
            status: performance_enums_1.AppraisalDisputeStatus.OPEN,
            submittedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { message: 'Dispute created ✅' };
    }
    async canRaiseDispute(cycleId) {
        const cycle = await this.cycleModel.findById(cycleId);
        if (!cycle)
            throw new common_1.NotFoundException("Cycle not found");
        const now = new Date();
        if (cycle.endDate && now > cycle.endDate) {
            return false;
        }
        return true;
    }
    async listDisputes(status) {
        const filter = {};
        if (status)
            filter.status = status;
        return this.disputeModel.find(filter).lean();
    }
    async publishCycleResults(id) {
        const cycle = await this.cycleModel.findById(id);
        if (!cycle)
            throw new common_1.NotFoundException('Cycle not found');
        const notPublished = await this.recordModel.findOne({
            cycleId: id,
            status: { $ne: performance_enums_1.AppraisalRecordStatus.HR_PUBLISHED },
        });
        if (notPublished) {
            throw new common_1.BadRequestException('Cannot publish results: some appraisals are not published by HR');
        }
        cycle.status = performance_enums_1.AppraisalCycleStatus.CLOSED;
        cycle.closedAt = new Date();
        cycle.publishedAt = new Date();
        return cycle.save();
    }
    async deleteDispute(id) {
        const deleted = await this.disputeModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Dispute not found');
        return { message: "Dispute deleted ✅", id };
    }
    async resolveDispute(id, dto, hrId) {
        const dispute = await this.disputeModel.findById(id);
        if (!dispute)
            throw new common_1.NotFoundException('Dispute not found');
        if (dto.newStatus !== performance_enums_1.AppraisalDisputeStatus.ADJUSTED) {
            throw new common_1.ForbiddenException('Since the enum cannot be changed, HR can only resolve by setting status = ADJUSTED');
        }
        dispute.status = performance_enums_1.AppraisalDisputeStatus.ADJUSTED;
        dispute.resolutionSummary = dto.resolutionSummary;
        dispute.resolvedAt = new Date();
        dispute.resolvedByEmployeeId = new mongoose_2.Types.ObjectId(hrId);
        return dispute.save();
    }
    async getDisputeById(id) {
        return this.disputeModel.findById(id).lean();
    }
};
exports.PerformanceService = PerformanceService;
exports.PerformanceService = PerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appraisal_template_schema_1.AppraisalTemplate.name)),
    __param(1, (0, mongoose_1.InjectModel)(appraisal_cycle_schema_1.AppraisalCycle.name)),
    __param(2, (0, mongoose_1.InjectModel)(appraisal_record_schema_1.AppraisalRecord.name)),
    __param(3, (0, mongoose_1.InjectModel)(appraisal_dispute_schema_1.AppraisalDispute.name)),
    __param(4, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PerformanceService);
//# sourceMappingURL=performance.service.js.map