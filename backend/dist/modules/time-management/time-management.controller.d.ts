import { TimeManagementService } from './time-management.service';
export declare class TimeManagementController {
    private readonly tmService;
    constructor(tmService: TimeManagementService);
    getAttendanceSummary(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../attendance/attendance.schema").Attendance, {}, {}> & import("../attendance/attendance.schema").Attendance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../attendance/attendance.schema").Attendance, {}, {}> & import("../attendance/attendance.schema").Attendance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getAllEmployees(): Promise<(import("mongoose").Document<unknown, {}, import("../employee-profile/schemas/employee.schema").Employee & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}>, {}, {}> & import("../employee-profile/schemas/employee.schema").Employee & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllDepartments(): Promise<(import("mongoose").Document<unknown, {}, import("../organization-structure/schemas/department.schema").Department & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}>, {}, {}> & import("../organization-structure/schemas/department.schema").Department & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllShifts(): Promise<(import("mongoose").Document<unknown, {}, import("../shift/shift.schema").ShiftDocument, {}, {}> & import("../shift/shift.schema").Shift & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllHolidays(): Promise<(import("mongoose").Document<unknown, {}, import("../holiday/holiday.schema").HolidayDocument, {}, {}> & import("../holiday/holiday.schema").Holiday & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllPositions(): Promise<(import("mongoose").Document<unknown, {}, import("../organization-structure/schemas/position.schema").Position & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}>, {}, {}> & import("../organization-structure/schemas/position.schema").Position & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllTimeExceptions(): Promise<(import("mongoose").Document<unknown, {}, import("../time-exception/time-exception.schema").TimeExceptionDocument, {}, {}> & import("../time-exception/time-exception.schema").TimeException & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
