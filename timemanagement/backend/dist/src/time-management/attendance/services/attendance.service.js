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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_record_schema_1 = require("../schemas/attendance-record.schema");
const time_exception_schema_1 = require("../schemas/time-exception.schema");
const index_1 = require("../../enums/index");
let AttendanceService = class AttendanceService {
    recordModel;
    exceptionModel;
    constructor(recordModel, exceptionModel) {
        this.recordModel = recordModel;
        this.exceptionModel = exceptionModel;
    }
    async createPunch(dto) {
        const punchTime = dto.timestamp instanceof Date ? dto.timestamp : new Date(dto.timestamp);
        const dateOnly = new Date(punchTime);
        dateOnly.setHours(0, 0, 0, 0);
        let record = await this.recordModel.findOne({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            recordDate: dateOnly,
            finalisedForPayroll: true,
        });
        if (!record) {
            record = new this.recordModel({
                employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                recordDate: dateOnly,
                punches: [],
                totalWorkMinutes: 0,
                hasMissedPunch: false,
                exceptionIds: [],
                finalisedForPayroll: true,
            });
        }
        if (dto.type === index_1.PunchType.IN) {
            record.punches.push({ type: index_1.PunchType.IN, time: punchTime });
        }
        else if (dto.type === index_1.PunchType.OUT) {
            const lastInPunch = record.punches
                .filter(p => p.type === index_1.PunchType.IN)
                .slice(-1)[0];
            const lastOutPunch = record.punches
                .filter(p => p.type === index_1.PunchType.OUT)
                .slice(-1)[0];
            if (lastInPunch && (!lastOutPunch || lastOutPunch.time < lastInPunch.time)) {
                record.punches.push({ type: index_1.PunchType.OUT, time: punchTime });
            }
            else {
                const exception = await this.exceptionModel.create({
                    employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
                    type: index_1.TimeExceptionType.MISSED_PUNCH,
                    attendanceRecordId: record._id,
                    assignedTo: new mongoose_2.Types.ObjectId(dto.employeeId),
                    status: index_1.TimeExceptionStatus.OPEN,
                    reason: 'Out punch without corresponding IN punch',
                });
                record.exceptionIds.push(exception._id);
                record.punches.push({ type: index_1.PunchType.OUT, time: punchTime });
            }
        }
        record.totalWorkMinutes = this.calculateWorkedMinutes(record.punches);
        const hasInPunch = record.punches.some(p => p.type === index_1.PunchType.IN);
        const hasOutPunch = record.punches.some(p => p.type === index_1.PunchType.OUT);
        record.hasMissedPunch = !hasInPunch || !hasOutPunch;
        await record.save();
        return record;
    }
    async getAttendance(employeeId, date) {
        const query = {
            employeeId: new mongoose_2.Types.ObjectId(employeeId)
        };
        if (date) {
            const dateOnly = new Date(date);
            dateOnly.setHours(0, 0, 0, 0);
            query.recordDate = dateOnly;
        }
        const record = await this.recordModel.findOne(query).exec();
        if (record && record.totalWorkMinutes === 0 && record.punches.length >= 2) {
            const punchesWithDates = record.punches.map(p => ({
                type: p.type,
                time: p.time instanceof Date ? p.time : new Date(p.time),
            }));
            record.totalWorkMinutes = this.calculateWorkedMinutes(punchesWithDates);
            const hasInPunch = punchesWithDates.some(p => p.type === index_1.PunchType.IN);
            const hasOutPunch = punchesWithDates.some(p => p.type === index_1.PunchType.OUT);
            record.hasMissedPunch = !hasInPunch || !hasOutPunch;
            await record.save();
        }
        return record;
    }
    calculateWorkedMinutes(punches) {
        if (punches.length === 0)
            return 0;
        const sortedPunches = [...punches].sort((a, b) => a.time.getTime() - b.time.getTime());
        let totalMinutes = 0;
        let lastInTime = null;
        for (const punch of sortedPunches) {
            const punchType = punch.type.toString().toUpperCase();
            if (punchType === 'IN' || punchType === index_1.PunchType.IN) {
                lastInTime = punch.time;
            }
            else if ((punchType === 'OUT' || punchType === index_1.PunchType.OUT) && lastInTime) {
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
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(1, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map