import { Model } from 'mongoose';
import { OrganizationCalendar, OrganizationCalendarDocument } from './schemas/organization-calendar.schema';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { CreateBlockedPeriodDto } from './dto/create-blocked-period.dto';
export declare class OrganizationCalendarService {
    private calendarModel;
    constructor(calendarModel: Model<OrganizationCalendarDocument>);
    create(createCalendarDto: CreateCalendarDto): Promise<OrganizationCalendar>;
    findAll(): Promise<OrganizationCalendar[]>;
    findByYear(year: number): Promise<OrganizationCalendar>;
    findActive(): Promise<OrganizationCalendar[]>;
    update(year: number, updateCalendarDto: UpdateCalendarDto): Promise<OrganizationCalendar>;
    addHoliday(year: number, createHolidayDto: CreateHolidayDto): Promise<OrganizationCalendar>;
    removeHoliday(year: number, holidayDate: Date): Promise<OrganizationCalendar>;
    addBlockedPeriod(year: number, createBlockedPeriodDto: CreateBlockedPeriodDto): Promise<OrganizationCalendar>;
    removeBlockedPeriod(year: number, index: number): Promise<OrganizationCalendar>;
    calculateWorkingDays(year: number, startDate: Date, endDate: Date): Promise<number>;
    isBlockedPeriod(year: number, date: Date): Promise<boolean>;
    remove(year: number): Promise<void>;
    private getDayName;
}
