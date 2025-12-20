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
var VacationIntegrationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacationIntegrationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_record_schema_1 = require("../schemas/attendance-record.schema");
const leaves_service_1 = require("../../../leaves/leaves.service");
const leave_status_enum_1 = require("../../../leaves/enums/leave-status.enum");
let VacationIntegrationService = VacationIntegrationService_1 = class VacationIntegrationService {
    attendanceModel;
    leavesService;
    logger = new common_1.Logger(VacationIntegrationService_1.name);
    constructor(attendanceModel, leavesService) {
        this.attendanceModel = attendanceModel;
        this.leavesService = leavesService;
    }
    async isEmployeeOnLeave(employeeId, date) {
        try {
            const leaveRequests = await this.leavesService.leaveRequest.findByEmployee(employeeId.toString());
            const relevantLeave = leaveRequests.find((leave) => {
                if (leave.status !== leave_status_enum_1.LeaveStatus.APPROVED) {
                    return false;
                }
                const leaveStart = new Date(leave.dates.from);
                const leaveEnd = new Date(leave.dates.to);
                const checkDate = new Date(date);
                leaveStart.setHours(0, 0, 0, 0);
                leaveEnd.setHours(23, 59, 59, 999);
                checkDate.setHours(0, 0, 0, 0);
                return checkDate >= leaveStart && checkDate <= leaveEnd;
            });
            if (relevantLeave) {
                return {
                    onLeave: true,
                    leaveType: relevantLeave.leaveTypeId?.toString() || 'Unknown',
                    leaveRequestId: relevantLeave._id,
                    durationDays: relevantLeave.durationDays,
                };
            }
            return { onLeave: false };
        }
        catch (error) {
            this.logger.error(`Error checking leave status for employee ${employeeId} on ${date.toISOString()}: ${error.message}`);
            return { onLeave: false };
        }
    }
    async markAttendanceForLeave(employeeId, recordDate, attendanceRecordId) {
        try {
            const leaveInfo = await this.isEmployeeOnLeave(employeeId, recordDate);
            if (!leaveInfo.onLeave) {
                return false;
            }
            this.logger.log(`Employee ${employeeId} is on approved leave on ${recordDate.toISOString()}. Leave type: ${leaveInfo.leaveType}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Error marking attendance for leave: ${error.message}`);
            return false;
        }
    }
    async getLeaveDaysInRange(employeeId, startDate, endDate) {
        try {
            const employeeLeaves = await this.leavesService.leaveRequest.findByEmployee(employeeId.toString());
            const approvedLeaves = employeeLeaves.filter((leave) => leave.status === leave_status_enum_1.LeaveStatus.APPROVED);
            const leaveDays = [];
            const start = new Date(startDate);
            const end = new Date(endDate);
            for (const leave of approvedLeaves) {
                const leaveStart = new Date(leave.dates.from);
                const leaveEnd = new Date(leave.dates.to);
                if (leaveEnd >= start && leaveStart <= end) {
                    const overlapStart = leaveStart > start ? leaveStart : start;
                    const overlapEnd = leaveEnd < end ? leaveEnd : end;
                    const currentDate = new Date(overlapStart);
                    while (currentDate <= overlapEnd) {
                        const dayOfWeek = currentDate.getDay();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            leaveDays.push({
                                date: new Date(currentDate),
                                leaveType: leave.leaveTypeId?.toString() || 'Unknown',
                                leaveRequestId: leave._id,
                            });
                        }
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                }
            }
            return {
                totalLeaveDays: leaveDays.length,
                leaveDays,
            };
        }
        catch (error) {
            this.logger.error(`Error getting leave days in range: ${error.message}`);
            return { totalLeaveDays: 0, leaveDays: [] };
        }
    }
    shouldExcludeFromWorkedMinutes(employeeId, date) {
        return this.isEmployeeOnLeave(employeeId, date).then((info) => info.onLeave);
    }
};
exports.VacationIntegrationService = VacationIntegrationService;
exports.VacationIntegrationService = VacationIntegrationService = VacationIntegrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_record_schema_1.AttendanceRecord.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => leaves_service_1.LeavesService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        leaves_service_1.LeavesService])
], VacationIntegrationService);
//# sourceMappingURL=vacation-integration.service.js.map