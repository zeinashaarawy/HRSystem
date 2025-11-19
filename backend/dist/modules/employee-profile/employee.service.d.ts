import { DepartmentService } from '../organization-structure/department.service';
export declare class EmployeeService {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
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
