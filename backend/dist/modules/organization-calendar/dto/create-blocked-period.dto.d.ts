export declare class CreateBlockedPeriodDto {
    startDate: Date;
    endDate: Date;
    reason: string;
    affectedDepartments?: string[];
    exceptions?: string[];
}
