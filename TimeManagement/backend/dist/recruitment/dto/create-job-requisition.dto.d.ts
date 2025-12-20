export declare class CreateJobRequisitionDto {
    requisitionId: string;
    templateId?: string;
    openings: number;
    location?: string;
    hiringManagerId: string;
    publishStatus?: 'draft' | 'published' | 'closed';
    postingDate?: Date;
    expiryDate?: Date;
}
