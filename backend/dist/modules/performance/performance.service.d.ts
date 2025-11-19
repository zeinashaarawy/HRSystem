import { EmployeeService } from '../employee-profile/employee.service';
export declare class PerformanceService {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
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
