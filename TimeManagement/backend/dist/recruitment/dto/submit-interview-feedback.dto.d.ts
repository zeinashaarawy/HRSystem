export declare class SubmitInterviewFeedbackDto {
    interviewId?: string;
    interviewerId: string;
    technicalScore: number;
    communicationScore: number;
    cultureFitScore: number;
    overallScore: number;
    comments?: string;
    recommendation?: 'hire' | 'reject' | 'maybe';
}
