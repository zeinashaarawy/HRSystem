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
var PayrollSyncSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollSyncSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const payroll_service_1 = require("./payroll.service");
const mongoose_1 = require("mongoose");
let PayrollSyncSchedulerService = PayrollSyncSchedulerService_1 = class PayrollSyncSchedulerService {
    payrollService;
    logger = new common_1.Logger(PayrollSyncSchedulerService_1.name);
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async handleDailyPayrollSync() {
        this.logger.log('Starting scheduled job: Daily payroll sync...');
        try {
            const periodEnd = new Date();
            periodEnd.setHours(23, 59, 59, 999);
            const periodStart = new Date(periodEnd);
            periodStart.setDate(periodStart.getDate() - 30);
            periodStart.setHours(0, 0, 0, 0);
            const validation = await this.payrollService.validatePrePayroll(periodStart, periodEnd);
            if (!validation.isValid) {
                this.logger.warn(`Pre-payroll validation failed: ${validation.issues.join(', ')}`);
                this.logger.warn('Payroll sync skipped due to validation issues. Please resolve pending items.');
                return;
            }
            const syncResult = await this.payrollService.syncPayroll(periodStart, periodEnd, new mongoose_1.Types.ObjectId('000000000000000000000000'));
            this.logger.log(`Daily payroll sync completed. Sync ID: ${syncResult._id}`);
            this.logger.log(`Synced ${syncResult.payloadSummary?.totalRecords || 0} attendance records`);
            this.logger.log(`Total employees: ${syncResult.payloadSummary?.totalEmployees || 0}`);
        }
        catch (error) {
            this.logger.error(`Error in daily payroll sync: ${error.message}`, error.stack);
        }
    }
    async triggerSync(periodStart, periodEnd) {
        this.logger.log('Manually triggering payroll sync...');
        const start = periodStart || (() => {
            const d = new Date();
            d.setDate(d.getDate() - 30);
            d.setHours(0, 0, 0, 0);
            return d;
        })();
        const end = periodEnd || (() => {
            const d = new Date();
            d.setHours(23, 59, 59, 999);
            return d;
        })();
        return this.payrollService.syncPayroll(start, end, new mongoose_1.Types.ObjectId('000000000000000000000000'));
    }
};
exports.PayrollSyncSchedulerService = PayrollSyncSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_11PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollSyncSchedulerService.prototype, "handleDailyPayrollSync", null);
exports.PayrollSyncSchedulerService = PayrollSyncSchedulerService = PayrollSyncSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollSyncSchedulerService);
//# sourceMappingURL=payroll-sync-scheduler.service.js.map