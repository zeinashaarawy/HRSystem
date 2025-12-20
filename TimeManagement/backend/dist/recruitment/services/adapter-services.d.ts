import type { IEmployeeProfileService } from '../interfaces/employee-profile.interface';
import type { IOrganizationStructureService } from '../interfaces/organization-structure.interface';
import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
import { OrganizationStructureService } from '../../organization-structure/organization-structure.service';
export declare class EmployeeProfileServiceAdapter implements IEmployeeProfileService {
    private readonly logger;
    private readonly realService;
    constructor(employeeProfileService: EmployeeProfileService);
    createEmployeeFromCandidate(candidateId: string, offerDetails: {
        fullName: string;
        email: string;
        role: string;
        department: string;
        startDate: Date;
    }): Promise<{
        employeeId: string;
    }>;
}
export declare class OrganizationStructureServiceAdapter implements IOrganizationStructureService {
    private readonly logger;
    private readonly realService;
    constructor(organizationStructureService: OrganizationStructureService);
    validateDepartment(departmentId: string): Promise<boolean>;
    getDepartment(departmentId: string): Promise<{
        id: string;
        name: string;
        managerId?: string;
    } | null>;
}
