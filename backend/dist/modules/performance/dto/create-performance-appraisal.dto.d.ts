export declare class CreatePerformanceAppraisalDto {
    employeeId: string;
    managerId: string;
    cycleId: string;
    ratings?: {
        criterion: string;
        score: number;
        comment?: string;
    }[];
    overallRating?: number;
    managerComment?: string;
    employeeComment?: string;
    status?: string;
}
