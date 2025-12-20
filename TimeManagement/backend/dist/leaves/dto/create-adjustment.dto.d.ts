export declare enum AdjustmentType {
    ADD = "add",
    DEDUCT = "deduct"
}
export declare class CreateAdjustmentDto {
    employeeId: string;
    leaveTypeId: string;
    adjustmentType: AdjustmentType;
    amount: number;
    reason: string;
    hrUserId: string;
}
