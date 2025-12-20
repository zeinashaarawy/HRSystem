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
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_type_schema_1 = require("./models/leave-type.schema");
const leave_category_schema_1 = require("./models/leave-category.schema");
const leave_policy_schema_1 = require("./models/leave-policy.schema");
const leave_request_schema_1 = require("./models/leave-request.schema");
const attachment_schema_1 = require("./models/attachment.schema");
const leave_entitlement_schema_1 = require("./models/leave-entitlement.schema");
const leave_adjustment_schema_1 = require("./models/leave-adjustment.schema");
const calendar_schema_1 = require("./models/calendar.schema");
const holiday_schema_1 = require("../time-management/holiday/schemas/holiday.schema");
const leave_status_enum_1 = require("./enums/leave-status.enum");
const adjustment_type_enum_1 = require("./enums/adjustment-type.enum");
let LeavesService = class LeavesService {
    leaveTypeModel;
    leaveCategoryModel;
    leavePolicyModel;
    requestModel;
    attachmentModel;
    entitlementModel;
    adjustmentModel;
    calendarModel;
    holidayModel;
    constructor(leaveTypeModel, leaveCategoryModel, leavePolicyModel, requestModel, attachmentModel, entitlementModel, adjustmentModel, calendarModel, holidayModel) {
        this.leaveTypeModel = leaveTypeModel;
        this.leaveCategoryModel = leaveCategoryModel;
        this.leavePolicyModel = leavePolicyModel;
        this.requestModel = requestModel;
        this.attachmentModel = attachmentModel;
        this.entitlementModel = entitlementModel;
        this.adjustmentModel = adjustmentModel;
        this.calendarModel = calendarModel;
        this.holidayModel = holidayModel;
    }
    leaveType = {
        create: async (dto) => {
            const exists = await this.leaveTypeModel
                .findOne({ code: dto.code })
                .exec();
            if (exists)
                throw new common_1.ConflictException(`Leave type with code '${dto.code}' already exists`);
            return new this.leaveTypeModel(dto).save();
        },
        findAll: async () => this.leaveTypeModel.find().exec(),
        findActive: async () => this.leaveTypeModel.find({ isActive: true }).exec(),
        findOne: async (id) => {
            const doc = await this.leaveTypeModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
            return doc;
        },
        findByCode: async (code) => {
            const doc = await this.leaveTypeModel.findOne({ code }).exec();
            if (!doc)
                throw new common_1.NotFoundException(`Leave type with code '${code}' not found`);
            return doc;
        },
        update: async (id, dto) => {
            if (dto.code) {
                const exists = await this.leaveTypeModel
                    .findOne({ code: dto.code, _id: { $ne: id } })
                    .exec();
                if (exists)
                    throw new common_1.ConflictException(`Leave type with code '${dto.code}' already exists`);
            }
            const updated = await this.leaveTypeModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            if (!updated)
                throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
            return updated;
        },
        remove: async (id) => {
            const result = await this.leaveTypeModel.findByIdAndDelete(id).exec();
            if (!result)
                throw new common_1.NotFoundException(`Leave type with ID '${id}' not found`);
        },
    };
    leavePolicy = {
        create: async (dto) => {
            const doc = new this.leavePolicyModel({
                ...dto,
                leaveTypeId: dto.leaveTypeId
                    ? new mongoose_2.Types.ObjectId(dto.leaveTypeId)
                    : undefined,
            });
            return doc.save();
        },
        findAll: async () => this.leavePolicyModel.find().exec(),
        findActive: async () => {
            const now = new Date();
            return this.leavePolicyModel
                .find({
                isActive: true,
                $or: [
                    { effectiveFrom: { $lte: now }, effectiveTo: { $gte: now } },
                    { effectiveFrom: { $lte: now }, effectiveTo: null },
                    { effectiveFrom: null, effectiveTo: null },
                ],
            })
                .exec();
        },
        findByType: async (policyType) => this.leavePolicyModel.find({ policyType, isActive: true }).exec(),
        findOne: async (id) => {
            const doc = await this.leavePolicyModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
            return doc;
        },
        update: async (id, dto) => {
            const updated = await this.leavePolicyModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            if (!updated)
                throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
            return updated;
        },
        remove: async (id) => {
            const deleted = await this.leavePolicyModel.findByIdAndDelete(id).exec();
            if (!deleted)
                throw new common_1.NotFoundException(`Policy with ID '${id}' not found`);
        },
    };
    leaveRequest = {
        create: async (dto) => {
            const from = new Date(dto.startDate);
            const to = new Date(dto.endDate);
            if (from > to)
                throw new common_1.BadRequestException('startDate must be <= endDate');
            const durationDays = (to.getTime() - from.getTime()) / 86400000 + 1;
            const doc = new this.requestModel({
                employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
                dates: { from, to },
                durationDays,
                justification: dto.justification,
                attachmentId: dto.attachmentId
                    ? new mongoose_2.Types.ObjectId(dto.attachmentId)
                    : undefined,
                approvalFlow: [],
                status: leave_status_enum_1.LeaveStatus.PENDING,
                irregularPatternFlag: false,
            });
            return doc.save();
        },
        findAll: async () => this.requestModel.find().lean(),
        findByEmployee: async (employeeId) => this.requestModel
            .find({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .sort({ createdAt: -1 })
            .lean(),
        findOne: async (id) => {
            const doc = await this.requestModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException('Leave request not found');
            return doc;
        },
        update: async (id, dto) => {
            const updatePayload = {};
            if (dto.startDate)
                updatePayload['dates.from'] = new Date(dto.startDate);
            if (dto.endDate)
                updatePayload['dates.to'] = new Date(dto.endDate);
            if (dto.startDate && dto.endDate) {
                const f = new Date(dto.startDate);
                const t = new Date(dto.endDate);
                if (f > t)
                    throw new common_1.BadRequestException('startDate must be <= endDate');
            }
            if (dto.justification)
                updatePayload.justification = dto.justification;
            if (dto.attachmentId)
                updatePayload.attachmentId = new mongoose_2.Types.ObjectId(dto.attachmentId);
            const doc = await this.requestModel
                .findByIdAndUpdate(id, { $set: updatePayload }, { new: true })
                .exec();
            if (!doc)
                throw new common_1.NotFoundException('Leave request not found');
            return doc;
        },
        cancel: async (id, requestedById) => {
            const doc = await this.requestModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException('Leave request not found');
            doc.status = leave_status_enum_1.LeaveStatus.CANCELLED;
            doc.approvalFlow.push({
                role: 'system',
                status: 'cancelled',
                decidedBy: requestedById
                    ? new mongoose_2.Types.ObjectId(requestedById)
                    : undefined,
                decidedAt: new Date(),
            });
            return doc.save();
        },
        managerApprove: async (id, managerId) => {
            const doc = await this.requestModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException('Leave request not found');
            if (doc.status !== leave_status_enum_1.LeaveStatus.PENDING)
                throw new common_1.BadRequestException('Request is not pending');
            doc.status = leave_status_enum_1.LeaveStatus.APPROVED;
            doc.approvalFlow.push({
                role: 'manager',
                status: 'approved',
                decidedBy: new mongoose_2.Types.ObjectId(managerId),
                decidedAt: new Date(),
            });
            return doc.save();
        },
        managerReject: async (id, managerId, reason) => {
            const doc = await this.requestModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException('Leave request not found');
            doc.status = leave_status_enum_1.LeaveStatus.REJECTED;
            doc.approvalFlow.push({
                role: 'manager',
                status: reason ?? 'rejected',
                decidedBy: new mongoose_2.Types.ObjectId(managerId),
                decidedAt: new Date(),
            });
            return doc.save();
        },
    };
    leaveEntitlement = {
        create: async (dto) => {
            const exists = await this.entitlementModel.findOne({
                employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
                year: dto.year,
            });
            if (exists)
                throw new common_1.BadRequestException('Entitlement already exists.');
            const doc = new this.entitlementModel({
                employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
                yearlyEntitlement: dto.totalDays,
                carryForward: dto.carriedOverDays || 0,
                taken: 0,
                pending: 0,
                remaining: dto.totalDays + (dto.carriedOverDays || 0),
                accruedActual: 0,
                accruedRounded: 0,
            });
            return doc.save();
        },
        findAll: async () => this.entitlementModel.find().populate('leaveTypeId').lean(),
        findByEmployee: async (employeeId) => this.entitlementModel
            .find({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .populate('leaveTypeId')
            .lean(),
        update: async (employeeId, dto) => {
            const doc = await this.entitlementModel.findOne({
                employeeId: new mongoose_2.Types.ObjectId(employeeId),
                leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
            });
            if (!doc)
                throw new common_1.NotFoundException('Entitlement not found');
            if (dto.totalDays !== undefined)
                doc.yearlyEntitlement = dto.totalDays;
            if (dto.usedDays !== undefined)
                doc.taken = dto.usedDays;
            if (dto.pendingDays !== undefined)
                doc.pending = dto.pendingDays;
            doc.remaining =
                doc.yearlyEntitlement + doc.carryForward - doc.taken - doc.pending;
            return doc.save();
        },
        adjustBalance: async (employeeId, leaveTypeId, deltaDays) => {
            const doc = await this.entitlementModel.findOne({
                employeeId: new mongoose_2.Types.ObjectId(employeeId),
                leaveTypeId: new mongoose_2.Types.ObjectId(leaveTypeId),
            });
            if (!doc)
                throw new common_1.NotFoundException('Entitlement not found');
            doc.taken += deltaDays;
            doc.remaining =
                doc.yearlyEntitlement + doc.carryForward - doc.taken - doc.pending;
            if (doc.remaining < 0)
                throw new common_1.BadRequestException('Insufficient leave balance');
            return doc.save();
        },
        removeByEmployee: async (employeeId) => this.entitlementModel
            .deleteMany({ employeeId: new mongoose_2.Types.ObjectId(employeeId) })
            .exec(),
    };
    leaveAdjustment = {
        create: async (dto) => {
            const doc = new this.adjustmentModel({
                employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                leaveTypeId: new mongoose_2.Types.ObjectId(dto.leaveTypeId),
                adjustmentType: dto.adjustmentType,
                amount: dto.amount,
                reason: dto.reason,
                hrUserId: new mongoose_2.Types.ObjectId(dto.hrUserId),
            });
            return doc.save();
        },
        findAll: async () => this.adjustmentModel.find().lean(),
        findById: async (id) => {
            const doc = await this.adjustmentModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException('Adjustment not found');
            return doc;
        },
        approve: async (id, dto) => {
            const doc = await this.adjustmentModel.findById(id).exec();
            if (!doc)
                throw new common_1.NotFoundException('Adjustment not found');
            const delta = doc.adjustmentType === adjustment_type_enum_1.AdjustmentType.ADD ? doc.amount : -doc.amount;
            await this.leaveEntitlement.adjustBalance(doc.employeeId.toString(), doc.leaveTypeId.toString(), delta);
            doc.hrUserId = new mongoose_2.Types.ObjectId(dto.approverId);
            return doc.save();
        },
    };
    calendar = {
        create: async (dto) => {
            const exists = await this.calendarModel
                .findOne({ year: dto.year })
                .exec();
            if (exists)
                throw new common_1.ConflictException(`Calendar for year ${dto.year} already exists`);
            const holidayIds = [];
            if (dto.holidays && dto.holidays.length > 0) {
                for (const holidayDto of dto.holidays) {
                    const holidayDate = new Date(holidayDto.date);
                    holidayDate.setHours(0, 0, 0, 0);
                    const holidayType = holidayDto.type;
                    const startOfDay = new Date(holidayDate);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(holidayDate);
                    endOfDay.setHours(23, 59, 59, 999);
                    let existingHoliday = await this.holidayModel
                        .findOne({
                        startDate: { $gte: startOfDay, $lte: endOfDay },
                        name: holidayDto.name,
                    })
                        .exec();
                    if (!existingHoliday) {
                        existingHoliday = await this.holidayModel.create({
                            type: holidayType,
                            startDate: holidayDate,
                            endDate: holidayDate,
                            name: holidayDto.name,
                            active: true,
                        });
                    }
                    holidayIds.push(existingHoliday._id);
                }
            }
            const calendarData = {
                year: dto.year,
                holidays: holidayIds,
            };
            if (dto.blockedPeriods) {
                calendarData.blockedPeriods = dto.blockedPeriods.map((bp) => ({
                    from: new Date(bp.startDate),
                    to: new Date(bp.endDate),
                    reason: bp.reason,
                }));
            }
            return new this.calendarModel(calendarData).save();
        },
        findAll: async () => this.calendarModel.find().exec(),
        findByYear: async (year) => {
            const doc = await this.calendarModel
                .findOne({ year })
                .populate({
                path: 'holidays',
                model: 'Holiday',
            })
                .exec();
            if (!doc)
                throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
            return doc;
        },
        update: async (year, dto) => {
            const doc = await this.calendarModel.findOne({ year }).exec();
            if (!doc)
                throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
            if (dto.holidays && dto.holidays.length > 0) {
                const holidayIds = [];
                for (const holidayDto of dto.holidays) {
                    const holidayDate = new Date(holidayDto.date);
                    holidayDate.setHours(0, 0, 0, 0);
                    const holidayType = holidayDto.type;
                    const startOfDay = new Date(holidayDate);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(holidayDate);
                    endOfDay.setHours(23, 59, 59, 999);
                    let existingHoliday = await this.holidayModel
                        .findOne({
                        startDate: { $gte: startOfDay, $lte: endOfDay },
                        name: holidayDto.name,
                    })
                        .exec();
                    if (!existingHoliday) {
                        existingHoliday = await this.holidayModel.create({
                            type: holidayType,
                            startDate: holidayDate,
                            endDate: holidayDate,
                            name: holidayDto.name,
                            active: true,
                        });
                    }
                    holidayIds.push(existingHoliday._id);
                }
                doc.holidays = holidayIds;
            }
            if (dto.blockedPeriods !== undefined) {
                doc.blockedPeriods = dto.blockedPeriods.map((bp) => ({
                    from: new Date(bp.startDate),
                    to: new Date(bp.endDate),
                    reason: bp.reason,
                }));
            }
            return await doc.save();
        },
        remove: async (year) => {
            const result = await this.calendarModel.findOneAndDelete({ year }).exec();
            if (!result)
                throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        },
        addBlockedPeriod: async (year, dto) => {
            const cal = await this.calendarModel.findOne({ year }).exec();
            if (!cal)
                throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
            const start = new Date(dto.startDate);
            const end = new Date(dto.endDate);
            if (start > end)
                throw new common_1.BadRequestException('Start date must be before end date');
            cal.blockedPeriods.push({
                from: start,
                to: end,
                reason: dto.reason,
            });
            return cal.save();
        },
        removeBlockedPeriod: async (year, index) => {
            const cal = await this.calendarModel.findOne({ year }).exec();
            if (!cal)
                throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
            if (index < 0 || index >= cal.blockedPeriods.length)
                throw new common_1.BadRequestException('Invalid blocked period index');
            cal.blockedPeriods.splice(index, 1);
            return cal.save();
        },
    };
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_type_schema_1.LeaveType.name)),
    __param(1, (0, mongoose_1.InjectModel)(leave_category_schema_1.LeaveCategory.name)),
    __param(2, (0, mongoose_1.InjectModel)(leave_policy_schema_1.LeavePolicy.name)),
    __param(3, (0, mongoose_1.InjectModel)(leave_request_schema_1.LeaveRequest.name)),
    __param(4, (0, mongoose_1.InjectModel)(attachment_schema_1.Attachment.name)),
    __param(5, (0, mongoose_1.InjectModel)(leave_entitlement_schema_1.LeaveEntitlement.name)),
    __param(6, (0, mongoose_1.InjectModel)(leave_adjustment_schema_1.LeaveAdjustment.name)),
    __param(7, (0, mongoose_1.InjectModel)(calendar_schema_1.Calendar.name)),
    __param(8, (0, mongoose_1.InjectModel)(holiday_schema_1.Holiday.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map