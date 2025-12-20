declare class RefundDetailsDto {
    description: string;
    amount: number;
}
export declare class CreateRefundDto {
    claimId?: string;
    disputeId?: string;
    employeeId: string;
    financeStaffId?: string;
    refundDetails: RefundDetailsDto;
}
export {};
