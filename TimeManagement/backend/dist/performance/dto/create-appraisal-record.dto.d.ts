import { RatingEntryDto } from './rating-entry.dto';
export declare class CreateAppraisalRecordDto {
    assignmentId: string;
    cycleId: string;
    templateId: string;
    employeeProfileId: string;
    ratings: RatingEntryDto[];
    totalScore?: number;
    overallRatingLabel?: string;
    managerSummary?: string;
    strengths?: string;
    improvementAreas?: string;
}
