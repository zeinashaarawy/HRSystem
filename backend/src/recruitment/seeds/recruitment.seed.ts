import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

// Import all recruitment models
import { JobTemplate, JobTemplateDocument } from '../models/job-template.schema';
import { JobRequisition, JobRequisitionDocument } from '../models/job-requisition.schema';
import { Application, ApplicationDocument } from '../models/application.schema';
import { Interview, InterviewDocument } from '../models/interview.schema';
import { Offer, OfferDocument } from '../models/offer.schema';
import { Onboarding, OnboardingDocument } from '../models/onboarding.schema';
import { Document, DocumentDocument } from '../models/document.schema';
import { Contract, ContractDocument } from '../models/contract.schema';
import { ApplicationStatusHistory, ApplicationStatusHistoryDocument } from '../models/application-history.schema';
import { AssessmentResult, AssessmentResultDocument } from '../models/assessment-result.schema';
import { Referral, ReferralDocument } from '../models/referral.schema';
import { TerminationRequest, TerminationRequestDocument } from '../models/termination-request.schema';
import { ClearanceChecklist, ClearanceChecklistDocument } from '../models/clearance-checklist.schema';

// Import enums
import { ApplicationStage } from '../enums/application-stage.enum';
import { ApplicationStatus } from '../enums/application-status.enum';
import { InterviewMethod } from '../enums/interview-method.enum';
import { InterviewStatus } from '../enums/interview-status.enum';
import { OfferResponseStatus } from '../enums/offer-response-status.enum';
import { OfferFinalStatus } from '../enums/offer-final-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { OnboardingTaskStatus } from '../enums/onboarding-task-status.enum';
import { DocumentType } from '../enums/document-type.enum';
import { TerminationInitiation } from '../enums/termination-initiation.enum';
import { TerminationStatus } from '../enums/termination-status.enum';

/**
 * Recruitment Module Seeding Script
 * 
 * This script demonstrates inter-module integration by:
 * 1. Creating recruitment data with references to external modules (User/Employee)
 * 2. Establishing relationships between recruitment entities
 * 3. Creating a complete recruitment workflow from job posting to onboarding
 * 
 * Note: This uses mock ObjectIds for User references since User model is in EmployeeProfileModule
 * In a real scenario, these would reference actual users from the employee profile module
 */

async function seedRecruitment() {
  console.log('🌱 Starting Recruitment Module Seeding...\n');

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get all model instances
    const jobTemplateModel = app.get<Model<JobTemplateDocument>>(
      getModelToken(JobTemplate.name),
    );
    const jobRequisitionModel = app.get<Model<JobRequisitionDocument>>(
      getModelToken(JobRequisition.name),
    );
    const applicationModel = app.get<Model<ApplicationDocument>>(
      getModelToken(Application.name),
    );
    const interviewModel = app.get<Model<InterviewDocument>>(
      getModelToken(Interview.name),
    );
    const offerModel = app.get<Model<OfferDocument>>(getModelToken(Offer.name));
    const onboardingModel = app.get<Model<OnboardingDocument>>(
      getModelToken(Onboarding.name),
    );
    const documentModel = app.get<Model<DocumentDocument>>(
      getModelToken(Document.name),
    );
    const contractModel = app.get<Model<ContractDocument>>(
      getModelToken(Contract.name),
    );
    const applicationHistoryModel = app.get<Model<ApplicationStatusHistoryDocument>>(
      getModelToken(ApplicationStatusHistory.name),
    );
    const assessmentResultModel = app.get<Model<AssessmentResultDocument>>(
      getModelToken(AssessmentResult.name),
    );
    const referralModel = app.get<Model<ReferralDocument>>(
      getModelToken(Referral.name),
    );
    const terminationRequestModel = app.get<Model<TerminationRequestDocument>>(
      getModelToken(TerminationRequest.name),
    );
    const clearanceChecklistModel = app.get<Model<ClearanceChecklistDocument>>(
      getModelToken(ClearanceChecklist.name),
    );

    // Mock User IDs (in real scenario, these would come from EmployeeProfileModule)
    const mockHiringManagerId = new Types.ObjectId();
    const mockHrId = new Types.ObjectId();
    const mockInterviewerId = new Types.ObjectId();
    const mockEmployeeId = new Types.ObjectId();
    const mockCandidateId = new Types.ObjectId(); // Placeholder for Candidate collection

    // Clear existing data
    console.log('🧹 Clearing existing recruitment data...');
    await Promise.all([
      jobTemplateModel.deleteMany({}),
      jobRequisitionModel.deleteMany({}),
      applicationModel.deleteMany({}),
      interviewModel.deleteMany({}),
      offerModel.deleteMany({}),
      onboardingModel.deleteMany({}),
      documentModel.deleteMany({}),
      contractModel.deleteMany({}),
      applicationHistoryModel.deleteMany({}),
      assessmentResultModel.deleteMany({}),
      referralModel.deleteMany({}),
      terminationRequestModel.deleteMany({}),
      clearanceChecklistModel.deleteMany({}),
    ]);
    console.log('✅ Existing data cleared\n');

    // 1. Create Job Templates
    console.log('📝 Creating Job Templates...');
    const jobTemplate = await jobTemplateModel.create({
      title: 'Senior Software Engineer',
      department: 'Engineering',
      qualifications: ['Bachelor\'s in Computer Science', '5+ years experience'],
      skills: ['TypeScript', 'Node.js', 'React', 'MongoDB'],
      description: 'We are looking for an experienced software engineer to join our team.',
    });
    console.log(`✅ Created Job Template: ${jobTemplate.title} (ID: ${jobTemplate._id})\n`);

    // 2. Create Job Requisition
    console.log('📋 Creating Job Requisitions...');
    const jobRequisition = await jobRequisitionModel.create({
      requisitionId: 'REQ-2024-001',
      templateId: jobTemplate._id,
      openings: 2,
      location: 'Remote',
      hiringManagerId: mockHiringManagerId,
      publishStatus: 'published',
      postingDate: new Date('2024-01-15'),
      expiryDate: new Date('2024-03-15'),
    });
    console.log(`✅ Created Job Requisition: ${jobRequisition.requisitionId} (ID: ${jobRequisition._id})\n`);

    // 3. Create Application
    console.log('📨 Creating Applications...');
    const application = await applicationModel.create({
      candidateId: mockCandidateId,
      requisitionId: jobRequisition._id,
      assignedHr: mockHrId,
      currentStage: ApplicationStage.SCREENING,
      status: ApplicationStatus.IN_PROCESS,
    });
    console.log(`✅ Created Application (ID: ${application._id})\n`);

    // 4. Create Application Status History
    console.log('📊 Creating Application Status History...');
    await applicationHistoryModel.create({
      applicationId: application._id,
      oldStage: ApplicationStage.SCREENING,
      newStage: ApplicationStage.DEPARTMENT_INTERVIEW,
      oldStatus: ApplicationStatus.SUBMITTED,
      newStatus: ApplicationStatus.IN_PROCESS,
      changedBy: mockHrId,
    });
    console.log('✅ Created Application Status History\n');

    // 5. Create Interview
    console.log('🗓️ Creating Interviews...');
    const interview = await interviewModel.create({
      applicationId: application._id,
      stage: ApplicationStage.DEPARTMENT_INTERVIEW,
      scheduledDate: new Date('2024-02-01T10:00:00Z'),
      method: InterviewMethod.VIDEO,
      panel: [mockInterviewerId, mockHiringManagerId],
      videoLink: 'https://meet.example.com/interview-001',
      status: InterviewStatus.COMPLETED,
    });
    console.log(`✅ Created Interview (ID: ${interview._id})\n`);

    // 6. Create Assessment Result
    console.log('⭐ Creating Assessment Results...');
    const assessmentResult = await assessmentResultModel.create({
      interviewId: interview._id,
      interviewerId: mockInterviewerId,
      score: 85,
      comments: 'Strong technical skills, good communication.',
    });
    console.log(`✅ Created Assessment Result (ID: ${assessmentResult._id})\n`);

    // Update interview with feedback
    await interviewModel.updateOne(
      { _id: interview._id },
      { feedbackId: assessmentResult._id },
    );

    // 7. Create Offer
    console.log('💰 Creating Offers...');
    const offer = await offerModel.create({
      applicationId: application._id,
      candidateId: mockCandidateId,
      hrEmployeeId: mockHrId,
      grossSalary: 120000,
      signingBonus: 5000,
      benefits: ['Health Insurance', '401k', 'Remote Work'],
      conditions: 'Standard employment terms',
      insurances: 'Full health and dental coverage',
      content: 'We are pleased to offer you the position of Senior Software Engineer...',
      role: 'Senior Software Engineer',
      deadline: new Date('2024-02-15'),
      applicantResponse: OfferResponseStatus.ACCEPTED,
      approvers: [
        {
          employeeId: mockHiringManagerId,
          role: 'Hiring Manager',
          status: ApprovalStatus.APPROVED,
          actionDate: new Date('2024-02-05'),
          comment: 'Approved',
        },
      ],
      finalStatus: OfferFinalStatus.APPROVED,
      candidateSignedAt: new Date('2024-02-10'),
      hrSignedAt: new Date('2024-02-10'),
    });
    console.log(`✅ Created Offer (ID: ${offer._id})\n`);

    // 8. Create Document
    console.log('📄 Creating Documents...');
    const document = await documentModel.create({
      ownerId: mockEmployeeId,
      type: DocumentType.CONTRACT,
      filePath: '/documents/contracts/contract-001.pdf',
    });
    console.log(`✅ Created Document (ID: ${document._id})\n`);

    // 9. Create Contract
    console.log('📜 Creating Contracts...');
    await contractModel.create({
      offerId: offer._id,
      acceptanceDate: new Date('2024-02-10'),
      grossSalary: 120000,
      signingBonus: 5000,
      role: 'Senior Software Engineer',
      benefits: ['Health Insurance', '401k', 'Remote Work'],
      documentId: document._id,
      employeeSignedAt: new Date('2024-02-10'),
      employerSignedAt: new Date('2024-02-10'),
    });
    console.log('✅ Created Contract\n');

    // 10. Create Onboarding (Integration with Employee Profile Module)
    console.log('👋 Creating Onboarding Tasks...');
    await onboardingModel.create({
      employeeId: mockEmployeeId, // References User from EmployeeProfileModule
      tasks: [
        {
          name: 'Upload ID Document',
          department: 'HR',
          status: OnboardingTaskStatus.COMPLETED,
          deadline: new Date('2024-02-20'),
          completedAt: new Date('2024-02-18'),
          documentId: document._id,
          notes: 'ID uploaded successfully',
        },
        {
          name: 'Set up Email Account',
          department: 'IT',
          status: OnboardingTaskStatus.IN_PROGRESS,
          deadline: new Date('2024-02-25'),
          notes: 'In progress',
        },
        {
          name: 'Complete Payroll Forms',
          department: 'HR',
          status: OnboardingTaskStatus.PENDING,
          deadline: new Date('2024-02-28'),
          notes: 'Pending',
        },
      ],
      completed: false,
    });
    console.log('✅ Created Onboarding Tasks\n');

    // 11. Create Referral
    console.log('🤝 Creating Referrals...');
    await referralModel.create({
      referringEmployeeId: mockEmployeeId,
      candidateId: mockCandidateId,
      role: 'Senior Software Engineer',
      level: 'Senior',
    });
    console.log('✅ Created Referral\n');

    // 12. Create Termination Request
    console.log('🚪 Creating Termination Requests...');
    const terminationRequest = await terminationRequestModel.create({
      employeeId: mockEmployeeId,
      initiator: TerminationInitiation.EMPLOYEE,
      reason: 'Resignation - Personal reasons',
      employeeComments: 'Moving to a new city',
      status: TerminationStatus.UNDER_REVIEW,
      terminationDate: new Date('2024-04-30'),
      contractId: new Types.ObjectId(), // Placeholder
    });
    console.log(`✅ Created Termination Request (ID: ${terminationRequest._id})\n`);

    // 13. Create Clearance Checklist
    console.log('✅ Creating Clearance Checklists...');
    await clearanceChecklistModel.create({
      terminationId: terminationRequest._id,
      items: [
        {
          department: 'IT',
          status: ApprovalStatus.PENDING,
          comments: 'Return laptop and access card',
        },
        {
          department: 'Finance',
          status: ApprovalStatus.PENDING,
          comments: 'Settle pending expenses',
        },
        {
          department: 'HR',
          status: ApprovalStatus.PENDING,
          comments: 'Complete exit interview',
        },
      ],
      equipmentList: [
        {
          equipmentId: new Types.ObjectId(),
          name: 'Laptop',
          returned: false,
          condition: 'Good',
        },
      ],
      cardReturned: false,
    });
    console.log('✅ Created Clearance Checklist\n');

    console.log('✅ Recruitment Module Seeding Completed Successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Job Templates: 1`);
    console.log(`   - Job Requisitions: 1`);
    console.log(`   - Applications: 1`);
    console.log(`   - Interviews: 1`);
    console.log(`   - Offers: 1`);
    console.log(`   - Onboarding Records: 1`);
    console.log(`   - Documents: 1`);
    console.log(`   - Contracts: 1`);
    console.log(`   - Terminations: 1`);
    console.log('\n💡 This demonstrates:');
    console.log('   - Complete recruitment workflow from job posting to onboarding');
    console.log('   - Inter-module integration (references to User/Employee from EmployeeProfileModule)');
    console.log('   - Relationships between all recruitment entities');
    console.log('   - Full lifecycle: Application → Interview → Offer → Contract → Onboarding → Termination\n');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await app.close();
  }
}

// Run the seeding
seedRecruitment()
  .then(() => {
    console.log('✨ Seeding process finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });

