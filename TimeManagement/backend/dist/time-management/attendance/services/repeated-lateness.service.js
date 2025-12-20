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
var RepeatedLatenessService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatedLatenessService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const repeated_lateness_tracking_schema_1 = require("../schemas/repeated-lateness-tracking.schema");
const time_exception_schema_1 = require("../schemas/time-exception.schema");
const time_management_service_1 = require("../../time-management.service");
const employee_system_role_schema_1 = require("../../../employee-profile/models/employee-system-role.schema");
const employee_profile_enums_1 = require("../../../employee-profile/enums/employee-profile.enums");
let RepeatedLatenessService = RepeatedLatenessService_1 = class RepeatedLatenessService {
    repeatedLatenessModel;
    exceptionModel;
    employeeSystemRoleModel;
    timeManagementService;
    logger = new common_1.Logger(RepeatedLatenessService_1.name);
    constructor(repeatedLatenessModel, exceptionModel, employeeSystemRoleModel, timeManagementService) {
        this.repeatedLatenessModel = repeatedLatenessModel;
        this.exceptionModel = exceptionModel;
        this.employeeSystemRoleModel = employeeSystemRoleModel;
        this.timeManagementService = timeManagementService;
    }
    async trackLatenessIncident(employeeId, exceptionId, latenessMinutes, incidentDate) {
        this.logger.log(`Tracking lateness incident for employee ${employeeId}: ${latenessMinutes} minutes late on ${incidentDate.toISOString()}`);
        const weekStart = this.getWeekStart(incidentDate);
        const weekEnd = this.getWeekEnd(incidentDate);
        const monthStart = this.getMonthStart(incidentDate);
        const monthEnd = this.getMonthEnd(incidentDate);
        await this.updatePeriodTracking(employeeId, exceptionId, latenessMinutes, weekStart, weekEnd, 'WEEK');
        await this.updatePeriodTracking(employeeId, exceptionId, latenessMinutes, monthStart, monthEnd, 'MONTH');
    }
    async updatePeriodTracking(employeeId, exceptionId, latenessMinutes, periodStart, periodEnd, periodType) {
        let tracking = await this.repeatedLatenessModel.findOne({
            employeeId,
            periodStart,
            periodEnd,
            periodType,
        });
        if (!tracking) {
            tracking = new this.repeatedLatenessModel({
                employeeId,
                periodStart,
                periodEnd,
                periodType,
                totalLatenessIncidents: 0,
                totalLatenessMinutes: 0,
                lateExceptionIds: [],
            });
        }
        tracking.totalLatenessIncidents += 1;
        tracking.totalLatenessMinutes += latenessMinutes;
        if (!tracking.lateExceptionIds.includes(exceptionId)) {
            tracking.lateExceptionIds.push(exceptionId);
        }
        await tracking.save();
        this.logger.log(`Updated ${periodType} tracking for employee ${employeeId}: ${tracking.totalLatenessIncidents} incidents, ${tracking.totalLatenessMinutes} total minutes`);
    }
    async checkAndEscalateThresholds(employeeId, policy) {
        if (!policy?.latenessRule?.repeatedLatenessThreshold) {
            return { thresholdExceeded: false, escalated: false };
        }
        const threshold = policy.latenessRule.repeatedLatenessThreshold;
        const now = new Date();
        const weekStart = this.getWeekStart(now);
        const weekEnd = this.getWeekEnd(now);
        const weekTracking = await this.repeatedLatenessModel.findOne({
            employeeId,
            periodStart: weekStart,
            periodEnd: weekEnd,
            periodType: 'WEEK',
        });
        if (weekTracking) {
            const weekExceeded = (threshold.incidentsPerWeek &&
                weekTracking.totalLatenessIncidents >= threshold.incidentsPerWeek) ||
                (threshold.totalMinutesPerWeek &&
                    weekTracking.totalLatenessMinutes >= threshold.totalMinutesPerWeek);
            if (weekExceeded && !weekTracking.thresholdExceeded) {
                weekTracking.thresholdExceeded = true;
                weekTracking.thresholdExceededAt = new Date();
                await weekTracking.save();
                if (threshold.autoEscalate) {
                    await this.escalateRepeatedLateness(employeeId, weekTracking, 'WEEK', threshold);
                    return { thresholdExceeded: true, escalated: true, periodType: 'WEEK' };
                }
                return { thresholdExceeded: true, escalated: false, periodType: 'WEEK' };
            }
        }
        const monthStart = this.getMonthStart(now);
        const monthEnd = this.getMonthEnd(now);
        const monthTracking = await this.repeatedLatenessModel.findOne({
            employeeId,
            periodStart: monthStart,
            periodEnd: monthEnd,
            periodType: 'MONTH',
        });
        if (monthTracking) {
            const monthExceeded = (threshold.incidentsPerMonth &&
                monthTracking.totalLatenessIncidents >= threshold.incidentsPerMonth) ||
                (threshold.totalMinutesPerMonth &&
                    monthTracking.totalLatenessMinutes >= threshold.totalMinutesPerMonth);
            if (monthExceeded && !monthTracking.thresholdExceeded) {
                monthTracking.thresholdExceeded = true;
                monthTracking.thresholdExceededAt = new Date();
                await monthTracking.save();
                if (threshold.autoEscalate) {
                    await this.escalateRepeatedLateness(employeeId, monthTracking, 'MONTH', threshold);
                    return {
                        thresholdExceeded: true,
                        escalated: true,
                        periodType: 'MONTH',
                    };
                }
                return {
                    thresholdExceeded: true,
                    escalated: false,
                    periodType: 'MONTH',
                };
            }
        }
        return { thresholdExceeded: false, escalated: false };
    }
    async escalateRepeatedLateness(employeeId, tracking, periodType, threshold) {
        if (tracking.escalated) {
            return;
        }
        const escalateToRole = threshold.escalateToRole || employee_profile_enums_1.SystemRole.HR_ADMIN;
        const hrRole = await this.employeeSystemRoleModel
            .findOne({
            roles: escalateToRole,
            isActive: true,
        })
            .exec();
        const escalateToId = hrRole?.employeeProfileId || employeeId;
        tracking.escalated = true;
        tracking.escalatedAt = new Date();
        tracking.escalatedTo = escalateToId instanceof mongoose_2.Types.ObjectId
            ? escalateToId
            : new mongoose_2.Types.ObjectId(escalateToId);
        tracking.disciplinaryFlag = true;
        tracking.disciplinaryFlaggedAt = new Date();
        await tracking.save();
        await this.timeManagementService.sendNotification(employeeId.toString(), 'REPEATED_LATENESS_ESCALATION', `Repeated lateness threshold exceeded: ${tracking.totalLatenessIncidents} incidents (${tracking.totalLatenessMinutes} total minutes) in ${periodType.toLowerCase()}. Disciplinary action may be required.`);
        const escalateToIdString = escalateToId instanceof mongoose_2.Types.ObjectId
            ? escalateToId.toString()
            : String(escalateToId);
        if (escalateToIdString !== employeeId.toString()) {
            await this.timeManagementService.sendNotification(escalateToIdString, 'REPEATED_LATENESS_ALERT', `Employee ${employeeId} has exceeded repeated lateness threshold: ${tracking.totalLatenessIncidents} incidents in ${periodType.toLowerCase()}. Review required.`);
        }
        this.logger.warn(`Escalated repeated lateness for employee ${employeeId}: ${tracking.totalLatenessIncidents} incidents in ${periodType}`);
    }
    async getEmployeeTracking(employeeId, periodType) {
        const query = { employeeId };
        if (periodType) {
            query.periodType = periodType;
        }
        return this.repeatedLatenessModel.find(query).sort({ periodStart: -1 }).exec();
    }
    async getThresholdExceededEmployees() {
        return this.repeatedLatenessModel
            .find({
            thresholdExceeded: true,
            escalated: false,
        })
            .populate('employeeId')
            .sort({ thresholdExceededAt: -1 })
            .exec();
    }
    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    getWeekEnd(date) {
        const start = this.getWeekStart(date);
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        return end;
    }
    getMonthStart(date) {
        const d = new Date(date);
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    getMonthEnd(date) {
        const d = new Date(date);
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);
        d.setHours(23, 59, 59, 999);
        return d;
    }
};
exports.RepeatedLatenessService = RepeatedLatenessService;
exports.RepeatedLatenessService = RepeatedLatenessService = RepeatedLatenessService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(repeated_lateness_tracking_schema_1.RepeatedLatenessTracking.name)),
    __param(1, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __param(2, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => time_management_service_1.TimeManagementService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        time_management_service_1.TimeManagementService])
], RepeatedLatenessService);
//# sourceMappingURL=repeated-lateness.service.js.map