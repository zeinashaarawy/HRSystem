import { CreateBlockedPeriodDto } from './create-blocked-period.dto';
import { CreateHolidayDto } from './create-holiday.dto';
export declare class CreateCalendarDto {
    year: number;
    holidays?: CreateHolidayDto[];
    blockedPeriods?: CreateBlockedPeriodDto[];
    workingDays?: number[];
    isActive?: boolean;
}
