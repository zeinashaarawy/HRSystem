import { RefundStatus } from '../enums/payroll-tracking-enum';
export declare class UpdateRefundStatusDto {
    status: RefundStatus;
    paidInPayrollRunId?: string;
}
