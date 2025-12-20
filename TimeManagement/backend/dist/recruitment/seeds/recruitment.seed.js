"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_template_schema_1 = require("../models/job-template.schema");
const job_requisition_schema_1 = require("../models/job-requisition.schema");
const application_schema_1 = require("../models/application.schema");
const interview_schema_1 = require("../models/interview.schema");
const offer_schema_1 = require("../models/offer.schema");
const onboarding_schema_1 = require("../models/onboarding.schema");
const document_schema_1 = require("../models/document.schema");
const contract_schema_1 = require("../models/contract.schema");
const application_history_schema_1 = require("../models/application-history.schema");
const assessment_result_schema_1 = require("../models/assessment-result.schema");
const referral_schema_1 = require("../models/referral.schema");
const termination_request_schema_1 = require("../models/termination-request.schema");
const clearance_checklist_schema_1 = require("../models/clearance-checklist.schema");
const application_stage_enum_1 = require("../enums/application-stage.enum");
const application_status_enum_1 = require("../enums/application-status.enum");
const interview_method_enum_1 = require("../enums/interview-method.enum");
const interview_status_enum_1 = require("../enums/interview-status.enum");
const offer_response_status_enum_1 = require("../enums/offer-response-status.enum");
const offer_final_status_enum_1 = require("../enums/offer-final-status.enum");
const approval_status_enum_1 = require("../enums/approval-status.enum");
const onboarding_task_status_enum_1 = require("../enums/onboarding-task-status.enum");
const document_type_enum_1 = require("../enums/document-type.enum");
const termination_initiation_enum_1 = require("../enums/termination-initiation.enum");
const termination_status_enum_1 = require("../enums/termination-status.enum");
async function seedRecruitment() {
    console.log('Starting Recruitment Module Seeding...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const jobTemplateModel = app.get((0, mongoose_1.getModelToken)(job_template_schema_1.JobTemplate.name));
        const jobRequisitionModel = app.get((0, mongoose_1.getModelToken)(job_requisition_schema_1.JobRequisition.name));
        const applicationModel = app.get((0, mongoose_1.getModelToken)(application_schema_1.Application.name));
        const interviewModel = app.get((0, mongoose_1.getModelToken)(interview_schema_1.Interview.name));
        const offerModel = app.get((0, mongoose_1.getModelToken)(offer_schema_1.Offer.name));
        const onboardingModel = app.get((0, mongoose_1.getModelToken)(onboarding_schema_1.Onboarding.name));
        const documentModel = app.get((0, mongoose_1.getModelToken)(document_schema_1.Document.name));
        const contractModel = app.get((0, mongoose_1.getModelToken)(contract_schema_1.Contract.name));
        const applicationHistoryModel = app.get((0, mongoose_1.getModelToken)(application_history_schema_1.ApplicationStatusHistory.name));
        const assessmentResultModel = app.get((0, mongoose_1.getModelToken)(assessment_result_schema_1.AssessmentResult.name));
        const referralModel = app.get((0, mongoose_1.getModelToken)(referral_schema_1.Referral.name));
        const terminationRequestModel = app.get((0, mongoose_1.getModelToken)(termination_request_schema_1.TerminationRequest.name));
        const clearanceChecklistModel = app.get((0, mongoose_1.getModelToken)(clearance_checklist_schema_1.ClearanceChecklist.name));
        const users = {
            hiringManager: new mongoose_2.Types.ObjectId(),
            hr: new mongoose_2.Types.ObjectId(),
            interviewer: new mongoose_2.Types.ObjectId(),
            financeApprover: new mongoose_2.Types.ObjectId(),
            employee: new mongoose_2.Types.ObjectId(),
            candidateUserPrimary: new mongoose_2.Types.ObjectId(),
            candidateUserRejected: new mongoose_2.Types.ObjectId(),
            candidateUserReferral: new mongoose_2.Types.ObjectId(),
        };
        const candidates = {
            primary: new mongoose_2.Types.ObjectId(),
            rejected: new mongoose_2.Types.ObjectId(),
            referral: new mongoose_2.Types.ObjectId(),
        };
        console.log('Clearing existing recruitment data...');
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
        console.log('Existing data cleared.');
        const jobTemplateEngineering = await jobTemplateModel.create({
            title: 'Senior Software Engineer',
            department: 'Engineering',
            qualifications: ["Bachelor's in Computer Science", '5+ years experience'],
            skills: ['TypeScript', 'Node.js', 'React', 'MongoDB'],
            description: 'Employer-branded template. Stages: screening -> department interview -> HR interview -> offer.',
        });
        const jobTemplateHR = await jobTemplateModel.create({
            title: 'HR Business Partner',
            department: 'People',
            qualifications: ['HR certification', '3+ years HRBP experience'],
            skills: ['Employee Relations', 'Analytics', 'Communication'],
            description: 'Internal template. Stages: screening -> HR interview -> offer (with approvals).',
        });
        const jobTemplateMarketing = await jobTemplateModel.create({
            title: 'Marketing Manager',
            department: 'Marketing',
            qualifications: ['Brand management background', 'Portfolio of campaigns'],
            skills: ['Content', 'SEO', 'Campaign Analytics'],
            description: 'External careers page ready. Stages: screening -> panel interview -> offer.',
        });
        const jobRequisitionPublished = await jobRequisitionModel.create({
            requisitionId: 'REQ-2024-001',
            templateId: jobTemplateEngineering._id,
            openings: 2,
            location: 'Remote',
            hiringManagerId: users.hiringManager,
            publishStatus: 'published',
            postingDate: new Date('2024-01-15'),
            expiryDate: new Date('2024-03-15'),
        });
        const jobRequisitionDraft = await jobRequisitionModel.create({
            requisitionId: 'REQ-2024-002',
            templateId: jobTemplateHR._id,
            openings: 1,
            location: 'Cairo HQ',
            hiringManagerId: users.hiringManager,
            publishStatus: 'draft',
            postingDate: undefined,
            expiryDate: new Date('2024-04-01'),
        });
        const jobRequisitionExternal = await jobRequisitionModel.create({
            requisitionId: 'REQ-2024-003',
            templateId: jobTemplateMarketing._id,
            openings: 1,
            location: 'Riyadh (External Careers Page)',
            hiringManagerId: users.hiringManager,
            publishStatus: 'published',
            postingDate: new Date('2024-02-01'),
            expiryDate: new Date('2024-04-01'),
        });
        const applicationPrimary = await applicationModel.create({
            candidateId: candidates.primary,
            requisitionId: jobRequisitionPublished._id,
            assignedHr: users.hr,
            currentStage: application_stage_enum_1.ApplicationStage.SCREENING,
            status: application_status_enum_1.ApplicationStatus.IN_PROCESS,
        });
        const applicationRejected = await applicationModel.create({
            candidateId: candidates.rejected,
            requisitionId: jobRequisitionPublished._id,
            assignedHr: users.hr,
            currentStage: application_stage_enum_1.ApplicationStage.SCREENING,
            status: application_status_enum_1.ApplicationStatus.SUBMITTED,
        });
        const applicationReferral = await applicationModel.create({
            candidateId: candidates.referral,
            requisitionId: jobRequisitionExternal._id,
            assignedHr: users.hr,
            currentStage: application_stage_enum_1.ApplicationStage.HR_INTERVIEW,
            status: application_status_enum_1.ApplicationStatus.IN_PROCESS,
        });
        const applicationHistories = await applicationHistoryModel.create([
            {
                applicationId: applicationPrimary._id,
                oldStage: application_stage_enum_1.ApplicationStage.SCREENING,
                newStage: application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW,
                oldStatus: application_status_enum_1.ApplicationStatus.SUBMITTED,
                newStatus: application_status_enum_1.ApplicationStatus.IN_PROCESS,
                changedBy: users.hr,
            },
            {
                applicationId: applicationPrimary._id,
                oldStage: application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW,
                newStage: application_stage_enum_1.ApplicationStage.HR_INTERVIEW,
                oldStatus: application_status_enum_1.ApplicationStatus.IN_PROCESS,
                newStatus: application_status_enum_1.ApplicationStatus.IN_PROCESS,
                changedBy: users.hiringManager,
            },
            {
                applicationId: applicationRejected._id,
                oldStage: application_stage_enum_1.ApplicationStage.SCREENING,
                newStage: application_stage_enum_1.ApplicationStage.SCREENING,
                oldStatus: application_status_enum_1.ApplicationStatus.SUBMITTED,
                newStatus: application_status_enum_1.ApplicationStatus.REJECTED,
                changedBy: users.hr,
            },
            {
                applicationId: applicationReferral._id,
                oldStage: application_stage_enum_1.ApplicationStage.SCREENING,
                newStage: application_stage_enum_1.ApplicationStage.HR_INTERVIEW,
                oldStatus: application_status_enum_1.ApplicationStatus.SUBMITTED,
                newStatus: application_status_enum_1.ApplicationStatus.IN_PROCESS,
                changedBy: users.hr,
            },
        ]);
        console.log(`Application histories created: ${applicationHistories.length}`);
        const interviewPrimary = await interviewModel.create({
            applicationId: applicationPrimary._id,
            stage: application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW,
            scheduledDate: new Date('2024-02-01T10:00:00Z'),
            method: interview_method_enum_1.InterviewMethod.VIDEO,
            panel: [users.interviewer, users.hiringManager],
            videoLink: 'https://meet.example.com/interview-001',
            status: interview_status_enum_1.InterviewStatus.COMPLETED,
        });
        const interviewReferral = await interviewModel.create({
            applicationId: applicationReferral._id,
            stage: application_stage_enum_1.ApplicationStage.HR_INTERVIEW,
            scheduledDate: new Date('2024-02-07T09:00:00Z'),
            method: interview_method_enum_1.InterviewMethod.ONSITE,
            panel: [users.hiringManager],
            calendarEventId: 'CAL-REF-001',
            status: interview_status_enum_1.InterviewStatus.SCHEDULED,
            candidateFeedback: 'Pre-panel brief shared with candidate (communication template).',
        });
        const assessmentPrimary = await assessmentResultModel.create({
            interviewId: interviewPrimary._id,
            interviewerId: users.interviewer,
            score: 85,
            comments: 'Strong technical skills, good communication.',
        });
        const assessmentReferral = await assessmentResultModel.create({
            interviewId: interviewReferral._id,
            interviewerId: users.hiringManager,
            score: 90,
            comments: 'Referral candidate with strong campaign portfolio.',
        });
        await interviewModel.updateOne({ _id: interviewPrimary._id }, { feedbackId: assessmentPrimary._id });
        await interviewModel.updateOne({ _id: interviewReferral._id }, { feedbackId: assessmentReferral._id });
        const offerAccepted = await offerModel.create({
            applicationId: applicationPrimary._id,
            candidateId: candidates.primary,
            hrEmployeeId: users.hr,
            grossSalary: 120000,
            signingBonus: 5000,
            benefits: ['Health Insurance', '401k', 'Remote Work'],
            conditions: 'Standard employment terms',
            insurances: 'Full health and dental coverage',
            content: 'Offer letter for Senior Software Engineer.',
            role: 'Senior Software Engineer',
            deadline: new Date('2024-02-15'),
            applicantResponse: offer_response_status_enum_1.OfferResponseStatus.ACCEPTED,
            approvers: [
                {
                    employeeId: users.hiringManager,
                    role: 'Hiring Manager',
                    status: approval_status_enum_1.ApprovalStatus.APPROVED,
                    actionDate: new Date('2024-02-05'),
                    comment: 'Approved',
                },
                {
                    employeeId: users.financeApprover,
                    role: 'Finance',
                    status: approval_status_enum_1.ApprovalStatus.APPROVED,
                    actionDate: new Date('2024-02-06'),
                    comment: 'Budget confirmed',
                },
            ],
            finalStatus: offer_final_status_enum_1.OfferFinalStatus.APPROVED,
            candidateSignedAt: new Date('2024-02-10'),
            hrSignedAt: new Date('2024-02-10'),
        });
        const offerPending = await offerModel.create({
            applicationId: applicationReferral._id,
            candidateId: candidates.referral,
            hrEmployeeId: users.hr,
            grossSalary: 95000,
            benefits: ['Medical', 'Annual Bonus'],
            conditions: 'Pending candidate response',
            content: 'Offer letter for Marketing Manager.',
            role: 'Marketing Manager',
            deadline: new Date('2024-03-05'),
            applicantResponse: offer_response_status_enum_1.OfferResponseStatus.PENDING,
            approvers: [
                {
                    employeeId: users.hiringManager,
                    role: 'Hiring Manager',
                    status: approval_status_enum_1.ApprovalStatus.PENDING,
                    actionDate: undefined,
                    comment: 'Awaiting panel feedback',
                },
            ],
            finalStatus: offer_final_status_enum_1.OfferFinalStatus.PENDING,
        });
        const contractDocument = await documentModel.create({
            ownerId: users.employee,
            type: document_type_enum_1.DocumentType.CONTRACT,
            filePath: '/documents/contracts/contract-001.pdf',
            uploadedAt: new Date('2024-02-10'),
        });
        await documentModel.create({
            ownerId: users.candidateUserRejected,
            type: document_type_enum_1.DocumentType.CV,
            filePath: '/documents/cv/candidate-rejected.pdf',
            uploadedAt: new Date('2024-01-20'),
        });
        await documentModel.create({
            ownerId: users.candidateUserReferral,
            type: document_type_enum_1.DocumentType.ID,
            filePath: '/documents/consents/referral-candidate-consent.txt',
            uploadedAt: new Date('2024-02-01'),
        });
        const contract = await contractModel.create({
            offerId: offerAccepted._id,
            acceptanceDate: new Date('2024-02-10'),
            grossSalary: 120000,
            signingBonus: 5000,
            role: 'Senior Software Engineer',
            benefits: ['Health Insurance', '401k', 'Remote Work'],
            documentId: contractDocument._id,
            employeeSignedAt: new Date('2024-02-10'),
            employerSignedAt: new Date('2024-02-10'),
        });
        await onboardingModel.create({
            employeeId: users.employee,
            tasks: [
                {
                    name: 'Pre-boarding paperwork',
                    department: 'HR',
                    status: onboarding_task_status_enum_1.OnboardingTaskStatus.COMPLETED,
                    deadline: new Date('2024-02-20'),
                    completedAt: new Date('2024-02-18'),
                    documentId: contractDocument._id,
                    notes: 'All compliance forms signed',
                },
                {
                    name: 'Set up Email Account',
                    department: 'IT',
                    status: onboarding_task_status_enum_1.OnboardingTaskStatus.IN_PROGRESS,
                    deadline: new Date('2024-02-25'),
                    notes: 'Provisioning requested',
                },
                {
                    name: 'Complete Payroll Forms',
                    department: 'HR',
                    status: onboarding_task_status_enum_1.OnboardingTaskStatus.PENDING,
                    deadline: new Date('2024-02-28'),
                    notes: 'Pending employee submission',
                },
            ],
            completed: false,
        });
        await referralModel.create({
            referringEmployeeId: users.employee,
            candidateId: candidates.referral,
            role: 'Marketing Manager',
            level: 'Senior',
        });
        const terminationRequest = await terminationRequestModel.create({
            employeeId: users.employee,
            initiator: termination_initiation_enum_1.TerminationInitiation.EMPLOYEE,
            reason: 'Resignation - Personal reasons',
            employeeComments: 'Moving to a new city',
            status: termination_status_enum_1.TerminationStatus.UNDER_REVIEW,
            terminationDate: new Date('2024-04-30'),
            contractId: contract._id,
        });
        await clearanceChecklistModel.create({
            terminationId: terminationRequest._id,
            items: [
                {
                    department: 'IT',
                    status: approval_status_enum_1.ApprovalStatus.PENDING,
                    comments: 'Return laptop and access card',
                },
                {
                    department: 'Finance',
                    status: approval_status_enum_1.ApprovalStatus.PENDING,
                    comments: 'Settle pending expenses',
                },
                {
                    department: 'HR',
                    status: approval_status_enum_1.ApprovalStatus.PENDING,
                    comments: 'Complete exit interview',
                },
            ],
            equipmentList: [
                {
                    equipmentId: new mongoose_2.Types.ObjectId(),
                    name: 'Laptop',
                    returned: false,
                    condition: 'Good',
                },
            ],
            cardReturned: false,
        });
        console.log('Recruitment Module Seeding Completed Successfully!');
        console.log('Summary:');
        console.log('  - Job Templates: 3');
        console.log('  - Job Requisitions: 3');
        console.log('  - Applications: 3');
        console.log(`  - Application Histories: ${applicationHistories.length}`);
        console.log('  - Interviews: 2');
        console.log('  - Assessment Results: 2');
        console.log('  - Offers: 2 (1 accepted, 1 pending)');
        console.log('  - Contracts: 1');
        console.log('  - Documents: 3 (cv, consent placeholder, contract)');
        console.log('  - Onboarding Records: 1');
        console.log('  - Referrals: 1');
        console.log('  - Terminations: 1');
        console.log('  - Clearance Checklists: 1');
        console.log('This demonstrates:');
        console.log('  - Complete recruitment workflow from job posting to onboarding and termination');
        console.log('  - Published vs draft vs external posting requisitions');
        console.log('  - Application status history, interviews, and referral priority coverage');
        console.log('  - Offer approvals, acceptance, and onboarding trigger');
        console.log('  - Consent placeholder via document record (schema unchanged)');
        console.log('  - Offboarding via termination and clearance checklist');
    }
    catch (error) {
        console.error('Error during seeding:', error);
        throw error;
    }
    finally {
        await app.close();
    }
}
seedRecruitment()
    .then(() => {
    console.log('Seeding process finished');
    process.exit(0);
})
    .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
//# sourceMappingURL=recruitment.seed.js.map