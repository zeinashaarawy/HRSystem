import { ContractType, WorkType, EmployeeStatus, SystemRole } from '../enums/employee-profile.enums';
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    nationalId: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    phone: string;
    personalEmail: string;
    password: string;
    employeeNumber: string;
    role: SystemRole;
    dateOfHire: string;
    workEmail?: string;
    biography?: string;
    contractStartDate?: string;
    contractEndDate?: string;
    contractType?: ContractType;
    workType?: WorkType;
    status?: EmployeeStatus;
    primaryPositionId?: string;
    primaryDepartmentId?: string;
    supervisorPositionId?: string;
    payGradeId?: string;
}
