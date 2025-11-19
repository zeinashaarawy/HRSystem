import { PerformanceService } from './performance.service';
export declare class PerformanceController {
    private readonly performanceService;
    constructor(performanceService: PerformanceService);
    getDummyPerformance(): {
        id: string;
        cycleName: string;
        employee: {
            id: string;
            employeeCode: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            hireDate: string;
            department: {
                id: string;
                code: string;
                name: string;
                costCenter: string;
                isActive: boolean;
            };
        };
        overallRating: number;
        managerComment: string;
        status: string;
    };
}
