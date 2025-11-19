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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationCalendarSchema = exports.OrganizationCalendar = exports.WeekDay = exports.HolidayType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var HolidayType;
(function (HolidayType) {
    HolidayType["NATIONAL"] = "NATIONAL";
    HolidayType["COMPANY"] = "COMPANY";
    HolidayType["RELIGIOUS"] = "RELIGIOUS";
})(HolidayType || (exports.HolidayType = HolidayType = {}));
var WeekDay;
(function (WeekDay) {
    WeekDay["MONDAY"] = "MONDAY";
    WeekDay["TUESDAY"] = "TUESDAY";
    WeekDay["WEDNESDAY"] = "WEDNESDAY";
    WeekDay["THURSDAY"] = "THURSDAY";
    WeekDay["FRIDAY"] = "FRIDAY";
    WeekDay["SATURDAY"] = "SATURDAY";
    WeekDay["SUNDAY"] = "SUNDAY";
})(WeekDay || (exports.WeekDay = WeekDay = {}));
let OrganizationCalendar = class OrganizationCalendar {
    year;
    holidays;
    blockedPeriods;
    workingDays;
    isActive;
};
exports.OrganizationCalendar = OrganizationCalendar;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], OrganizationCalendar.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                date: { type: Date, required: true },
                name: { type: String, required: true },
                type: { type: String, enum: HolidayType, required: true },
                isRecurring: { type: Boolean, default: false },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], OrganizationCalendar.prototype, "holidays", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                startDate: { type: Date, required: true },
                endDate: { type: Date, required: true },
                reason: { type: String, required: true },
                affectedDepartments: [{ type: mongoose_2.Types.ObjectId, ref: 'Department' }],
                exceptions: [{ type: mongoose_2.Types.ObjectId, ref: 'Employee' }],
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], OrganizationCalendar.prototype, "blockedPeriods", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: WeekDay,
        default: [
            WeekDay.MONDAY,
            WeekDay.TUESDAY,
            WeekDay.WEDNESDAY,
            WeekDay.THURSDAY,
            WeekDay.FRIDAY,
        ],
    }),
    __metadata("design:type", Array)
], OrganizationCalendar.prototype, "workingDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationCalendar.prototype, "isActive", void 0);
exports.OrganizationCalendar = OrganizationCalendar = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OrganizationCalendar);
exports.OrganizationCalendarSchema = mongoose_1.SchemaFactory.createForClass(OrganizationCalendar);
//# sourceMappingURL=organization-calendar.schema.js.map