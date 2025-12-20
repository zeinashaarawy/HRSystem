export declare class CreateChangeRequestDto {
    employeeProfileId: string;
    field: 'firstName' | 'lastName' | 'nationalId' | 'primaryPositionId' | 'primaryDepartmentId' | 'contractType' | 'workType';
    newValue: string;
    reason?: string;
}
