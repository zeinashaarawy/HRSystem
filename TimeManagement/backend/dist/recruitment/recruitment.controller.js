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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const recruitment_service_1 = require("./recruitment.service");
const dto_1 = require("./dto");
const common_2 = require("@nestjs/common");
let RecruitmentController = class RecruitmentController {
    recruitmentService;
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    getApiInfo() {
        return {
            message: 'HR Recruitment, Onboarding & Offboarding API',
            version: '1.0',
            documentation: '/api',
            endpoints: {
                templates: '/templates',
                jobs: '/jobs',
                applications: '/applications',
                interviews: '/interviews',
                referrals: '/referrals',
                offers: '/offers',
                analytics: '/analytics/recruitment',
                consent: '/consent',
            },
        };
    }
    async createJobTemplate(dto) {
        return this.recruitmentService.createJobTemplate(dto);
    }
    async getAllTemplates() {
        return this.recruitmentService.findAllJobTemplates();
    }
    async getTemplate(id) {
        return this.recruitmentService.findJobTemplateById(id);
    }
    async updateTemplate(id, dto) {
        return this.recruitmentService.updateJobTemplate(id, dto);
    }
    async deleteTemplate(id) {
        return this.recruitmentService.deleteJobTemplate(id);
    }
    async createJob(dto) {
        return this.recruitmentService.createJobRequisition(dto);
    }
    async listJobs() {
        return this.recruitmentService.findAllJobRequisitions();
    }
    async getJob(id) {
        return this.recruitmentService.findJobRequisitionById(id);
    }
    async publishJob(id) {
        return this.recruitmentService.publishJobRequisition(id);
    }
    async updateJob(id, dto) {
        return this.recruitmentService.updateJobRequisition(id, dto);
    }
    async apply(dto) {
        return this.recruitmentService.createApplication(dto);
    }
    async getAllApplications() {
        return this.recruitmentService.findAllApplications();
    }
    async getApplication(id) {
        return this.recruitmentService.findApplicationById(id);
    }
    async getStatus(id) {
        const application = await this.recruitmentService.findApplicationById(id);
        const history = await this.recruitmentService.getApplicationHistory(id);
        return {
            application,
            history,
        };
    }
    async updateStatus(id, dto) {
        const changedBy = 'system';
        return this.recruitmentService.updateApplicationStatus(id, dto, changedBy);
    }
    async notifyCandidate(id, template) {
        await this.recruitmentService.sendRejectionNotification(id, template);
        return {
            message: 'Rejection notification sent successfully',
            applicationId: id,
        };
    }
    async scheduleInterview(dto) {
        return this.recruitmentService.scheduleInterview(dto);
    }
    async getInterviews(applicationId) {
        if (!applicationId) {
            return { message: 'applicationId query parameter is required' };
        }
        return this.recruitmentService.findInterviewsByApplication(applicationId);
    }
    async getInterview(id) {
        return this.recruitmentService.findInterviewById(id);
    }
    async submitFeedback(interviewId, dto) {
        const feedbackDto = {
            ...dto,
            interviewId,
        };
        return this.recruitmentService.submitInterviewFeedback(feedbackDto);
    }
    async tagReferral(dto) {
        return this.recruitmentService.createReferral(dto);
    }
    async getReferrals(candidateId) {
        if (!candidateId) {
            return { message: 'candidateId query parameter is required' };
        }
        return this.recruitmentService.findReferralsByCandidate(candidateId);
    }
    async createOffer(dto) {
        return this.recruitmentService.createOffer(dto);
    }
    async getOffer(id) {
        return this.recruitmentService.findOfferById(id);
    }
    async approveOffer(id, dto) {
        return this.recruitmentService.approveOffer(id, dto);
    }
    async acceptOffer(id, dto) {
        return this.recruitmentService.respondToOffer(id, dto);
    }
    async getRecruitmentAnalytics(query) {
        return this.recruitmentService.getRecruitmentAnalytics(query);
    }
    async saveConsent(dto) {
        if (!dto.consentGiven) {
            return {
                message: 'Consent is required for data processing (BR28)',
            };
        }
        return { message: 'Consent saved successfully', consent: dto };
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'API Information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'API information and available endpoints',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecruitmentController.prototype, "getApiInfo", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create job template (REC-003)',
        description: 'HR Manager defines standardized job description templates. BR2: Must include title, department, qualifications, and skills.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Job template created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed (BR2)' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Post)('templates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateJobTemplateDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createJobTemplate", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job templates (REC-003)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of job templates' }),
    (0, common_1.Get)('templates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getAllTemplates", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get job template by ID (REC-003)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job template found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    (0, common_1.Get)('templates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getTemplate", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Update job template (REC-003)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Put)('templates/:id'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateJobTemplateDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateTemplate", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete job template (REC-003)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job template ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Template deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Delete)('templates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "deleteTemplate", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create job requisition (REC-003, REC-004)',
        description: 'Create a job requisition using a template. BR2: Must include job details and qualifications. BR9: Applications tracked through stages.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Job requisition created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Post)('jobs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateJobRequisitionDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createJob", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'List all job requisitions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of job requisitions' }),
    (0, common_1.Get)('jobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "listJobs", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get job requisition by ID',
        description: 'Get a single job/requisition (preview for careers page)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job requisition ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job requisition found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    (0, common_1.Get)('jobs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getJob", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Publish job to career sites (REC-023)',
        description: 'Preview and publish jobs on company careers page. BR6: Automatic posting to internal and external career sites.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job requisition ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job published successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Job already published' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Post)('jobs/:id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "publishJob", null);
__decorate([
    (0, swagger_1.ApiTags)('jobs'),
    (0, swagger_1.ApiOperation)({ summary: 'Update job requisition' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Job requisition ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Job updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Job not found' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Put)('jobs/:id'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateJobRequisitionDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateJob", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Apply to a job (REC-007, REC-028)',
        description: 'Candidate uploads CV and applies for position. BR12: Creates talent pool. BR28: Consent required for data processing.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Application created successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validation failed or consent not given (BR28)',
    }),
    (0, common_1.Post)('applications'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateApplicationDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "apply", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all applications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of applications' }),
    (0, common_1.Get)('applications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getAllApplications", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get application by ID',
        description: 'Get application details including status and history',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found' }),
    (0, common_1.Get)('applications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getApplication", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get application status and history (REC-017, REC-008)',
        description: 'Get status of an application with tracking history. BR27: Real-time status tracking.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Application status and history',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found' }),
    (0, common_1.Get)('applications/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getStatus", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update application status (REC-008, REC-022)',
        description: 'Update status of an application. BR9: Track through defined stages. BR11: Triggers notifications.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateApplicationStatusDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Status updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found' }),
    (0, common_1.Post)('applications/:id/status'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateApplicationStatusDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send rejection notification (REC-022)',
        description: 'Send automated rejection notification to candidate. BR36: Automated alerts/emails. BR37: Communication logs stored.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RejectionTemplateDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Rejection notification sent',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found' }),
    (0, common_1.Post)('applications/:id/reject'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.RejectionTemplateDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "notifyCandidate", null);
__decorate([
    (0, swagger_1.ApiTags)('interviews'),
    (0, swagger_1.ApiOperation)({
        summary: 'Schedule interview (REC-010, REC-021)',
        description: 'Schedule and manage interview invitations. BR19: Select time slots, panel members, modes. Automatic calendar invites and candidate notifications.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Interview scheduled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed (BR19)' }),
    (0, common_1.Post)('interviews'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ScheduleInterviewDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "scheduleInterview", null);
__decorate([
    (0, swagger_1.ApiTags)('interviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all interviews for an application' }),
    (0, swagger_1.ApiQuery)({
        name: 'applicationId',
        required: true,
        description: 'Application ID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of interviews' }),
    (0, common_1.Get)('interviews'),
    __param(0, (0, common_1.Query)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getInterviews", null);
__decorate([
    (0, swagger_1.ApiTags)('interviews'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get interview details (REC-010, REC-021)',
        description: 'Get interview details including panel members and schedule',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Interview ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Interview found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Interview not found' }),
    (0, common_1.Get)('interviews/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getInterview", null);
__decorate([
    (0, swagger_1.ApiTags)('interviews'),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit interview feedback (REC-011, REC-020)',
        description: 'Submit feedback/interview score. BR10: Comments and ratings. BR22: Only panel members can submit. BR21/BR23: Structured assessment.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Interview ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.SubmitInterviewFeedbackDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Feedback submitted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Interviewer not in panel (BR22)',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Interview not found' }),
    (0, common_1.Post)('interviews/:id/feedback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SubmitInterviewFeedbackDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "submitFeedback", null);
__decorate([
    (0, swagger_1.ApiTags)('recruitment'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tag candidate as referral (REC-030)',
        description: 'Tag candidates as referrals for priority screening. BR14: Rule-based filters. BR25: Tie-breaking rules.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Candidate tagged as referral' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed' }),
    (0, common_1.Post)('referrals'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateReferralDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "tagReferral", null);
__decorate([
    (0, swagger_1.ApiTags)('recruitment'),
    (0, swagger_1.ApiOperation)({ summary: 'Get referrals by candidate' }),
    (0, swagger_1.ApiQuery)({
        name: 'candidateId',
        required: true,
        description: 'Candidate ID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of referrals' }),
    (0, common_1.Get)('referrals'),
    __param(0, (0, common_1.Query)('candidateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getReferrals", null);
__decorate([
    (0, swagger_1.ApiTags)('offers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create offer letter (REC-014, REC-018)',
        description: 'Generate and send offer letter. BR26(a): Customizable and editable. BR26(b): Requires approvals before sending.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Offer created successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Application not at offer stage',
    }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Post)('offers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOfferDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createOffer", null);
__decorate([
    (0, swagger_1.ApiTags)('offers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get offer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Offer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Offer found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Offer not found' }),
    (0, common_1.Get)('offers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getOffer", null);
__decorate([
    (0, swagger_1.ApiTags)('offers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Approve offer (REC-014)',
        description: 'Approve offer by authorized party. BR26(b): Multi-party approval workflow.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Offer ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.ApproveOfferDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Offer approved' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Offer not found' }),
    (0, roles_decorator_1.Roles)('hr_manager'),
    (0, common_1.Post)('offers/:id/approve'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ApproveOfferDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "approveOffer", null);
__decorate([
    (0, swagger_1.ApiTags)('offers'),
    (0, swagger_1.ApiOperation)({
        summary: 'Accept offer and trigger onboarding (REC-018, REC-029)',
        description: 'Candidate accepts offer. BR26(c): Triggers onboarding. BR26(d)/BR37: Communication logs stored.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Offer ID' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RespondOfferDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Offer accepted, onboarding triggered',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Offer not found' }),
    (0, common_1.Post)('offers/:id/accept'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.RespondOfferDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "acceptOffer", null);
__decorate([
    (0, swagger_1.ApiTags)('analytics'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get recruitment analytics (REC-009)',
        description: 'Monitor recruitment progress across all open positions. BR33: Multiple reports (time-to-hire, source effectiveness).',
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'requisitionId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['submitted', 'in_process', 'offer', 'hired', 'rejected'],
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Analytics data' }),
    (0, common_1.Get)('analytics/recruitment'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AnalyticsQueryDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getRecruitmentAnalytics", null);
__decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Save candidate consent (REC-028)',
        description: 'Save consent for personal-data processing and background checks. BR28: Required for GDPR compliance.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Consent saved' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Consent is required (BR28)',
    }),
    (0, common_1.Post)('consent'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "saveConsent", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map