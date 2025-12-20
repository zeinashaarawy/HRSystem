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
var DeviceSyncService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSyncService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const punch_schema_1 = require("../../attendance/schemas/punch.schema");
const attendance_record_schema_1 = require("../../attendance/schemas/attendance-record.schema");
const index_1 = require("../../enums/index");
let DeviceSyncService = DeviceSyncService_1 = class DeviceSyncService {
    punchModel;
    attendanceModel;
    logger = new common_1.Logger(DeviceSyncService_1.name);
    offlinePunchQueue = new Map();
    constructor(punchModel, attendanceModel) {
        this.punchModel = punchModel;
        this.attendanceModel = attendanceModel;
    }
    async queueOfflinePunch(employeeId, timestamp, type, device, location, rawMetadata) {
        this.logger.log(`Queueing offline punch for employee ${employeeId} on device ${device}`);
        const deviceKey = device || 'unknown';
        if (!this.offlinePunchQueue.has(deviceKey)) {
            this.offlinePunchQueue.set(deviceKey, []);
        }
        const queue = this.offlinePunchQueue.get(deviceKey);
        queue.push({
            employeeId,
            timestamp,
            type,
            device,
            location,
            rawMetadata,
        });
        this.logger.log(`Queued punch. Queue size for device ${deviceKey}: ${queue.length}`);
    }
    async syncDevicePunches(device) {
        this.logger.log(`Syncing punches for device ${device}`);
        const deviceKey = device || 'unknown';
        const queue = this.offlinePunchQueue.get(deviceKey);
        if (!queue || queue.length === 0) {
            this.logger.log(`No queued punches for device ${deviceKey}`);
            return { synced: 0, failed: 0, errors: [] };
        }
        const errors = [];
        let synced = 0;
        let failed = 0;
        for (const punchData of queue) {
            try {
                await this.syncPunch(punchData);
                synced++;
            }
            catch (error) {
                failed++;
                errors.push(`Failed to sync punch for employee ${punchData.employeeId}: ${error.message}`);
                this.logger.error(`Failed to sync punch: ${error.message}`, error.stack);
            }
        }
        this.offlinePunchQueue.delete(deviceKey);
        this.logger.log(`Sync complete for device ${deviceKey}: ${synced} synced, ${failed} failed`);
        return { synced, failed, errors };
    }
    async syncPunch(punchData) {
        const employeeObjectId = new mongoose_2.Types.ObjectId(punchData.employeeId);
        const punchTime = new Date(punchData.timestamp);
        const startOfDay = new Date(punchTime);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(punchTime);
        endOfDay.setHours(23, 59, 59, 999);
        let attendance = await this.attendanceModel.findOne({
            employeeId: employeeObjectId,
            recordDate: {
                $gte: startOfDay,
                $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
            },
        });
        if (!attendance) {
            attendance = new this.attendanceModel({
                employeeId: employeeObjectId,
                recordDate: startOfDay,
                punches: [],
                totalWorkMinutes: 0,
                hasMissedPunch: false,
                exceptionIds: [],
                finalisedForPayroll: false,
            });
        }
        attendance.punches.push({
            type: punchData.type.toUpperCase() === 'IN' ? index_1.PunchType.IN : index_1.PunchType.OUT,
            time: punchTime,
        });
        attendance.totalWorkMinutes = this.calculateWorkedMinutes(attendance.punches);
        const hasInPunch = attendance.punches.some((p) => p.type === 'IN');
        const hasOutPunch = attendance.punches.some((p) => p.type === 'OUT');
        attendance.hasMissedPunch = !hasInPunch || !hasOutPunch;
        await attendance.save();
        const punch = new this.punchModel({
            employeeId: punchData.employeeId,
            timestamp: punchTime,
            type: punchData.type,
            device: punchData.device,
            location: punchData.location,
            rawMetadata: {
                ...punchData.rawMetadata,
                syncedAt: new Date(),
                syncedFromOffline: true,
            },
        });
        await punch.save();
        this.logger.log(`Synced punch for employee ${punchData.employeeId} at ${punchTime.toISOString()}`);
    }
    calculateWorkedMinutes(punches) {
        if (punches.length === 0)
            return 0;
        const sortedPunches = [...punches].sort((a, b) => a.time.getTime() - b.time.getTime());
        const firstIn = sortedPunches.find((p) => p.type === 'IN');
        const lastOut = [...sortedPunches]
            .reverse()
            .find((p) => p.type === 'OUT');
        if (firstIn && lastOut && lastOut.time > firstIn.time) {
            const diffMs = lastOut.time.getTime() - firstIn.time.getTime();
            return Math.floor(diffMs / (1000 * 60));
        }
        return 0;
    }
    getQueueStatus(device) {
        const deviceKey = device || 'unknown';
        const queue = this.offlinePunchQueue.get(deviceKey);
        return { queued: queue ? queue.length : 0 };
    }
    getDevicesWithQueuedPunches() {
        return Array.from(this.offlinePunchQueue.keys());
    }
};
exports.DeviceSyncService = DeviceSyncService;
exports.DeviceSyncService = DeviceSyncService = DeviceSyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(punch_schema_1.Punch.name)),
    __param(1, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DeviceSyncService);
//# sourceMappingURL=device-sync.service.js.map