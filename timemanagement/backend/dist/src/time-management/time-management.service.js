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
exports.TimeManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_record_schema_1 = require("./attendance/schemas/attendance-record.schema");
const time_exception_schema_1 = require("./attendance/schemas/time-exception.schema");
const index_1 = require("./enums/index");
const notification_log_schema_1 = require("./notifications/schemas/notification-log.schema");
const policy_engine_service_1 = require("./policy/services/policy-engine.service");
let TimeManagementService = class TimeManagementService {
    attendanceModel;
    exceptionModel;
    notificationModel;
    policyEngineService;
    constructor(attendanceModel, exceptionModel, notificationModel, policyEngineService) {
        this.attendanceModel = attendanceModel;
        this.exceptionModel = exceptionModel;
        this.notificationModel = notificationModel;
        this.policyEngineService = policyEngineService;
    }
    async recordPunch(dto) {
        const employeeObjectId = new mongoose_2.Types.ObjectId(dto.employeeId);
        const punchTime = new Date(dto.timestamp);
        const startOfDay = new Date(punchTime);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(punchTime);
        endOfDay.setHours(23, 59, 59, 999);
        let attendance = await this.attendanceModel.findOne({
            employeeId: employeeObjectId,
            'punches.time': { $gte: startOfDay, $lte: endOfDay },
        });
        if (!attendance) {
            attendance = new this.attendanceModel({
                employeeId: employeeObjectId,
                recordDate: startOfDay,
                punches: [],
                totalWorkMinutes: 0,
                hasMissedPunch: false,
                exceptionIds: [],
                finalisedForPayroll: true,
            });
        }
        attendance.punches.push({
            type: dto.type,
            time: punchTime,
        });
        attendance.totalWorkMinutes = this.calculateWorkedMinutes(attendance.punches);
        const hasInPunch = attendance.punches.some(p => p.type === 'IN');
        const hasOutPunch = attendance.punches.some(p => p.type === 'OUT');
        attendance.hasMissedPunch = !hasInPunch || !hasOutPunch;
        const savedRecord = await attendance.save();
        const punchesToday = savedRecord.punches.length;
        if (punchesToday < 2) {
            const existing = await this.exceptionModel.findOne({
                employeeId: employeeObjectId,
                type: 'MISSED_PUNCH',
                'createdAt': { $gte: startOfDay, $lte: endOfDay }
            });
            if (!existing) {
                const exception = await this.exceptionModel.create({
                    employeeId: employeeObjectId,
                    attendanceRecordId: savedRecord._id,
                    type: 'MISSED_PUNCH',
                    status: 'OPEN',
                    assignedTo: employeeObjectId,
                    reason: `Employee has only ${punchesToday} punch(es) on ${startOfDay.toDateString()}`,
                });
                await this.sendNotification(dto.employeeId, 'MISSED_PUNCH', `Missed punch detected: only ${punchesToday} punch(es) on ${startOfDay.toDateString()}`);
            }
        }
        return {
            message: 'Punch recorded successfully',
            attendance: savedRecord,
        };
    }
    async getNotifications(employeeId) {
        return this.notificationModel.find({ to: new mongoose_2.Types.ObjectId(employeeId) }).lean();
    }
    async sendNotification(to, type, message) {
        const notification = new this.notificationModel({
            to: new mongoose_2.Types.ObjectId(to),
            type,
            message,
        });
        return notification.save();
    }
    async getAttendance(employeeId, date) {
        const query = { employeeId: new mongoose_2.Types.ObjectId(employeeId) };
        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            query['punches.time'] = { $gte: start, $lte: end };
        }
        const record = await this.attendanceModel.findOne(query);
        if (!record)
            return { message: 'No attendance found', punches: [] };
        if (record.totalWorkMinutes === 0 && record.punches.length >= 2) {
            const punchesWithDates = record.punches.map(p => ({
                type: p.type,
                time: p.time instanceof Date ? p.time : new Date(p.time),
            }));
            record.totalWorkMinutes = this.calculateWorkedMinutes(punchesWithDates);
            const hasInPunch = punchesWithDates.some(p => p.type === 'IN');
            const hasOutPunch = punchesWithDates.some(p => p.type === 'OUT');
            record.hasMissedPunch = !hasInPunch || !hasOutPunch;
            await record.save();
        }
        return {
            _id: record._id,
            employeeId: record.employeeId,
            recordDate: record.recordDate,
            punches: record.punches,
            totalWorkMinutes: record.totalWorkMinutes,
            hasMissedPunch: record.hasMissedPunch,
            exceptionIds: record.exceptionIds,
            finalisedForPayroll: record.finalisedForPayroll,
        };
    }
    async createTimeException(employeeId, recordId, reason, assignedToId) {
        const exception = new this.exceptionModel({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
            attendanceRecordId: new mongoose_2.Types.ObjectId(recordId),
            reason,
            type: index_1.TimeExceptionType.MISSED_PUNCH,
            status: index_1.TimeExceptionStatus.OPEN,
            assignedTo: new mongoose_2.Types.ObjectId(assignedToId),
        });
        return exception.save();
    }
    async getExceptions(employeeId) {
        return this.exceptionModel.find({
            employeeId: new mongoose_2.Types.ObjectId(employeeId),
        }).exec();
    }
    async correctAttendance(employeeId, date, punches) {
        const employeeObjectId = new mongoose_2.Types.ObjectId(employeeId);
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        let attendance = await this.attendanceModel.findOne({
            employeeId: employeeObjectId,
            'punches.time': { $gte: startOfDay, $lte: endOfDay },
        });
        if (!attendance) {
            attendance = new this.attendanceModel({
                employeeId: employeeObjectId,
                recordDate: startOfDay,
                punches: [],
                totalWorkMinutes: 0,
                hasMissedPunch: false,
                exceptionIds: [],
                finalisedForPayroll: true,
            });
        }
        attendance.punches = punches.map((p) => ({
            type: p.type,
            time: p.timestamp instanceof Date ? p.timestamp : new Date(p.timestamp),
        }));
        attendance.totalWorkMinutes = this.calculateWorkedMinutes(attendance.punches);
        const hasInPunch = attendance.punches.some(p => p.type === 'IN');
        const hasOutPunch = attendance.punches.some(p => p.type === 'OUT');
        attendance.hasMissedPunch = !hasInPunch || !hasOutPunch;
        const saved = await attendance.save();
        return {
            message: 'Attendance corrected successfully',
            attendance: saved,
        };
    }
    async detectMissedPunches(employeeId, date) {
        const employeeObjectId = new mongoose_2.Types.ObjectId(employeeId);
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const attendance = await this.attendanceModel.findOne({
            employeeId: employeeObjectId,
            'punches.time': {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });
        const punchesCount = attendance?.punches.length || 0;
        if (punchesCount < 2) {
            const exception = new this.exceptionModel({
                employeeId: employeeObjectId,
                type: index_1.TimeExceptionType.MISSED_PUNCH,
                attendanceRecordId: attendance?._id,
                assignedTo: employeeObjectId,
                status: index_1.TimeExceptionStatus.OPEN,
                reason: `Missed punches on ${date.toDateString()}`,
            });
            await exception.save();
            return { message: 'Time exception created', exception };
        }
        return { message: 'No missed punches detected' };
    }
    async approveException(exceptionId, approvedBy, notes) {
        const exception = await this.exceptionModel.findById(exceptionId);
        if (!exception) {
            throw new common_1.NotFoundException('Exception not found');
        }
        if (exception.status === index_1.TimeExceptionStatus.APPROVED) {
            throw new common_1.BadRequestException('Exception is already approved');
        }
        if (exception.status === index_1.TimeExceptionStatus.REJECTED) {
            throw new common_1.BadRequestException('Cannot approve a rejected exception');
        }
        exception.status = index_1.TimeExceptionStatus.APPROVED;
        exception.assignedTo = new mongoose_2.Types.ObjectId(approvedBy);
        if (notes) {
            exception.reason = notes;
        }
        await exception.save();
        if (exception.attendanceRecordId) {
            try {
                const attendance = await this.attendanceModel.findById(exception.attendanceRecordId);
                if (attendance) {
                    const recordDate = attendance.recordDate ||
                        (attendance.punches && attendance.punches.length > 0 ? attendance.punches[0].time : new Date());
                    const attendanceRecordId = exception.attendanceRecordId instanceof mongoose_2.Types.ObjectId
                        ? exception.attendanceRecordId
                        : new mongoose_2.Types.ObjectId(exception.attendanceRecordId);
                    const result = await this.policyEngineService.recalculatePolicyResults(attendanceRecordId, recordDate instanceof Date ? recordDate : new Date(recordDate), undefined, undefined, undefined);
                    await this.policyEngineService.saveComputedResults(result);
                }
            }
            catch (error) {
                console.error('Error recalculating policy results after exception approval:', error);
            }
        }
        try {
            const employeeIdStr = exception.employeeId instanceof mongoose_2.Types.ObjectId
                ? exception.employeeId.toString()
                : String(exception.employeeId);
            await this.sendNotification(employeeIdStr, 'EXCEPTION_APPROVED', `Your time exception has been approved`);
        }
        catch (error) {
            console.error('Error sending notification:', error);
        }
        return {
            message: 'Exception approved successfully',
            exception,
        };
    }
    async rejectException(exceptionId, rejectedBy, reason) {
        const exception = await this.exceptionModel.findById(exceptionId);
        if (!exception) {
            throw new common_1.NotFoundException('Exception not found');
        }
        if (exception.status === index_1.TimeExceptionStatus.REJECTED) {
            throw new common_1.BadRequestException('Exception is already rejected');
        }
        if (exception.status === index_1.TimeExceptionStatus.APPROVED) {
            throw new common_1.BadRequestException('Cannot reject an approved exception');
        }
        exception.status = index_1.TimeExceptionStatus.REJECTED;
        exception.assignedTo = new mongoose_2.Types.ObjectId(rejectedBy);
        if (reason) {
            exception.reason = reason;
        }
        await exception.save();
        try {
            const employeeIdStr = exception.employeeId instanceof mongoose_2.Types.ObjectId
                ? exception.employeeId.toString()
                : String(exception.employeeId);
            await this.sendNotification(employeeIdStr, 'EXCEPTION_REJECTED', `Your time exception has been rejected${reason ? ': ' + reason : ''}`);
        }
        catch (error) {
            console.error('Error sending notification:', error);
        }
        return {
            message: 'Exception rejected successfully',
            exception,
        };
    }
    async getAllExceptions(status, assignedTo, employeeId) {
        const query = {};
        if (status) {
            query.status = status;
        }
        if (assignedTo) {
            query.assignedTo = new mongoose_2.Types.ObjectId(assignedTo);
        }
        if (employeeId) {
            query.employeeId = new mongoose_2.Types.ObjectId(employeeId);
        }
        return this.exceptionModel.find(query).sort({ createdAt: -1 }).exec();
    }
    async escalateException(exceptionId, escalatedTo, reason) {
        const exception = await this.exceptionModel.findById(exceptionId);
        if (!exception) {
            throw new common_1.NotFoundException('Exception not found');
        }
        if (exception.status === index_1.TimeExceptionStatus.APPROVED || exception.status === index_1.TimeExceptionStatus.REJECTED) {
            throw new common_1.BadRequestException('Cannot escalate a resolved exception');
        }
        exception.status = index_1.TimeExceptionStatus.ESCALATED;
        exception.assignedTo = new mongoose_2.Types.ObjectId(escalatedTo);
        if (reason) {
            exception.reason = (exception.reason || '') + ` [Escalated: ${reason}]`;
        }
        await exception.save();
        try {
            const employeeIdStr = exception.employeeId instanceof mongoose_2.Types.ObjectId
                ? exception.employeeId.toString()
                : String(exception.employeeId);
            await this.sendNotification(employeeIdStr, 'EXCEPTION_ESCALATED', `Your time exception has been escalated for review`);
        }
        catch (error) {
            console.error('Error sending notification:', error);
        }
        return {
            message: 'Exception escalated successfully',
            exception,
        };
    }
    calculateWorkedMinutes(punches) {
        if (punches.length === 0)
            return 0;
        const sortedPunches = [...punches].sort((a, b) => a.time.getTime() - b.time.getTime());
        let totalMinutes = 0;
        let lastInTime = null;
        for (const punch of sortedPunches) {
            const punchType = punch.type.toString().toUpperCase();
            if (punchType === 'IN') {
                lastInTime = punch.time;
            }
            else if (punchType === 'OUT' && lastInTime) {
                const diffMs = punch.time.getTime() - lastInTime.getTime();
                const minutes = Math.floor(diffMs / (1000 * 60));
                if (minutes > 0) {
                    totalMinutes += minutes;
                }
                lastInTime = null;
            }
        }
        return totalMinutes;
    }
};
exports.TimeManagementService = TimeManagementService;
exports.TimeManagementService = TimeManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(1, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __param(2, (0, mongoose_1.InjectModel)(notification_log_schema_1.NotificationLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        policy_engine_service_1.PolicyEngineService])
], TimeManagementService);
//# sourceMappingURL=time-management.service.js.map