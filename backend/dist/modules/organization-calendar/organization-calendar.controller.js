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
exports.OrganizationCalendarController = void 0;
const common_1 = require("@nestjs/common");
const organization_calendar_service_1 = require("./organization-calendar.service");
const create_calendar_dto_1 = require("./dto/create-calendar.dto");
const update_calendar_dto_1 = require("./dto/update-calendar.dto");
const create_holiday_dto_1 = require("./dto/create-holiday.dto");
const create_blocked_period_dto_1 = require("./dto/create-blocked-period.dto");
let OrganizationCalendarController = class OrganizationCalendarController {
    calendarService;
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    create(createCalendarDto) {
        return this.calendarService.create(createCalendarDto);
    }
    findAll() {
        return this.calendarService.findAll();
    }
    findActive() {
        return this.calendarService.findActive();
    }
    findByYear(year) {
        return this.calendarService.findByYear(year);
    }
    update(year, updateCalendarDto) {
        return this.calendarService.update(year, updateCalendarDto);
    }
    addHoliday(year, createHolidayDto) {
        return this.calendarService.addHoliday(year, createHolidayDto);
    }
    removeHoliday(year, date) {
        return this.calendarService.removeHoliday(year, new Date(date));
    }
    addBlockedPeriod(year, createBlockedPeriodDto) {
        return this.calendarService.addBlockedPeriod(year, createBlockedPeriodDto);
    }
    removeBlockedPeriod(year, index) {
        return this.calendarService.removeBlockedPeriod(year, index);
    }
    calculateWorkingDays(year, startDate, endDate) {
        return this.calendarService.calculateWorkingDays(year, new Date(startDate), new Date(endDate));
    }
    isBlockedPeriod(year, date) {
        return this.calendarService.isBlockedPeriod(year, new Date(date));
    }
    remove(year) {
        return this.calendarService.remove(year);
    }
};
exports.OrganizationCalendarController = OrganizationCalendarController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calendar_dto_1.CreateCalendarDto]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('year/:year'),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "findByYear", null);
__decorate([
    (0, common_1.Patch)('year/:year'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_calendar_dto_1.UpdateCalendarDto]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('year/:year/holidays'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_holiday_dto_1.CreateHolidayDto]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "addHoliday", null);
__decorate([
    (0, common_1.Delete)('year/:year/holidays'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "removeHoliday", null);
__decorate([
    (0, common_1.Post)('year/:year/blocked-periods'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_blocked_period_dto_1.CreateBlockedPeriodDto]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "addBlockedPeriod", null);
__decorate([
    (0, common_1.Delete)('year/:year/blocked-periods/:index'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "removeBlockedPeriod", null);
__decorate([
    (0, common_1.Get)('year/:year/working-days'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "calculateWorkingDays", null);
__decorate([
    (0, common_1.Get)('year/:year/is-blocked'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "isBlockedPeriod", null);
__decorate([
    (0, common_1.Delete)('year/:year'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrganizationCalendarController.prototype, "remove", null);
exports.OrganizationCalendarController = OrganizationCalendarController = __decorate([
    (0, common_1.Controller)('organization-calendar'),
    __metadata("design:paramtypes", [organization_calendar_service_1.OrganizationCalendarService])
], OrganizationCalendarController);
//# sourceMappingURL=organization-calendar.controller.js.map