import { Model, Types } from 'mongoose';
import { AttendanceRecord, AttendanceRecordDocument, Punch } from './attendance/schemas/attendance-record.schema';
import { CreatePunchDto } from './attendance/dto/create-punch.dto';
import { UpdatePunchDto } from './attendance/dto/update-punch.dto';
import { TimeException, TimeExceptionDocument } from './attendance/schemas/time-exception.schema';
import { NotificationLog, NotificationLogDocument } from './notifications/schemas/notification-log.schema';
import { PolicyEngineService } from './policy/services/policy-engine.service';
export declare class TimeManagementService {
    private readonly attendanceModel;
    private readonly exceptionModel;
    private readonly notificationModel;
    private readonly policyEngineService;
    constructor(attendanceModel: Model<AttendanceRecordDocument>, exceptionModel: Model<TimeExceptionDocument>, notificationModel: Model<NotificationLogDocument>, policyEngineService: PolicyEngineService);
    recordPunch(dto: CreatePunchDto): Promise<{
        message: string;
        attendance: import("mongoose").Document<unknown, {}, AttendanceRecordDocument, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getNotifications(employeeId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, NotificationLog, {}, {}> & NotificationLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    sendNotification(to: string, type: string, message?: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, NotificationLog, {}, {}> & NotificationLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, NotificationLog, {}, {}> & NotificationLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getAttendance(employeeId: string, date?: string): Promise<{
        message: string;
        punches: never[];
        _id?: undefined;
        employeeId?: undefined;
        recordDate?: undefined;
        totalWorkMinutes?: undefined;
        hasMissedPunch?: undefined;
        exceptionIds?: undefined;
        finalisedForPayroll?: undefined;
    } | {
        _id: Types.ObjectId;
        employeeId: Types.ObjectId;
        recordDate: Date;
        punches: Punch[];
        totalWorkMinutes: number;
        hasMissedPunch: boolean;
        exceptionIds: Types.ObjectId[];
        finalisedForPayroll: boolean;
        message?: undefined;
    }>;
    createTimeException(employeeId: string, recordId: string, reason: string, assignedToId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getExceptions(employeeId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    correctAttendance(employeeId: string, date: Date, punches: UpdatePunchDto[]): Promise<{
        message: string;
        attendance: import("mongoose").Document<unknown, {}, AttendanceRecordDocument, {}, {}> & import("mongoose").Document<unknown, {}, AttendanceRecord, {}, {}> & AttendanceRecord & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    detectMissedPunches(employeeId: string, date: Date): Promise<{
        message: string;
        exception: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    } | {
        message: string;
        exception?: undefined;
    }>;
    approveException(exceptionId: string, approvedBy: string, notes?: string): Promise<{
        message: string;
        exception: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    rejectException(exceptionId: string, rejectedBy: string, reason?: string): Promise<{
        message: string;
        exception: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    getAllExceptions(status?: string, assignedTo?: string, employeeId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    escalateException(exceptionId: string, escalatedTo: string, reason?: string): Promise<{
        message: string;
        exception: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, TimeException, {}, {}> & TimeException & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    private calculateWorkedMinutes;
}
