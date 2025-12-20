export interface IOrganizationStructureService {
    validateDepartment(departmentId: string): Promise<boolean>;
    getDepartment(departmentId: string): Promise<{
        id: string;
        name: string;
        managerId?: string;
    } | null>;
}
