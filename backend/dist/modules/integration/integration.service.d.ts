import { GetEmployeeProfileRequest, GetEmployeeProfileResponse } from './interfaces/employee-profile.interface';
import { GetReportingLineRequest, GetReportingLineResponse } from './interfaces/org-structure.interface';
import { LeaveBlockRequest, LeaveBlockResponse } from './interfaces/time-management.interface';
import { SyncLeaveToPayrollRequest, SyncLeaveToPayrollResponse } from './interfaces/payroll.interface';
export declare class IntegrationService {
    getEmployeeProfile(request: GetEmployeeProfileRequest): Promise<GetEmployeeProfileResponse>;
    getReportingLine(request: GetReportingLineRequest): Promise<GetReportingLineResponse>;
    blockAttendance(request: LeaveBlockRequest): Promise<LeaveBlockResponse>;
    unblockAttendance(leaveRequestId: string): Promise<any>;
    syncLeaveToPayroll(request: SyncLeaveToPayrollRequest): Promise<SyncLeaveToPayrollResponse>;
    submitLeaveSettlement(settlementData: any): Promise<any>;
    getIntegrationStatus(): Promise<any>;
}
