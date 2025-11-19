import { WeekDay } from '../schemas/organization-calendar.schema';
import { CreateHolidayDto } from './create-holiday.dto';
import { CreateBlockedPeriodDto } from './create-blocked-period.dto';
export declare class CreateCalendarDto {
    year: number;
    holidays?: CreateHolidayDto[];
    blockedPeriods?: CreateBlockedPeriodDto[];
    workingDays?: WeekDay[];
    isActive?: boolean;
}
