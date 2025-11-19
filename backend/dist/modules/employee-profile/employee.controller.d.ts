import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getDummyEmployee(): {
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
}
