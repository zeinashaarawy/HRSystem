import { ApprovalStatus } from '../enums/approval-status.enum';
export declare class ApproveOfferDto {
    employeeId: string;
    role: string;
    status: ApprovalStatus;
    comment?: string;
}
