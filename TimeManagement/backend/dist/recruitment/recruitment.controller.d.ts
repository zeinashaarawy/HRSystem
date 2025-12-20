import { RecruitmentService } from './recruitment.service';
import { CreateJobTemplateDto, UpdateJobTemplateDto, CreateJobRequisitionDto, UpdateJobRequisitionDto, CreateApplicationDto, UpdateApplicationStatusDto, ScheduleInterviewDto, SubmitInterviewFeedbackDto, CreateOfferDto, ApproveOfferDto, RespondOfferDto, CreateReferralDto, RejectionTemplateDto, AnalyticsQueryDto } from './dto';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    getApiInfo(): {
        message: string;
        version: string;
        documentation: string;
        endpoints: {
            templates: string;
            jobs: string;
            applications: string;
            interviews: string;
            referrals: string;
            offers: string;
            analytics: string;
            consent: string;
        };
    };
    createJobTemplate(dto: CreateJobTemplateDto): Promise<import("./models/job-template.schema").JobTemplate>;
    getAllTemplates(): Promise<import("./models/job-template.schema").JobTemplate[]>;
    getTemplate(id: string): Promise<import("./models/job-template.schema").JobTemplate>;
    updateTemplate(id: string, dto: UpdateJobTemplateDto): Promise<import("./models/job-template.schema").JobTemplate>;
    deleteTemplate(id: string): Promise<void>;
    createJob(dto: CreateJobRequisitionDto): Promise<import("./models/job-requisition.schema").JobRequisition>;
    listJobs(): Promise<import("./models/job-requisition.schema").JobRequisition[]>;
    getJob(id: string): Promise<import("./models/job-requisition.schema").JobRequisition>;
    publishJob(id: string): Promise<import("./models/job-requisition.schema").JobRequisition>;
    updateJob(id: string, dto: UpdateJobRequisitionDto): Promise<import("./models/job-requisition.schema").JobRequisition>;
    apply(dto: CreateApplicationDto): Promise<import("./models/application.schema").Application>;
    getAllApplications(): Promise<import("./models/application.schema").Application[]>;
    getApplication(id: string): Promise<import("./models/application.schema").Application>;
    getStatus(id: string): Promise<{
        application: import("./models/application.schema").Application;
        history: import("./models/application-history.schema").ApplicationStatusHistory[];
    }>;
    updateStatus(id: string, dto: UpdateApplicationStatusDto): Promise<import("./models/application.schema").Application>;
    notifyCandidate(id: string, template: RejectionTemplateDto): Promise<{
        message: string;
        applicationId: string;
    }>;
    scheduleInterview(dto: ScheduleInterviewDto): Promise<import("./models/interview.schema").Interview>;
    getInterviews(applicationId: string): Promise<import("./models/interview.schema").Interview[] | {
        message: string;
    }>;
    getInterview(id: string): Promise<import("./models/interview.schema").Interview>;
    submitFeedback(interviewId: string, dto: SubmitInterviewFeedbackDto): Promise<import("./models/assessment-result.schema").AssessmentResult>;
    tagReferral(dto: CreateReferralDto): Promise<import("./models/referral.schema").Referral>;
    getReferrals(candidateId: string): Promise<import("./models/referral.schema").Referral[] | {
        message: string;
    }>;
    createOffer(dto: CreateOfferDto): Promise<import("./models/offer.schema").Offer>;
    getOffer(id: string): Promise<import("./models/offer.schema").Offer>;
    approveOffer(id: string, dto: ApproveOfferDto): Promise<import("./models/offer.schema").Offer>;
    acceptOffer(id: string, dto: RespondOfferDto): Promise<import("./models/offer.schema").Offer>;
    getRecruitmentAnalytics(query: AnalyticsQueryDto): Promise<any>;
    saveConsent(dto: {
        candidateId: string;
        consentGiven: boolean;
    }): Promise<{
        message: string;
        consent?: undefined;
    } | {
        message: string;
        consent: {
            candidateId: string;
            consentGiven: boolean;
        };
    }>;
}
