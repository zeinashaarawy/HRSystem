import { AppraisalDisputeStatus } from '../enums/performance.enums';
export declare class ResolveDisputeDto {
    newStatus: AppraisalDisputeStatus;
    resolutionSummary?: string;
    updatedTotalScore?: number;
    updatedOverallRatingLabel?: string;
}
