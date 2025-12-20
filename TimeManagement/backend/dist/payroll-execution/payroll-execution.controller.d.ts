import { ApproveSigningBonusDto, ManualOverrideSigningBonusDto, ApproveTerminationBenefitDto, ManualOverrideTerminationBenefitDto, ReviewPayrollRunDto, EditPayrollRunDto, ProcessPayrollRunDto, CalculatePayrollDto, PayrollExecutionService } from './payroll-execution.service';
export declare class PayrollExecutionController {
    private readonly payrollExecutionService;
    constructor(payrollExecutionService?: PayrollExecutionService);
    getProcessedSigningBonuses(employeeId?: string, status?: string): Promise<import("./payroll-execution.service").SigningBonusReviewItem[]>;
    approveSigningBonus(signingBonusId: string, body?: ApproveSigningBonusDto): Promise<import("./payroll-execution.service").SigningBonusReviewItem>;
    manuallyOverrideSigningBonus(signingBonusId: string, body: ManualOverrideSigningBonusDto): Promise<import("./payroll-execution.service").SigningBonusReviewItem>;
    getProcessedTerminationBenefits(employeeId?: string, status?: string): Promise<import("./payroll-execution.service").TerminationBenefitReviewItem[]>;
    approveTerminationBenefit(terminationBenefitId: string, body?: ApproveTerminationBenefitDto): Promise<import("./payroll-execution.service").TerminationBenefitReviewItem>;
    manuallyOverrideTerminationBenefit(terminationBenefitId: string, body: ManualOverrideTerminationBenefitDto): Promise<import("./payroll-execution.service").TerminationBenefitReviewItem>;
    getPayrollRunsForReview(status?: string, payrollPeriod?: string): Promise<import("./payroll-execution.service").PayrollRunReviewItem[]>;
    reviewPayrollRun(payrollRunId: string, body: ReviewPayrollRunDto): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    editPayrollRun(payrollRunId: string, body: EditPayrollRunDto): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    processPayrollRunAutomatically(body: ProcessPayrollRunDto): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    calculatePayrollAutomatically(body: CalculatePayrollDto): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    generatePayslip(body: {
        employeeId: string;
        payrollRunId: string;
    }): Promise<any>;
    generatePayslipsForPayrollRun(payrollRunId: string): Promise<any[]>;
    getPayslip(employeeId: string, payrollRunId: string): Promise<any>;
    getPayslipsForPayrollRun(payrollRunId: string): Promise<any[]>;
    generateDraftPayrollAutomatically(body: {
        entity: string;
        payrollSpecialistId?: string;
        payrollPeriod?: string;
    }): Promise<import("./payroll-execution.service").PayrollPreviewDashboard>;
    getPayrollPreviewDashboard(payrollRunId: string): Promise<import("./payroll-execution.service").PayrollPreviewDashboard>;
    sendForManagerApproval(payrollRunId: string, body: {
        payrollSpecialistId?: string;
    }): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    sendForFinanceApproval(payrollRunId: string, body: {
        payrollManagerId?: string;
    }): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    finalApprovalByFinance(payrollRunId: string, body: {
        financeStaffId?: string;
    }): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    getEscalatedIrregularities(payrollRunId: string): Promise<import("./payroll-execution.service").EscalatedIrregularity[]>;
    resolveEscalatedIrregularity(body: {
        irregularityId: string;
        resolution: string;
        resolvedBy: string;
        action: 'resolve' | 'reject';
    }): Promise<import("./payroll-execution.service").EscalatedIrregularity>;
    managerReviewAndApprove(payrollRunId: string, body: {
        payrollManagerId: string;
        comment?: string;
    }): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    lockPayroll(payrollRunId: string, body: {
        payrollManagerId: string;
        comment?: string;
    }): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    unlockPayroll(payrollRunId: string, body: {
        payrollManagerId: string;
        unlockReason: string;
        comment?: string;
    }): Promise<import("./payroll-execution.service").PayrollRunReviewItem>;
    getPayslipDistributionStatus(payrollRunId: string): Promise<import("./payroll-execution.service").PayslipDistribution[]>;
    downloadPayslipPDF(payslipId: string): Promise<any>;
    resendPayslip(payslipId: string, body: {
        distributionMethod: 'email' | 'portal';
    }): Promise<import("./payroll-execution.service").PayslipDistribution>;
    private parseStatusQuery;
    private parseBenefitStatusQuery;
    private createUnavailableServiceProxy;
}
