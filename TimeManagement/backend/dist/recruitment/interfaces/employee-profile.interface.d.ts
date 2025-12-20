export interface IEmployeeProfileService {
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
