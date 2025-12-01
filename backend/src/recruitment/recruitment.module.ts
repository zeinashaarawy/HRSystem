import { Module } from '@nestjs/common';
import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobTemplate, JobTemplateSchema } from './models/job-template.schema';
import { JobRequisition,JobRequisitionSchema } from './models/job-requisition.schema';
import { Application,ApplicationSchema } from './models/application.schema';
import { ApplicationStatusHistory,ApplicationStatusHistorySchema } from './models/application-history.schema';
import { Interview,InterviewSchema } from './models/interview.schema';
import { AssessmentResult,AssessmentResultSchema } from './models/assessment-result.schema';
import { Referral,ReferralSchema } from './models/referral.schema';
import { Offer,OfferSchema } from './models/offer.schema';
import { Contract,ContractSchema } from './models/contract.schema';
import { Document,DocumentSchema } from './models/document.schema';
import { TerminationRequest,TerminationRequestSchema } from './models/termination-request.schema';
import { ClearanceChecklist,ClearanceChecklistSchema } from './models/clearance-checklist.schema';
import { Onboarding,OnboardingSchema } from './models/onboarding.schema';
import {
  StubOnboardingService,
  StubEmployeeProfileService,
  StubOrganizationStructureService,
} from './services/stub-services';

/**
 * RecruitmentModule with stub services for cross-subsystem integration.
 * 
 * When other subsystems are integrated:
 * 1. Import the real modules (e.g., EmployeeProfileModule, OnboardingModule, etc.)
 * 2. Remove the stub service providers
 * 3. The real services will be injected automatically via their modules
 * 
 * Example integration:
 * ```typescript
 * @Module({
 *   imports: [
 *     MongooseModule.forFeature([...]),
 *     EmployeeProfileModule,  // Add real module
 *     OnboardingModule,        // Add real module
 *     OrganizationStructureModule, // Add real module
 *   ],
 *   providers: [
 *     RecruitmentService,
 *     // Remove stub services - real ones come from imported modules
 *   ],
 * })
 * ```
 */
@Module({
  imports:[MongooseModule.forFeature([
      { name: JobTemplate.name, schema: JobTemplateSchema },
      { name: JobRequisition.name, schema: JobRequisitionSchema },
      { name: Application.name, schema: ApplicationSchema },
      { name: ApplicationStatusHistory.name, schema: ApplicationStatusHistorySchema },
      { name: Interview.name, schema: InterviewSchema },
      { name: AssessmentResult.name, schema: AssessmentResultSchema },
      { name: Referral.name, schema: ReferralSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: Contract.name, schema: ContractSchema },
      { name: Document.name, schema: DocumentSchema },
      { name: TerminationRequest.name, schema: TerminationRequestSchema },
      { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
      { name: Onboarding.name, schema: OnboardingSchema },
    ])
  ],
  controllers: [RecruitmentController],
  providers: [
    RecruitmentService,
    // Stub services for standalone operation - replace with real modules when integrated
    {
      provide: 'IOnboardingService',
      useClass: StubOnboardingService,
    },
    {
      provide: 'IEmployeeProfileService',
      useClass: StubEmployeeProfileService,
    },
    {
      provide: 'IOrganizationStructureService',
      useClass: StubOrganizationStructureService,
    },
  ],
  exports:[RecruitmentService]

})
export class RecruitmentModule {}
