import type { IOnboardingService } from '../interfaces/onboarding.interface';
import type { IEmployeeProfileService } from '../interfaces/employee-profile.interface';
import type { IOrganizationStructureService } from '../interfaces/organization-structure.interface';
export declare class StubOnboardingService implements IOnboardingService {
    triggerOnboarding(candidateId: string, offerId: string, offerDetails: {
        role: string;
        department: string;
        grossSalary: number;
        startDate?: Date;
    }): Promise<{
        onboardingId: string;
        tasks: any[];
    }>;
}
export declare class StubEmployeeProfileService implements IEmployeeProfileService {
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
export declare class StubOrganizationStructureService implements IOrganizationStructureService {
    validateDepartment(departmentId: string): Promise<boolean>;
    getDepartment(departmentId: string): Promise<{
        id: string;
        name: string;
        managerId?: string;
    } | null>;
}
