"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RecruitmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_template_schema_1 = require("./models/job-template.schema");
const job_requisition_schema_1 = require("./models/job-requisition.schema");
const application_schema_1 = require("./models/application.schema");
const application_history_schema_1 = require("./models/application-history.schema");
const interview_schema_1 = require("./models/interview.schema");
const assessment_result_schema_1 = require("./models/assessment-result.schema");
const referral_schema_1 = require("./models/referral.schema");
const offer_schema_1 = require("./models/offer.schema");
const application_stage_enum_1 = require("./enums/application-stage.enum");
const application_status_enum_1 = require("./enums/application-status.enum");
const interview_status_enum_1 = require("./enums/interview-status.enum");
const offer_response_status_enum_1 = require("./enums/offer-response-status.enum");
const offer_final_status_enum_1 = require("./enums/offer-final-status.enum");
const approval_status_enum_1 = require("./enums/approval-status.enum");
let RecruitmentService = RecruitmentService_1 = class RecruitmentService {
    jobTemplateModel;
    jobRequisitionModel;
    applicationModel;
    applicationHistoryModel;
    interviewModel;
    assessmentResultModel;
    referralModel;
    offerModel;
    onboardingService;
    employeeProfileService;
    orgStructureService;
    logger = new common_1.Logger(RecruitmentService_1.name);
    constructor(jobTemplateModel, jobRequisitionModel, applicationModel, applicationHistoryModel, interviewModel, assessmentResultModel, referralModel, offerModel, onboardingService, employeeProfileService, orgStructureService) {
        this.jobTemplateModel = jobTemplateModel;
        this.jobRequisitionModel = jobRequisitionModel;
        this.applicationModel = applicationModel;
        this.applicationHistoryModel = applicationHistoryModel;
        this.interviewModel = interviewModel;
        this.assessmentResultModel = assessmentResultModel;
        this.referralModel = referralModel;
        this.offerModel = offerModel;
        this.onboardingService = onboardingService;
        this.employeeProfileService = employeeProfileService;
        this.orgStructureService = orgStructureService;
    }
    async createJobTemplate(dto) {
        this.logger.log(`Creating job template: ${dto.title}`);
        if (!dto.title || !dto.department) {
            throw new common_1.BadRequestException('Job title and department are required (BR2)');
        }
        if (!dto.qualifications || dto.qualifications.length === 0) {
            throw new common_1.BadRequestException('Qualifications are required (BR2)');
        }
        if (!dto.skills || dto.skills.length === 0) {
            throw new common_1.BadRequestException('Skills are required (BR2)');
        }
        const template = new this.jobTemplateModel(dto);
        await template.save();
        this.logger.log(`Job template created with ID: ${template._id}`);
        return template;
    }
    async findAllJobTemplates() {
        return this.jobTemplateModel.find().exec();
    }
    async findJobTemplateById(id) {
        const template = await this.jobTemplateModel.findById(id).exec();
        if (!template) {
            throw new common_1.NotFoundException(`Job template with ID ${id} not found`);
        }
        return template;
    }
    async updateJobTemplate(id, dto) {
        const template = await this.jobTemplateModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!template) {
            throw new common_1.NotFoundException(`Job template with ID ${id} not found`);
        }
        this.logger.log(`Job template ${id} updated`);
        return template;
    }
    async deleteJobTemplate(id) {
        const result = await this.jobTemplateModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Job template with ID ${id} not found`);
        }
        this.logger.log(`Job template ${id} deleted`);
    }
    async createJobRequisition(dto) {
        this.logger.log(`Creating job requisition: ${dto.requisitionId}`);
        if (dto.openings < 1) {
            throw new common_1.BadRequestException('Number of openings must be at least 1 (BR2)');
        }
        if (dto.templateId) {
            await this.findJobTemplateById(dto.templateId);
        }
        const requisition = new this.jobRequisitionModel(dto);
        await requisition.save();
        this.logger.log(`Job requisition created with ID: ${requisition._id}`);
        return requisition;
    }
    async publishJobRequisition(id) {
        const requisition = await this.jobRequisitionModel.findById(id).exec();
        if (!requisition) {
            throw new common_1.NotFoundException(`Job requisition with ID ${id} not found`);
        }
        if (requisition.publishStatus === 'published') {
            throw new common_1.BadRequestException('Job requisition already published');
        }
        requisition.publishStatus = 'published';
        requisition.postingDate = new Date();
        await requisition.save();
        this.logger.log(`Job requisition ${id} published to career sites (BR6)`);
        return requisition;
    }
    async findAllJobRequisitions() {
        return this.jobRequisitionModel.find().populate('templateId').exec();
    }
    async findJobRequisitionById(id) {
        const requisition = await this.jobRequisitionModel
            .findById(id)
            .populate('templateId')
            .exec();
        if (!requisition) {
            throw new common_1.NotFoundException(`Job requisition with ID ${id} not found`);
        }
        return requisition;
    }
    async updateJobRequisition(id, dto) {
        const requisition = await this.jobRequisitionModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!requisition) {
            throw new common_1.NotFoundException(`Job requisition with ID ${id} not found`);
        }
        this.logger.log(`Job requisition ${id} updated`);
        return requisition;
    }
    async createApplication(dto) {
        this.logger.log(`Creating application for candidate: ${dto.candidateId}`);
        if (!dto.consentGiven) {
            throw new common_1.BadRequestException('Candidate consent is required for data processing (BR28)');
        }
        await this.findJobRequisitionById(dto.requisitionId);
        const application = new this.applicationModel({
            candidateId: new mongoose_2.Types.ObjectId(dto.candidateId),
            requisitionId: new mongoose_2.Types.ObjectId(dto.requisitionId),
            assignedHr: dto.assignedHr
                ? new mongoose_2.Types.ObjectId(dto.assignedHr)
                : undefined,
            currentStage: dto.currentStage || application_stage_enum_1.ApplicationStage.SCREENING,
            status: dto.status || application_status_enum_1.ApplicationStatus.SUBMITTED,
        });
        await application.save();
        if (dto.isReferral && dto.referredBy) {
            await this.createReferral({
                referringEmployeeId: dto.referredBy,
                candidateId: dto.candidateId,
            });
            this.logger.log(`Application tagged as referral (BR14)`);
        }
        await this.createApplicationHistory(application._id.toString(), null, application.currentStage, null, application.status, dto.assignedHr || 'system');
        this.logger.log(`Application created with ID: ${application._id} (BR12)`);
        return application;
    }
    async updateApplicationStatus(id, dto, changedBy) {
        const application = await this.applicationModel.findById(id).exec();
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        const oldStage = application.currentStage;
        const oldStatus = application.status;
        if (dto.currentStage) {
            application.currentStage = dto.currentStage;
        }
        if (dto.status) {
            application.status = dto.status;
        }
        await application.save();
        await this.createApplicationHistory(id, oldStage, application.currentStage, oldStatus, application.status, changedBy);
        await this.triggerStatusChangeNotifications(application, oldStatus, dto.comment);
        this.logger.log(`Application ${id} status updated from ${oldStatus} to ${application.status} (BR9)`);
        return application;
    }
    async getApplicationHistory(applicationId) {
        return this.applicationHistoryModel
            .find({ applicationId: new mongoose_2.Types.ObjectId(applicationId) })
            .sort({ createdAt: 1 })
            .exec();
    }
    async findAllApplications(filters) {
        try {
            const applications = await this.applicationModel
                .find(filters || {})
                .populate({
                path: 'candidateId',
                select: '_id',
                strictPopulate: false,
            })
                .populate({
                path: 'requisitionId',
                select: '_id requisitionId title openings location',
                strictPopulate: false,
            })
                .exec();
            return applications;
        }
        catch (error) {
            this.logger.error(`Error fetching applications: ${error.message}`);
            return await this.applicationModel.find(filters || {}).exec();
        }
    }
    async findApplicationById(id) {
        try {
            const application = await this.applicationModel
                .findById(id)
                .populate({
                path: 'candidateId',
                strictPopulate: false,
            })
                .populate({
                path: 'requisitionId',
                strictPopulate: false,
            })
                .exec();
            if (!application) {
                throw new common_1.NotFoundException(`Application with ID ${id} not found`);
            }
            return application;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            const application = await this.applicationModel.findById(id).exec();
            if (!application) {
                throw new common_1.NotFoundException(`Application with ID ${id} not found`);
            }
            return application;
        }
    }
    async scheduleInterview(dto) {
        this.logger.log(`Scheduling interview for application: ${dto.applicationId}`);
        const application = await this.findApplicationById(dto.applicationId);
        if (!dto.panel || dto.panel.length === 0) {
            throw new common_1.BadRequestException('At least one panel member is required (BR19)');
        }
        const interview = new this.interviewModel({
            applicationId: new mongoose_2.Types.ObjectId(dto.applicationId),
            stage: dto.stage,
            scheduledDate: dto.scheduledDate,
            method: dto.method,
            panel: dto.panel.map((id) => new mongoose_2.Types.ObjectId(id)),
            videoLink: dto.videoLink,
            calendarEventId: dto.calendarEventId,
            status: interview_status_enum_1.InterviewStatus.SCHEDULED,
        });
        await interview.save();
        await this.sendInterviewInvites(interview, 'panel');
        await this.sendInterviewInvites(interview, 'candidate');
        this.logger.log(`Interview scheduled with ID: ${interview._id} (BR19)`);
        return interview;
    }
    async submitInterviewFeedback(dto) {
        this.logger.log(`Submitting feedback for interview: ${dto.interviewId}`);
        const interview = await this.interviewModel
            .findById(dto.interviewId)
            .exec();
        if (!interview) {
            throw new common_1.NotFoundException(`Interview with ID ${dto.interviewId} not found`);
        }
        const isInPanel = interview.panel.some((panelMember) => panelMember.toString() === dto.interviewerId);
        if (!isInPanel) {
            throw new common_1.BadRequestException('Only panel members can submit feedback (BR22)');
        }
        const assessmentResult = new this.assessmentResultModel({
            interviewId: new mongoose_2.Types.ObjectId(dto.interviewId),
            interviewerId: new mongoose_2.Types.ObjectId(dto.interviewerId),
            score: dto.overallScore,
            comments: dto.comments,
        });
        await assessmentResult.save();
        const allFeedback = await this.assessmentResultModel
            .find({ interviewId: interview._id })
            .exec();
        if (allFeedback.length === interview.panel.length) {
            interview.status = interview_status_enum_1.InterviewStatus.COMPLETED;
            interview.feedbackId = assessmentResult._id;
            await interview.save();
            this.logger.log(`All panel feedback received for interview ${dto.interviewId} (BR22)`);
        }
        this.logger.log(`Interview feedback submitted (BR10, BR21, BR23)`);
        return assessmentResult;
    }
    async findInterviewsByApplication(applicationId) {
        return this.interviewModel
            .find({ applicationId: new mongoose_2.Types.ObjectId(applicationId) })
            .populate('panel')
            .exec();
    }
    async findInterviewById(id) {
        const interview = await this.interviewModel
            .findById(id)
            .populate('applicationId')
            .populate('panel')
            .exec();
        if (!interview) {
            throw new common_1.NotFoundException(`Interview with ID ${id} not found`);
        }
        return interview;
    }
    async createReferral(dto) {
        this.logger.log(`Creating referral for candidate: ${dto.candidateId}`);
        const referral = new this.referralModel({
            referringEmployeeId: new mongoose_2.Types.ObjectId(dto.referringEmployeeId),
            candidateId: new mongoose_2.Types.ObjectId(dto.candidateId),
            role: dto.role,
            level: dto.level,
        });
        await referral.save();
        this.logger.log(`Referral created - candidate gets priority (BR14, BR25)`);
        return referral;
    }
    async findReferralsByCandidate(candidateId) {
        try {
            const referrals = await this.referralModel
                .find({ candidateId: new mongoose_2.Types.ObjectId(candidateId) })
                .populate({
                path: 'referringEmployeeId',
                select: '_id name email',
                strictPopulate: false,
            })
                .exec();
            return referrals;
        }
        catch (error) {
            if (error.message?.includes("Schema hasn't been registered")) {
                this.logger.debug(`User model not registered, returning referrals without populate`);
            }
            else {
                this.logger.error(`Error fetching referrals: ${error.message}`);
            }
            return await this.referralModel
                .find({ candidateId: new mongoose_2.Types.ObjectId(candidateId) })
                .exec();
        }
    }
    async createOffer(dto) {
        this.logger.log(`Creating offer for application: ${dto.applicationId}`);
        const application = await this.findApplicationById(dto.applicationId);
        if (application.status !== application_status_enum_1.ApplicationStatus.OFFER) {
            throw new common_1.BadRequestException('Application must be at offer stage');
        }
        const offer = new this.offerModel({
            applicationId: new mongoose_2.Types.ObjectId(dto.applicationId),
            candidateId: new mongoose_2.Types.ObjectId(dto.candidateId),
            hrEmployeeId: dto.hrEmployeeId
                ? new mongoose_2.Types.ObjectId(dto.hrEmployeeId)
                : undefined,
            grossSalary: dto.grossSalary,
            signingBonus: dto.signingBonus,
            benefits: dto.benefits,
            conditions: dto.conditions,
            insurances: dto.insurances,
            content: dto.content,
            role: dto.role,
            deadline: dto.deadline,
            applicantResponse: offer_response_status_enum_1.OfferResponseStatus.PENDING,
            finalStatus: offer_final_status_enum_1.OfferFinalStatus.PENDING,
            approvers: [],
        });
        await offer.save();
        this.logger.log(`Offer created with ID: ${offer._id} (BR26)`);
        return offer;
    }
    async approveOffer(offerId, dto) {
        const offer = await this.offerModel.findById(offerId).exec();
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID ${offerId} not found`);
        }
        offer.approvers.push({
            employeeId: new mongoose_2.Types.ObjectId(dto.employeeId),
            role: dto.role,
            status: dto.status,
            actionDate: new Date(),
            comment: dto.comment,
        });
        const allApproved = offer.approvers.every((approver) => approver.status === approval_status_enum_1.ApprovalStatus.APPROVED);
        if (allApproved && offer.approvers.length >= 2) {
            offer.finalStatus = offer_final_status_enum_1.OfferFinalStatus.APPROVED;
            this.logger.log(`Offer ${offerId} fully approved - ready to send (BR26b)`);
        }
        await offer.save();
        return offer;
    }
    async respondToOffer(offerId, dto) {
        const offer = await this.offerModel.findById(offerId).exec();
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID ${offerId} not found`);
        }
        offer.applicantResponse = dto.response;
        if (dto.response === offer_response_status_enum_1.OfferResponseStatus.ACCEPTED) {
            offer.finalStatus = offer_final_status_enum_1.OfferFinalStatus.APPROVED;
            offer.candidateSignedAt = new Date();
            await this.triggerOnboarding(offer);
            await this.updateApplicationStatus(offer.applicationId.toString(), { status: application_status_enum_1.ApplicationStatus.HIRED }, 'system');
            this.logger.log(`Offer accepted - onboarding triggered (BR26c)`);
        }
        else if (dto.response === offer_response_status_enum_1.OfferResponseStatus.REJECTED) {
            offer.finalStatus = offer_final_status_enum_1.OfferFinalStatus.REJECTED;
        }
        await offer.save();
        this.logger.log(`Offer response logged (BR37)`);
        return offer;
    }
    async findOfferById(id) {
        const offer = await this.offerModel
            .findById(id)
            .populate('applicationId')
            .populate('candidateId')
            .exec();
        if (!offer) {
            throw new common_1.NotFoundException(`Offer with ID ${id} not found`);
        }
        return offer;
    }
    async sendRejectionNotification(applicationId, template) {
        const application = await this.findApplicationById(applicationId);
        await this.updateApplicationStatus(applicationId, { status: application_status_enum_1.ApplicationStatus.REJECTED, reason: template.reason }, 'system');
        this.logger.log(`Rejection notification sent to candidate (BR36)`);
        this.logger.log(`Rejection communication logged (BR37)`);
    }
    async getRecruitmentAnalytics(query) {
        this.logger.log('Generating recruitment analytics (BR33)');
        const filters = {};
        if (query.startDate || query.endDate) {
            filters.createdAt = {};
            if (query.startDate)
                filters.createdAt.$gte = query.startDate;
            if (query.endDate)
                filters.createdAt.$lte = query.endDate;
        }
        if (query.requisitionId) {
            filters.requisitionId = new mongoose_2.Types.ObjectId(query.requisitionId);
        }
        if (query.status) {
            filters.status = query.status;
        }
        const applications = await this.applicationModel.find(filters).exec();
        const analytics = {
            totalApplications: applications.length,
            byStatus: this.groupByStatus(applications),
            byStage: this.groupByStage(applications),
            averageTimeToHire: await this.calculateAverageTimeToHire(applications),
            conversionRates: this.calculateConversionRates(applications),
            referralStats: await this.getReferralStats(applications),
        };
        this.logger.log(`Analytics generated for ${applications.length} applications (BR33)`);
        return analytics;
    }
    async createApplicationHistory(applicationId, oldStage, newStage, oldStatus, newStatus, changedBy) {
        let changedById;
        try {
            changedById = new mongoose_2.Types.ObjectId(changedBy);
        }
        catch (error) {
            changedById = new mongoose_2.Types.ObjectId('000000000000000000000000');
        }
        const history = new this.applicationHistoryModel({
            applicationId: new mongoose_2.Types.ObjectId(applicationId),
            oldStage: oldStage || 'none',
            newStage,
            oldStatus: oldStatus || 'none',
            newStatus,
            changedBy: changedById,
        });
        await history.save();
        return history;
    }
    async triggerStatusChangeNotifications(application, oldStatus, comment) {
        this.logger.log(`Status change notification triggered: ${oldStatus} -> ${application.status} (BR11, BR27, BR36)`);
    }
    async sendInterviewInvites(interview, recipient) {
        this.logger.log(`Interview invite sent to ${recipient} (BR19)`);
    }
    async triggerOnboarding(offer) {
        this.logger.log(`Onboarding triggered for candidate ${offer.candidateId} (BR26c)`);
        const application = await this.applicationModel
            .findById(offer.applicationId)
            .exec();
        if (!application) {
            this.logger.warn(`Application ${offer.applicationId} not found for onboarding trigger`);
            return;
        }
        const requisition = await this.jobRequisitionModel
            .findById(application.requisitionId)
            .exec();
        let department = 'Unknown';
        let role = offer.role || 'Unknown';
        if (requisition?.templateId) {
            const template = await this.jobTemplateModel
                .findById(requisition.templateId)
                .exec();
            if (template) {
                department = template.department || 'Unknown';
                role = offer.role || template.title || 'Unknown';
            }
        }
        if (this.orgStructureService) {
            const isValid = await this.orgStructureService.validateDepartment(department);
            if (!isValid) {
                this.logger.warn(`Department ${department} not found in organization structure`);
            }
        }
        let employeeId;
        if (this.employeeProfileService) {
            try {
                const result = await this.employeeProfileService.createEmployeeFromCandidate(offer.candidateId.toString(), {
                    fullName: 'Candidate',
                    email: 'candidate@example.com',
                    role: role,
                    department: department,
                    startDate: new Date(),
                });
                employeeId = result.employeeId;
                this.logger.log(`Employee profile created: ${employeeId}`);
            }
            catch (error) {
                this.logger.error(`Failed to create employee profile: ${error.message}`);
            }
        }
        if (this.onboardingService) {
            try {
                const offerId = offer._id?.toString() || offer.candidateId.toString();
                const onboardingResult = await this.onboardingService.triggerOnboarding(offer.candidateId.toString(), offerId, {
                    role: role,
                    department: department,
                    grossSalary: offer.grossSalary,
                    startDate: new Date(),
                });
                this.logger.log(`Onboarding workflow triggered: ${onboardingResult.onboardingId}`);
                this.logger.log(`Onboarding tasks created: ${onboardingResult.tasks.length}`);
            }
            catch (error) {
                this.logger.error(`Failed to trigger onboarding: ${error.message}`);
            }
        }
        else {
            this.logger.warn('Onboarding service not available - onboarding not triggered');
        }
    }
    groupByStatus(applications) {
        return applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});
    }
    groupByStage(applications) {
        return applications.reduce((acc, app) => {
            acc[app.currentStage] = (acc[app.currentStage] || 0) + 1;
            return acc;
        }, {});
    }
    async calculateAverageTimeToHire(applications) {
        const hiredApps = applications.filter((app) => app.status === application_status_enum_1.ApplicationStatus.HIRED);
        if (hiredApps.length === 0)
            return 0;
        let totalDays = 0;
        for (const app of hiredApps) {
            const history = await this.getApplicationHistory(app._id.toString());
            if (history.length > 0) {
                const firstEntry = history[0];
                const lastEntry = history[history.length - 1];
                const days = Math.ceil((lastEntry.createdAt.getTime() - firstEntry.createdAt.getTime()) /
                    (1000 * 60 * 60 * 24));
                totalDays += days;
            }
        }
        return Math.round(totalDays / hiredApps.length);
    }
    calculateConversionRates(applications) {
        const total = applications.length;
        if (total === 0)
            return {};
        return {
            screeningToInterview: this.calculateStageConversion(applications, application_stage_enum_1.ApplicationStage.SCREENING, application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW),
            interviewToOffer: this.calculateStageConversion(applications, application_stage_enum_1.ApplicationStage.DEPARTMENT_INTERVIEW, application_stage_enum_1.ApplicationStage.OFFER),
            offerToHired: (applications.filter((a) => a.status === application_status_enum_1.ApplicationStatus.HIRED)
                .length /
                total) *
                100,
        };
    }
    calculateStageConversion(applications, fromStage, toStage) {
        const atFromStage = applications.filter((a) => a.currentStage === fromStage).length;
        const reachedToStage = applications.filter((a) => a.currentStage === toStage ||
            a.currentStage > toStage).length;
        return atFromStage > 0 ? (reachedToStage / atFromStage) * 100 : 0;
    }
    async getReferralStats(applications) {
        const candidateIds = applications.map((a) => a.candidateId);
        const referrals = await this.referralModel
            .find({ candidateId: { $in: candidateIds } })
            .exec();
        return {
            totalReferrals: referrals.length,
            referralPercentage: (referrals.length / applications.length) * 100,
        };
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = RecruitmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_template_schema_1.JobTemplate.name)),
    __param(1, (0, mongoose_1.InjectModel)(job_requisition_schema_1.JobRequisition.name)),
    __param(2, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __param(3, (0, mongoose_1.InjectModel)(application_history_schema_1.ApplicationStatusHistory.name)),
    __param(4, (0, mongoose_1.InjectModel)(interview_schema_1.Interview.name)),
    __param(5, (0, mongoose_1.InjectModel)(assessment_result_schema_1.AssessmentResult.name)),
    __param(6, (0, mongoose_1.InjectModel)(referral_schema_1.Referral.name)),
    __param(7, (0, mongoose_1.InjectModel)(offer_schema_1.Offer.name)),
    __param(8, (0, common_1.Optional)()),
    __param(8, (0, common_1.Inject)('IOnboardingService')),
    __param(9, (0, common_1.Optional)()),
    __param(9, (0, common_1.Inject)('IEmployeeProfileService')),
    __param(10, (0, common_1.Optional)()),
    __param(10, (0, common_1.Inject)('IOrganizationStructureService')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object, Object, Object])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map