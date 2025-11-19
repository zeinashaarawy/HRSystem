import { HolidayType } from '../schemas/organization-calendar.schema';
export declare class CreateHolidayDto {
    date: Date;
    name: string;
    type: HolidayType;
    isRecurring?: boolean;
}
