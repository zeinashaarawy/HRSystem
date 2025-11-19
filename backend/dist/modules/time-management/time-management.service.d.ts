import { Model, Document } from 'mongoose';
import { Attendance, AttendanceDocument } from '../attendance/attendance.schema';
import { Employee } from '../employee-profile/schemas/employee.schema';
import { Department } from '../organization-structure/schemas/department.schema';
import { Shift, ShiftDocument } from '../shift/shift.schema';
import { Holiday, HolidayDocument } from '../holiday/holiday.schema';
import { Position } from '../organization-structure/schemas/position.schema';
import { TimeException, TimeExceptionDocument } from '../time-exception/time-exception.schema';
export declare class TimeManagementService {
    private attendanceModel;
    private employeeModel;
    private departmentModel;
    private shiftModel;
    private holidayModel;
    private positionModel;
    private timeExceptionModel;
    constructor(attendanceModel: Model<AttendanceDocument>, employeeModel: Model<Employee & Document>, departmentModel: Model<Department & Document>, shiftModel: Model<ShiftDocument>, holidayModel: Model<HolidayDocument>, positionModel: Model<Position & Document>, timeExceptionModel: Model<TimeExceptionDocument>);
    getAttendanceSummary(): Promise<(Document<unknown, {}, Document<unknown, {}, Attendance, {}, {}> & Attendance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & Document<unknown, {}, Attendance, {}, {}> & Attendance & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getAllEmployees(): Promise<(Document<unknown, {}, Employee & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}>, {}, {}> & Employee & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllDepartments(): Promise<(Document<unknown, {}, Department & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}>, {}, {}> & Department & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllShifts(): Promise<(Document<unknown, {}, ShiftDocument, {}, {}> & Shift & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllHolidays(): Promise<(Document<unknown, {}, HolidayDocument, {}, {}> & Holiday & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllPositions(): Promise<(Document<unknown, {}, Position & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}>, {}, {}> & Position & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllTimeExceptions(): Promise<(Document<unknown, {}, TimeExceptionDocument, {}, {}> & TimeException & Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
