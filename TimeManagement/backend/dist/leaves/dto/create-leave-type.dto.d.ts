export declare class CreateLeaveTypeDto {
    code: string;
    name: string;
    categoryId: string;
    paid?: boolean;
    deductible?: boolean;
    requiresAttachment?: boolean;
    attachmentType?: string;
    minTenureMonths?: number;
    maxDurationDays?: number;
    description?: string;
}
