import { Document, Types } from 'mongoose';
export type OrganizationCalendarDocument = OrganizationCalendar & Document;
export declare enum HolidayType {
    NATIONAL = "NATIONAL",
    COMPANY = "COMPANY",
    RELIGIOUS = "RELIGIOUS"
}
export declare enum WeekDay {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}
export declare class OrganizationCalendar {
    year: number;
    holidays: {
        date: Date;
        name: string;
        type: HolidayType;
        isRecurring: boolean;
    }[];
    blockedPeriods: {
        startDate: Date;
        endDate: Date;
        reason: string;
        affectedDepartments: Types.ObjectId[];
        exceptions: Types.ObjectId[];
    }[];
    workingDays: WeekDay[];
    isActive: boolean;
}
export declare const OrganizationCalendarSchema: import("mongoose").Schema<OrganizationCalendar, import("mongoose").Model<OrganizationCalendar, any, any, any, Document<unknown, any, OrganizationCalendar, any, {}> & OrganizationCalendar & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrganizationCalendar, Document<unknown, {}, import("mongoose").FlatRecord<OrganizationCalendar>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<OrganizationCalendar> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
