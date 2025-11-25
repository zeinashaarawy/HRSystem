import { OrganizationCalendarService } from './organization-calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { CreateBlockedPeriodDto } from './dto/create-blocked-period.dto';
export declare class OrganizationCalendarController {
    private readonly calendarService;
    constructor(calendarService: OrganizationCalendarService);
    create(createCalendarDto: CreateCalendarDto): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    findAll(): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar[]>;
    findActive(): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar[]>;
    findByYear(year: number): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    update(year: number, updateCalendarDto: UpdateCalendarDto): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    addHoliday(year: number, createHolidayDto: CreateHolidayDto): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    removeHoliday(year: number, date: string): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    addBlockedPeriod(year: number, createBlockedPeriodDto: CreateBlockedPeriodDto): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    removeBlockedPeriod(year: number, index: number): Promise<import("./schemas/organization-calendar.schema").OrganizationCalendar>;
    calculateWorkingDays(year: number, startDate: string, endDate: string): Promise<number>;
    isBlockedPeriod(year: number, date: string): Promise<boolean>;
    remove(year: number): Promise<void>;
}
