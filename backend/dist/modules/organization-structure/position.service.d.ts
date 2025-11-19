import { DepartmentService } from './department.service';
export declare class PositionService {
    private departmentService;
    constructor(departmentService: DepartmentService);
    getDummyPosition(): {
        id: string;
        code: string;
        title: string;
        department: {
            id: string;
            code: string;
            name: string;
            costCenter: string;
            isActive: boolean;
        };
        reportsTo: null;
        payGrade: string;
        isActive: boolean;
    };
}
