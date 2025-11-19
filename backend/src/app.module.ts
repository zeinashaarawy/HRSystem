// Import schemas for future use or registration in modules
import { JobPostingSchema } from './modules/recruitment/schemas/job-posting.schema';
import { CandidateApplicationSchema } from './modules/recruitment/schemas/candidate-application.schema';
import { ReferralTagSchema } from './modules/recruitment/schemas/referral-tag.schema';
import { OfferLetterSchema } from './modules/recruitment/schemas/offer-letter.schema';
import { PreboardingTaskSchema } from './modules/recruitment/schemas/preboarding-task.schema';
import { AssessmentTemplateSchema } from './modules/recruitment/schemas/assessment-template.schema';
import { InterviewScheduleSchema } from './modules/recruitment/schemas/interview-schedule.schema';
import { InterviewFeedbackSchema } from './modules/recruitment/schemas/interview-feedback.schema';
import { CandidateProfileSchema } from './modules/recruitment/schemas/candidate-profile.schema';
import { CandidateConsentSchema } from './modules/recruitment/schemas/candidate-consent.schema';
import { RecruitmentAnalyticsSchema } from './modules/recruitment/schemas/recruitment-analytics.schema';
import { CommunicationLogSchema } from './modules/recruitment/schemas/communication-log.schema';
import { HiringWorkflowSchema } from './modules/recruitment/schemas/hiring-workflow.schema';
import { JobTemplateSchema } from './modules/recruitment/schemas/job-template.schema';

import { OnboardingChecklistSchema } from './modules/onboarding/schemas/onboarding-checklist.schema';
import { OnboardingTrackerSchema } from './modules/onboarding/schemas/onboarding-tracker.schema';
import { ContractSubmissionSchema } from './modules/onboarding/schemas/contract-submission.schema';
import { SigningBonusSchema } from './modules/onboarding/schemas/signing-bonus.schema';
import { PayrollInitiationSchema } from './modules/onboarding/schemas/payroll-initiation.schema';
import { AssetReservationSchema } from './modules/onboarding/schemas/asset-reservation.schema';
import { AccessProvisioningSchema } from './modules/onboarding/schemas/access-provisioning.schema';

import { OffboardingChecklistSchema } from './modules/offboarding/schemas/offboarding-checklist.schema';
import { OffboardingNotificationSchema } from './modules/offboarding/schemas/offboarding-notification.schema';
import { ClearanceSignOffSchema } from './modules/offboarding/schemas/clearance-signoff.schema';
import { AccessRevocationSchema } from './modules/offboarding/schemas/access-revocation.schema';
import { ResignationRequestSchema } from './modules/offboarding/schemas/resignation-request.schema';
import { TerminationReviewSchema } from './modules/offboarding/schemas/termination-review.schema';

import { ReminderSchema } from './common/shared/reminder.schema';
import { DocumentUploadSchema } from './common/shared/document-upload.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruitmentModule } from './modules/recruitment/models/recruitment.module';
import { OnboardingModule } from './modules/onboarding/models/onboarding.module';
import { OffboardingModule } from './modules/offboarding/models/offboarding.module';

// Collect all schemas for easy MongooseModule registration when needed later, or export for foundation
export const schemas = [
  JobPostingSchema, CandidateApplicationSchema, ReferralTagSchema, OfferLetterSchema, PreboardingTaskSchema,
  AssessmentTemplateSchema, InterviewScheduleSchema, InterviewFeedbackSchema, CandidateProfileSchema, CandidateConsentSchema, RecruitmentAnalyticsSchema, CommunicationLogSchema, HiringWorkflowSchema, JobTemplateSchema,
  OnboardingChecklistSchema, OnboardingTrackerSchema, ContractSubmissionSchema, SigningBonusSchema, PayrollInitiationSchema, AssetReservationSchema, AccessProvisioningSchema,
  OffboardingChecklistSchema, OffboardingNotificationSchema, ClearanceSignOffSchema, AccessRevocationSchema, ResignationRequestSchema, TerminationReviewSchema,
  ReminderSchema, DocumentUploadSchema,
];

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/hr-system'),
    RecruitmentModule,
    OnboardingModule,
    OffboardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
