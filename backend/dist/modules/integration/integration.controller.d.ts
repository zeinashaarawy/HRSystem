import { IntegrationService } from './integration.service';
import type { GetEmployeeProfileResponse } from './interfaces/employee-profile.interface';
import type { GetReportingLineResponse } from './interfaces/org-structure.interface';
import type { LeaveBlockRequest, LeaveBlockResponse } from './interfaces/time-management.interface';
import type { SyncLeaveToPayrollRequest, SyncLeaveToPayrollResponse } from './interfaces/payroll.interface';
export declare class IntegrationController {
    private readonly integrationService;
    constructor(integrationService: IntegrationService);
    getStatus(): Promise<any>;
    getEmployeeProfile(employeeId: string): Promise<GetEmployeeProfileResponse>;
    getReportingLine(employeeId: string): Promise<GetReportingLineResponse>;
    blockAttendance(request: LeaveBlockRequest): Promise<LeaveBlockResponse>;
    unblockAttendance(body: {
        leaveRequestId: string;
    }): Promise<any>;
    syncLeaveToPayroll(request: SyncLeaveToPayrollRequest): Promise<SyncLeaveToPayrollResponse>;
    submitLeaveSettlement(settlementData: any): Promise<any>;
}
