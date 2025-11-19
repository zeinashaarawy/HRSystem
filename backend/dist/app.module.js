"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.schemas = void 0;
const job_posting_schema_1 = require("./modules/recruitment/schemas/job-posting.schema");
const candidate_application_schema_1 = require("./modules/recruitment/schemas/candidate-application.schema");
const referral_tag_schema_1 = require("./modules/recruitment/schemas/referral-tag.schema");
const offer_letter_schema_1 = require("./modules/recruitment/schemas/offer-letter.schema");
const preboarding_task_schema_1 = require("./modules/recruitment/schemas/preboarding-task.schema");
const assessment_template_schema_1 = require("./modules/recruitment/schemas/assessment-template.schema");
const interview_schedule_schema_1 = require("./modules/recruitment/schemas/interview-schedule.schema");
const interview_feedback_schema_1 = require("./modules/recruitment/schemas/interview-feedback.schema");
const candidate_profile_schema_1 = require("./modules/recruitment/schemas/candidate-profile.schema");
const candidate_consent_schema_1 = require("./modules/recruitment/schemas/candidate-consent.schema");
const recruitment_analytics_schema_1 = require("./modules/recruitment/schemas/recruitment-analytics.schema");
const communication_log_schema_1 = require("./modules/recruitment/schemas/communication-log.schema");
const hiring_workflow_schema_1 = require("./modules/recruitment/schemas/hiring-workflow.schema");
const job_template_schema_1 = require("./modules/recruitment/schemas/job-template.schema");
const onboarding_checklist_schema_1 = require("./modules/onboarding/schemas/onboarding-checklist.schema");
const onboarding_tracker_schema_1 = require("./modules/onboarding/schemas/onboarding-tracker.schema");
const contract_submission_schema_1 = require("./modules/onboarding/schemas/contract-submission.schema");
const signing_bonus_schema_1 = require("./modules/onboarding/schemas/signing-bonus.schema");
const payroll_initiation_schema_1 = require("./modules/onboarding/schemas/payroll-initiation.schema");
const asset_reservation_schema_1 = require("./modules/onboarding/schemas/asset-reservation.schema");
const access_provisioning_schema_1 = require("./modules/onboarding/schemas/access-provisioning.schema");
const offboarding_checklist_schema_1 = require("./modules/offboarding/schemas/offboarding-checklist.schema");
const offboarding_notification_schema_1 = require("./modules/offboarding/schemas/offboarding-notification.schema");
const clearance_signoff_schema_1 = require("./modules/offboarding/schemas/clearance-signoff.schema");
const access_revocation_schema_1 = require("./modules/offboarding/schemas/access-revocation.schema");
const resignation_request_schema_1 = require("./modules/offboarding/schemas/resignation-request.schema");
const termination_review_schema_1 = require("./modules/offboarding/schemas/termination-review.schema");
const reminder_schema_1 = require("./common/shared/reminder.schema");
const document_upload_schema_1 = require("./common/shared/document-upload.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const recruitment_module_1 = require("./modules/recruitment/models/recruitment.module");
const onboarding_module_1 = require("./modules/onboarding/models/onboarding.module");
const offboarding_module_1 = require("./modules/offboarding/models/offboarding.module");
exports.schemas = [
    job_posting_schema_1.JobPostingSchema, candidate_application_schema_1.CandidateApplicationSchema, referral_tag_schema_1.ReferralTagSchema, offer_letter_schema_1.OfferLetterSchema, preboarding_task_schema_1.PreboardingTaskSchema,
    assessment_template_schema_1.AssessmentTemplateSchema, interview_schedule_schema_1.InterviewScheduleSchema, interview_feedback_schema_1.InterviewFeedbackSchema, candidate_profile_schema_1.CandidateProfileSchema, candidate_consent_schema_1.CandidateConsentSchema, recruitment_analytics_schema_1.RecruitmentAnalyticsSchema, communication_log_schema_1.CommunicationLogSchema, hiring_workflow_schema_1.HiringWorkflowSchema, job_template_schema_1.JobTemplateSchema,
    onboarding_checklist_schema_1.OnboardingChecklistSchema, onboarding_tracker_schema_1.OnboardingTrackerSchema, contract_submission_schema_1.ContractSubmissionSchema, signing_bonus_schema_1.SigningBonusSchema, payroll_initiation_schema_1.PayrollInitiationSchema, asset_reservation_schema_1.AssetReservationSchema, access_provisioning_schema_1.AccessProvisioningSchema,
    offboarding_checklist_schema_1.OffboardingChecklistSchema, offboarding_notification_schema_1.OffboardingNotificationSchema, clearance_signoff_schema_1.ClearanceSignOffSchema, access_revocation_schema_1.AccessRevocationSchema, resignation_request_schema_1.ResignationRequestSchema, termination_review_schema_1.TerminationReviewSchema,
    reminder_schema_1.ReminderSchema, document_upload_schema_1.DocumentUploadSchema,
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/hr-system'),
            recruitment_module_1.RecruitmentModule,
            onboarding_module_1.OnboardingModule,
            offboarding_module_1.OffboardingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map