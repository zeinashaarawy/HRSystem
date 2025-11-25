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
exports.OrganizationCalendarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const organization_calendar_schema_1 = require("./schemas/organization-calendar.schema");
let OrganizationCalendarService = class OrganizationCalendarService {
    calendarModel;
    constructor(calendarModel) {
        this.calendarModel = calendarModel;
    }
    async create(createCalendarDto) {
        const existingCalendar = await this.calendarModel.findOne({
            year: createCalendarDto.year,
        });
        if (existingCalendar) {
            throw new common_1.ConflictException(`Calendar for year ${createCalendarDto.year} already exists`);
        }
        const createdCalendar = new this.calendarModel(createCalendarDto);
        return createdCalendar.save();
    }
    async findAll() {
        return this.calendarModel.find().exec();
    }
    async findByYear(year) {
        const calendar = await this.calendarModel.findOne({ year }).exec();
        if (!calendar) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
        return calendar;
    }
    async findActive() {
        return this.calendarModel.find({ isActive: true }).exec();
    }
    async update(year, updateCalendarDto) {
        const updatedCalendar = await this.calendarModel
            .findOneAndUpdate({ year }, updateCalendarDto, { new: true })
            .exec();
        if (!updatedCalendar) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
        return updatedCalendar;
    }
    async addHoliday(year, createHolidayDto) {
        const calendar = await this.calendarModel.findOne({ year }).exec();
        if (!calendar) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
        calendar.holidays.push(createHolidayDto);
        return calendar.save();
    }
    async removeHoliday(year, holidayDate) {
        const calendar = await this.calendarModel.findOne({ year }).exec();
        if (!calendar) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
        calendar.holidays = calendar.holidays.filter((holiday) => holiday.date.toISOString() !== new Date(holidayDate).toISOString());
        return calendar.save();
    }
    async addBlockedPeriod(year, createBlockedPeriodDto) {
        const calendar = await this.calendarModel.findOne({ year }).exec();
        if (!calendar) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
        if (new Date(createBlockedPeriodDto.startDate) >
            new Date(createBlockedPeriodDto.endDate)) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        calendar.blockedPeriods.push(createBlockedPeriodDto);
        return calendar.save();
    }
    async removeBlockedPeriod(year, index) {
        const calendar = await this.calendarModel.findOne({ year }).exec();
        if (!calendar) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
        if (index < 0 || index >= calendar.blockedPeriods.length) {
            throw new common_1.BadRequestException('Invalid blocked period index');
        }
        calendar.blockedPeriods.splice(index, 1);
        return calendar.save();
    }
    async calculateWorkingDays(year, startDate, endDate) {
        const calendar = await this.findByYear(year);
        let workingDaysCount = 0;
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayName = this.getDayName(currentDate);
            const isWorkingDay = calendar.workingDays.includes(dayName);
            const isHoliday = calendar.holidays.some((holiday) => holiday.date.toDateString() === currentDate.toDateString());
            if (isWorkingDay && !isHoliday) {
                workingDaysCount++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return workingDaysCount;
    }
    async isBlockedPeriod(year, date) {
        const calendar = await this.findByYear(year);
        const checkDate = new Date(date);
        return calendar.blockedPeriods.some((period) => checkDate >= new Date(period.startDate) &&
            checkDate <= new Date(period.endDate));
    }
    async remove(year) {
        const result = await this.calendarModel.findOneAndDelete({ year }).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Calendar for year ${year} not found`);
        }
    }
    getDayName(date) {
        const days = [
            'SUNDAY',
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
        ];
        return days[date.getDay()];
    }
};
exports.OrganizationCalendarService = OrganizationCalendarService;
exports.OrganizationCalendarService = OrganizationCalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(organization_calendar_schema_1.OrganizationCalendar.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrganizationCalendarService);
//# sourceMappingURL=organization-calendar.service.js.map