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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const holiday_schema_1 = require("../holiday/schemas/holiday.schema");
const index_1 = require("../enums/index");
const schedule_helper_service_1 = require("../attendance/services/schedule-helper.service");
const vacation_integration_service_1 = require("../attendance/services/vacation-integration.service");
const availability_response_dto_1 = require("./dto/availability-response.dto");
let AvailabilityService = class AvailabilityService {
    holidayModel;
    scheduleHelperService;
    vacationIntegrationService;
    constructor(holidayModel, scheduleHelperService, vacationIntegrationService) {
        this.holidayModel = holidayModel;
        this.scheduleHelperService = scheduleHelperService;
        this.vacationIntegrationService = vacationIntegrationService;
    }
    async checkAvailability(employeeId, date) {
        if (!mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('Invalid employee ID format');
        }
        const checkDate = new Date(date);
        if (isNaN(checkDate.getTime())) {
            throw new common_1.BadRequestException('Invalid date format. Use YYYY-MM-DD');
        }
        const dateOnly = new Date(checkDate);
        dateOnly.setHours(0, 0, 0, 0);
        const dateEnd = new Date(checkDate);
        dateEnd.setHours(23, 59, 59, 999);
        const employeeObjectId = new mongoose_2.Types.ObjectId(employeeId);
        const isHoliday = await this.checkHoliday(dateOnly);
        if (isHoliday) {
            return {
                employeeId,
                date,
                available: false,
                reason: availability_response_dto_1.UnavailabilityReason.HOLIDAY,
            };
        }
        const isRestDay = await this.checkRestDay(dateOnly);
        if (isRestDay) {
            return {
                employeeId,
                date,
                available: false,
                reason: availability_response_dto_1.UnavailabilityReason.REST_DAY,
            };
        }
        const leaveStatus = await this.vacationIntegrationService.isEmployeeOnLeave(employeeObjectId, dateOnly);
        if (leaveStatus.onLeave) {
            return {
                employeeId,
                date,
                available: false,
                reason: availability_response_dto_1.UnavailabilityReason.ON_LEAVE,
            };
        }
        const scheduledTimes = await this.scheduleHelperService.getScheduledTimes(employeeObjectId, dateOnly);
        if (!scheduledTimes.startTime || !scheduledTimes.endTime) {
            return {
                employeeId,
                date,
                available: false,
                reason: availability_response_dto_1.UnavailabilityReason.NO_SHIFT,
            };
        }
        const workingHours = {
            start: this.formatTime(scheduledTimes.startTime),
            end: this.formatTime(scheduledTimes.endTime),
        };
        return {
            employeeId,
            date,
            available: true,
            workingHours,
        };
    }
    async checkHoliday(date) {
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        const dateEnd = new Date(date);
        dateEnd.setHours(23, 59, 59, 999);
        const holiday = await this.holidayModel
            .findOne({
            active: true,
            type: { $in: [index_1.HolidayType.NATIONAL, index_1.HolidayType.ORGANIZATIONAL] },
            startDate: { $lte: dateEnd },
            $or: [
                { endDate: null, startDate: { $gte: dateOnly } },
                { endDate: { $gte: dateOnly } },
            ],
        })
            .exec();
        return !!holiday;
    }
    async checkRestDay(date) {
        const dayOfWeek = date.getDay();
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        const dateEnd = new Date(date);
        dateEnd.setHours(23, 59, 59, 999);
        const restDayHoliday = await this.holidayModel
            .findOne({
            active: true,
            type: index_1.HolidayType.WEEKLY_REST,
            startDate: { $lte: dateEnd },
            $or: [
                { endDate: null, startDate: { $gte: dateOnly } },
                { endDate: { $gte: dateOnly } },
            ],
        })
            .exec();
        if (restDayHoliday) {
            return true;
        }
        return dayOfWeek === 0 || dayOfWeek === 6;
    }
    formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(holiday_schema_1.Holiday.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        schedule_helper_service_1.ScheduleHelperService,
        vacation_integration_service_1.VacationIntegrationService])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map