import { DepartmentService } from './department.service';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    getDummy(): {
        id: string;
        code: string;
        name: string;
        costCenter: string;
        isActive: boolean;
    };
}
