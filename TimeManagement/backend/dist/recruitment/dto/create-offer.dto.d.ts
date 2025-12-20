export declare class CreateOfferDto {
    applicationId: string;
    candidateId: string;
    hrEmployeeId?: string;
    grossSalary: number;
    signingBonus?: number;
    benefits?: string[];
    conditions?: string;
    insurances?: string;
    content: string;
    role: string;
    deadline: Date;
}
