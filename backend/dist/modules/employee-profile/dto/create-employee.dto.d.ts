export declare class CreateEmployeeDto {
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    nationalId?: string;
    dateOfBirth?: Date;
    hireDate?: Date;
    status?: 'ACTIVE' | 'INACTIVE' | 'TERMINATED';
    departmentId?: string;
    positionId?: string;
    managerId?: string;
}
