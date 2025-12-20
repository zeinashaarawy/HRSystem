import { PayrollService } from './payroll.service';
export declare class PayrollSyncSchedulerService {
    private readonly payrollService;
    private readonly logger;
    constructor(payrollService: PayrollService);
    handleDailyPayrollSync(): Promise<void>;
    triggerSync(periodStart?: Date, periodEnd?: Date): Promise<any>;
}
