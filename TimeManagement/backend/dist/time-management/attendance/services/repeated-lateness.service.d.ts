import { Model, Types } from 'mongoose';
import { RepeatedLatenessTrackingDocument } from '../schemas/repeated-lateness-tracking.schema';
import { TimeExceptionDocument } from '../schemas/time-exception.schema';
import { TimeManagementService } from '../../time-management.service';
import { EmployeeSystemRoleDocument } from '../../../employee-profile/models/employee-system-role.schema';
export declare class RepeatedLatenessService {
    private repeatedLatenessModel;
    private exceptionModel;
    private employeeSystemRoleModel;
    private timeManagementService;
    private readonly logger;
    constructor(repeatedLatenessModel: Model<RepeatedLatenessTrackingDocument>, exceptionModel: Model<TimeExceptionDocument>, employeeSystemRoleModel: Model<EmployeeSystemRoleDocument>, timeManagementService: TimeManagementService);
    trackLatenessIncident(employeeId: Types.ObjectId, exceptionId: Types.ObjectId, latenessMinutes: number, incidentDate: Date): Promise<void>;
    private updatePeriodTracking;
    checkAndEscalateThresholds(employeeId: Types.ObjectId, policy: any): Promise<{
        thresholdExceeded: boolean;
        escalated: boolean;
        periodType?: string;
    }>;
    private escalateRepeatedLateness;
    getEmployeeTracking(employeeId: Types.ObjectId, periodType?: 'WEEK' | 'MONTH'): Promise<RepeatedLatenessTrackingDocument[]>;
    getThresholdExceededEmployees(): Promise<RepeatedLatenessTrackingDocument[]>;
    private getWeekStart;
    private getWeekEnd;
    private getMonthStart;
    private getMonthEnd;
}
