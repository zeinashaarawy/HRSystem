import { Connection, Model, Types } from 'mongoose';
import { employeeSigningBonus, employeeSigningBonusDocument } from './models/EmployeeSigningBonus.schema';
import { BonusStatus, BenefitStatus } from './enums/payroll-execution-enum';
import { payrollRunsDocument } from './models/payrollRuns.schema';
import { employeePayrollDetailsDocument } from './models/employeePayrollDetails.schema';
export interface SigningBonusReviewFilter {
    employeeId?: string;
    status?: BonusStatus;
}
export declare class ApproveSigningBonusDto {
    approverId?: string;
    comment?: string;
    paymentDate?: string | Date;
}
export declare class ManualOverrideSigningBonusDto {
    authorizedBy: string;
    comment?: string;
    paymentDate?: string | Date;
    status?: BonusStatus | string;
}
export interface TerminationBenefitReviewFilter {
    employeeId?: string;
    status?: BenefitStatus;
}
export declare class ApproveTerminationBenefitDto {
    approverId?: string;
    comment?: string;
}
export declare class ManualOverrideTerminationBenefitDto {
    authorizedBy: string;
    comment?: string;
    status?: BenefitStatus | string;
}
export interface PayrollRunReviewFilter {
    status?: string;
    payrollPeriod?: string;
}
export declare class ReviewPayrollRunDto {
    action: 'approve' | 'reject';
    reviewerId?: string;
    comment?: string;
    rejectionReason?: string;
}
export declare class EditPayrollRunDto {
    authorizedBy: string;
    comment?: string;
    payrollPeriod?: string | Date;
    entity?: string;
    employees?: number;
    exceptions?: number;
    totalnetpay?: number;
}
export declare class ProcessPayrollRunDto {
    payrollSpecialistId?: string;
    payrollPeriod: string | Date;
    entity: string;
}
export declare class CalculatePayrollDto {
    employeeIds?: string[];
    payrollPeriod: string | Date;
    payrollRunId?: string;
    payrollSpecialistId?: string;
    entity: string;
    includeAllowances?: boolean;
    includeInsurance?: boolean;
    includeTaxes?: boolean;
}
export interface TerminationBenefitReviewItem {
    id: string;
    employeeId: string;
    employeeName: string;
    status: BenefitStatus;
    benefitId?: string;
    benefitName?: string;
    benefitAmount?: number;
    terminationId?: string;
    terminationStatus?: string;
    hrClearanceCompleted: boolean;
    eligible: boolean;
    approvedBy?: string;
    comment?: string;
    overrideAuthorizedBy?: string;
    overrideComment?: string;
}
export interface PayrollRunReviewItem {
    id: string;
    runId: string;
    payrollPeriod: Date;
    status: string;
    entity: string;
    employees: number;
    exceptions: number;
    totalnetpay: number;
    payrollSpecialistId?: string;
    payrollManagerId?: string;
    financeStaffId?: string;
    paymentStatus: string;
    rejectionReason?: string;
    managerApprovalDate?: Date;
    financeApprovalDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface PayrollIrregularity {
    type: 'salary_spike' | 'missing_bank' | 'negative_net_pay' | 'unusual_deduction' | 'zero_salary' | 'excessive_overtime';
    severity: 'high' | 'medium' | 'low';
    employeeId: string;
    employeeName: string;
    message: string;
    currentValue?: number;
    previousValue?: number;
    threshold?: number;
}
export interface PayrollPreviewDashboard {
    payrollRunId: string;
    runId: string;
    status: string;
    payrollPeriod: Date;
    entity: string;
    summary: {
        totalEmployees: number;
        processedEmployees: number;
        exceptions: number;
        totalGrossPay: number;
        totalDeductions: number;
        totalNetPay: number;
        totalTaxes: number;
        totalInsurance: number;
    };
    irregularities: PayrollIrregularity[];
    employeeBreakdown: Array<{
        employeeId: string;
        employeeName: string;
        employeeNumber: string;
        baseSalary: number;
        allowances: number;
        grossSalary: number;
        deductions: number;
        netSalary: number;
        netPay: number;
        bankStatus: string;
        hasIrregularities: boolean;
    }>;
    approvalWorkflow: {
        currentStep: 'specialist' | 'manager' | 'finance' | 'completed';
        specialist: {
            id?: string;
            date?: Date;
            status?: string;
        };
        manager: {
            id?: string;
            date?: Date;
            status?: string;
        };
        finance: {
            id?: string;
            date?: Date;
            status?: string;
        };
    };
    canEdit: boolean;
    canApprove: boolean;
    canReject: boolean;
}
export declare class GenerateDraftPayrollDto {
    entity: string;
    payrollSpecialistId?: string;
    payrollPeriod?: string | Date;
}
export interface EscalatedIrregularity {
    irregularityId: string;
    type: string;
    severity: string;
    employeeId: string;
    employeeName: string;
    message: string;
    escalatedBy?: string;
    escalatedDate?: Date;
    resolution?: string;
    resolvedBy?: string;
    resolvedDate?: Date;
    status: 'pending' | 'resolved' | 'rejected';
}
export declare class ResolveIrregularityDto {
    irregularityId: string;
    resolution: string;
    resolvedBy: string;
    action: 'resolve' | 'reject';
}
export declare class LockPayrollDto {
    payrollManagerId: string;
    comment?: string;
}
export declare class UnlockPayrollDto {
    payrollManagerId: string;
    unlockReason: string;
    comment?: string;
}
export interface PayslipDistribution {
    payslipId: string;
    employeeId: string;
    employeeName: string;
    distributionMethod: 'email' | 'portal' | 'pdf';
    distributionDate: Date;
    status: 'sent' | 'failed' | 'pending';
    email?: string;
    downloadUrl?: string;
}
export interface SigningBonusReviewItem {
    id: string;
    employeeId: string;
    employeeName: string;
    status: BonusStatus;
    signingBonusId?: string;
    signingBonusAmount?: number;
    paymentDate: Date | null;
    eligible: boolean;
    contractId?: string;
    contractReference?: string;
    approvedBy?: string;
    comment?: string;
    overrideAuthorizedBy?: string;
    overrideComment?: string;
}
export declare class PayrollExecutionService {
    private readonly signingBonusModel;
    private readonly terminationBenefitModel;
    private readonly payrollRunModel;
    private readonly employeePayrollDetailsModel;
    private readonly employeeProfileModel;
    private readonly terminationRequestModel;
    private readonly clearanceChecklistModel;
    private readonly contractModel;
    private readonly allowanceModel;
    private readonly taxRulesModel;
    private readonly insuranceBracketsModel;
    private readonly payGradeModel;
    constructor(signingBonusModel?: Model<employeeSigningBonusDocument>, terminationBenefitModel?: Model<any>, payrollRunModel?: Model<payrollRunsDocument>, employeePayrollDetailsModel?: Model<employeePayrollDetailsDocument>, connection?: Connection);
    getProcessedSigningBonuses(filter?: SigningBonusReviewFilter): Promise<SigningBonusReviewItem[]>;
    approveSigningBonus(signingBonusId: string, dto?: ApproveSigningBonusDto): Promise<SigningBonusReviewItem>;
    manuallyOverrideSigningBonus(signingBonusId: string, dto: ManualOverrideSigningBonusDto): Promise<SigningBonusReviewItem>;
    private isContractEligible;
    private buildReviewItem;
    private extractSigningBonusDetails;
    private buildEmployeeName;
    private normalizeOverrideStatus;
    private normalizeObjectId;
    private normalizeDate;
    getProcessedTerminationBenefits(filter?: TerminationBenefitReviewFilter): Promise<TerminationBenefitReviewItem[]>;
    approveTerminationBenefit(terminationBenefitId: string, dto?: ApproveTerminationBenefitDto): Promise<TerminationBenefitReviewItem>;
    private isHrClearanceCompleted;
    private buildTerminationBenefitReviewItem;
    private extractTerminationBenefitDetails;
    manuallyOverrideTerminationBenefit(terminationBenefitId: string, dto: ManualOverrideTerminationBenefitDto): Promise<TerminationBenefitReviewItem>;
    getPayrollRunsForReview(filter?: PayrollRunReviewFilter): Promise<PayrollRunReviewItem[]>;
    reviewPayrollRun(payrollRunId: string, dto: ReviewPayrollRunDto): Promise<PayrollRunReviewItem>;
    editPayrollRun(payrollRunId: string, dto: EditPayrollRunDto): Promise<PayrollRunReviewItem>;
    processPayrollRunAutomatically(dto: ProcessPayrollRunDto): Promise<PayrollRunReviewItem>;
    private normalizeBenefitStatus;
    private buildPayrollRunReviewItem;
    private generatePayrollRunId;
    calculatePayrollAutomatically(dto: CalculatePayrollDto): Promise<PayrollRunReviewItem>;
    private validateEmployeeForPayroll;
    private calculateEmployeePayroll;
    private calculateBaseSalary;
    private getEmployeePenalties;
    private checkBankStatus;
    private logSystemAction;
    private createUnavailableModelProxy;
    handleNewHireEvent(employeeId: string, onboardingPayload?: {
        signingBonusFlag?: boolean;
        signingBonusAmount?: number;
        paymentDate?: string | Date;
    }): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, employeeSigningBonus, {}, {}> & employeeSigningBonus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    handleResignationEvent(employeeId: string, terminationId: string, opts?: {
        terminationDate?: string | Date;
    }): Promise<any[]>;
    handleTerminationEvent(employeeId: string, terminationId: string, opts?: {
        terminationDate?: string | Date;
        includeSeverance?: boolean;
    }): Promise<any[]>;
    generatePayslip(employeeId: string, payrollRunId: string): Promise<any>;
    generatePayslipsForPayrollRun(payrollRunId: string): Promise<any[]>;
    getPayslip(employeeId: string, payrollRunId: string): Promise<any>;
    getPayslipsForPayrollRun(payrollRunId: string): Promise<any[]>;
    generateDraftPayrollAutomatically(dto: GenerateDraftPayrollDto): Promise<PayrollPreviewDashboard>;
    getPayrollPreviewDashboard(payrollRunId: string): Promise<PayrollPreviewDashboard>;
    private detectPayrollIrregularities;
    private buildApprovalWorkflow;
    sendForManagerApproval(payrollRunId: string, payrollSpecialistId?: string): Promise<PayrollRunReviewItem>;
    sendForFinanceApproval(payrollRunId: string, payrollManagerId?: string): Promise<PayrollRunReviewItem>;
    finalApprovalByFinance(payrollRunId: string, financeStaffId?: string): Promise<PayrollRunReviewItem>;
    getEscalatedIrregularities(payrollRunId: string): Promise<EscalatedIrregularity[]>;
    resolveEscalatedIrregularity(dto: ResolveIrregularityDto): Promise<EscalatedIrregularity>;
    managerReviewAndApprove(payrollRunId: string, payrollManagerId: string, comment?: string): Promise<PayrollRunReviewItem>;
    lockPayroll(payrollRunId: string, dto: LockPayrollDto): Promise<PayrollRunReviewItem>;
    unlockPayroll(payrollRunId: string, dto: UnlockPayrollDto): Promise<PayrollRunReviewItem>;
    generateAndDistributePayslipsAutomatically(payrollRunId: string): Promise<PayslipDistribution[]>;
    getPayslipDistributionStatus(payrollRunId: string): Promise<PayslipDistribution[]>;
    downloadPayslipPDF(payslipId: string): Promise<any>;
    resendPayslip(payslipId: string, distributionMethod: 'email' | 'portal'): Promise<PayslipDistribution>;
}
