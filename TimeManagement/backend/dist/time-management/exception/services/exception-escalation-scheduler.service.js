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
var ExceptionEscalationSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionEscalationSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const time_exception_schema_1 = require("../../attendance/schemas/time-exception.schema");
const index_1 = require("../../enums/index");
const time_management_service_1 = require("../../time-management.service");
let ExceptionEscalationSchedulerService = ExceptionEscalationSchedulerService_1 = class ExceptionEscalationSchedulerService {
    exceptionModel;
    timeManagementService;
    logger = new common_1.Logger(ExceptionEscalationSchedulerService_1.name);
    constructor(exceptionModel, timeManagementService) {
        this.exceptionModel = exceptionModel;
        this.timeManagementService = timeManagementService;
    }
    async handleAutoEscalation() {
        this.logger.log('Starting scheduled job: Auto-escalating old exceptions...');
        try {
            const deadline = new Date();
            deadline.setHours(deadline.getHours() - 48);
            const oldExceptions = await this.exceptionModel
                .find({
                status: {
                    $in: [index_1.TimeExceptionStatus.OPEN, index_1.TimeExceptionStatus.PENDING],
                },
                createdAt: { $lt: deadline },
            })
                .exec();
            let escalatedCount = 0;
            for (const exception of oldExceptions) {
                try {
                    let hrAdminId = null;
                    if (exception.assignedTo) {
                        hrAdminId = exception.assignedTo instanceof mongoose_2.Types.ObjectId
                            ? exception.assignedTo.toString()
                            : String(exception.assignedTo);
                    }
                    else {
                        hrAdminId = '000000000000000000000000';
                        this.logger.warn(`No HR Admin found by role for exception ${exception._id}, using default. ` +
                            `TODO: Integrate EmployeeSystemRole model to find actual HR Admin users.`);
                    }
                    if (!hrAdminId) {
                        this.logger.error(`Cannot escalate exception ${exception._id}: No HR Admin ID available`);
                        continue;
                    }
                    await this.timeManagementService.escalateException(exception._id.toString(), hrAdminId, 'Auto-escalated: No action taken within 48 hours');
                    escalatedCount++;
                    this.logger.log(`Escalated exception ${exception._id} to HR Admin`);
                }
                catch (error) {
                    this.logger.error(`Error escalating exception ${exception._id}: ${error.message}`);
                }
            }
            if (escalatedCount > 0) {
                this.logger.log(`Auto-escalated ${escalatedCount} exception(s) to HR Admin`);
            }
            else {
                this.logger.log('No exceptions needed escalation');
            }
        }
        catch (error) {
            this.logger.error(`Error in auto-escalation job: ${error.message}`, error.stack);
        }
    }
    async triggerEscalation() {
        this.logger.log('Manually triggering exception escalation...');
        await this.handleAutoEscalation();
        return 0;
    }
};
exports.ExceptionEscalationSchedulerService = ExceptionEscalationSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExceptionEscalationSchedulerService.prototype, "handleAutoEscalation", null);
exports.ExceptionEscalationSchedulerService = ExceptionEscalationSchedulerService = ExceptionEscalationSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(time_exception_schema_1.TimeException.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        time_management_service_1.TimeManagementService])
], ExceptionEscalationSchedulerService);
//# sourceMappingURL=exception-escalation-scheduler.service.js.map