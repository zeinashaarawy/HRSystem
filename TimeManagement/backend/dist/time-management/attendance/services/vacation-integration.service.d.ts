import { Model, Types } from 'mongoose';
import { AttendanceRecordDocument } from '../schemas/attendance-record.schema';
import { LeavesService } from '../../../leaves/leaves.service';
export declare class VacationIntegrationService {
    private attendanceModel;
    private leavesService;
    private readonly logger;
    constructor(attendanceModel: Model<AttendanceRecordDocument>, leavesService: LeavesService);
    isEmployeeOnLeave(employeeId: Types.ObjectId, date: Date): Promise<{
        onLeave: boolean;
        leaveType?: string;
        leaveRequestId?: Types.ObjectId;
        durationDays?: number;
    }>;
    markAttendanceForLeave(employeeId: Types.ObjectId, recordDate: Date, attendanceRecordId?: Types.ObjectId): Promise<boolean>;
    getLeaveDaysInRange(employeeId: Types.ObjectId, startDate: Date, endDate: Date): Promise<{
        totalLeaveDays: number;
        leaveDays: Array<{
            date: Date;
            leaveType: string;
            leaveRequestId: Types.ObjectId;
        }>;
    }>;
    shouldExcludeFromWorkedMinutes(employeeId: Types.ObjectId, date: Date): Promise<boolean>;
}
