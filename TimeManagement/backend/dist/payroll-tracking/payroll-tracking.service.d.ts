import { Model } from 'mongoose';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimStatusDto } from './dto/update-claim-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeStatusDto } from './dto/update-dispute-status.dto';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundStatusDto } from './dto/update-refund-status.dto';
import { paySlip, PayslipDocument } from '../payroll-execution/models/payslip.schema';
import { payrollRunsDocument } from '../payroll-execution/models/payrollRuns.schema';
import { employeePayrollDetailsDocument } from '../payroll-execution/models/employeePayrollDetails.schema';
import { claims, claimsDocument } from './models/claims.schema';
import { disputes, disputesDocument } from './models/disputes.schema';
import { refunds, refundsDocument } from './models/refunds.schema';
export declare class PayrollTrackingService {
    private readonly claimModel;
    private readonly disputeModel;
    private readonly refundModel;
    private readonly payslipModel;
    private readonly payrollRunsModel;
    private readonly employeePayrollDetailsModel;
    constructor(claimModel: Model<claimsDocument>, disputeModel: Model<disputesDocument>, refundModel: Model<refundsDocument>, payslipModel: Model<PayslipDocument>, payrollRunsModel: Model<payrollRunsDocument>, employeePayrollDetailsModel: Model<employeePayrollDetailsDocument>);
    getHealth(): {
        subsystem: string;
        status: string;
        timestamp: string;
    };
    createClaim(dto: CreateClaimDto): Promise<claims>;
    getClaimById(id: string): Promise<claims>;
    listClaimsByEmployee(employeeId: string): Promise<claims[]>;
    updateClaimStatus(id: string, dto: UpdateClaimStatusDto): Promise<claims>;
    createDispute(dto: CreateDisputeDto): Promise<disputes>;
    getDisputeById(id: string): Promise<disputes>;
    listDisputesByEmployee(employeeId: string): Promise<disputes[]>;
    updateDisputeStatus(id: string, dto: UpdateDisputeStatusDto): Promise<disputes>;
    createRefund(dto: CreateRefundDto): Promise<refunds>;
    getRefundById(id: string): Promise<refunds>;
    listRefundsByEmployee(employeeId: string): Promise<refunds[]>;
    updateRefundStatus(id: string, dto: UpdateRefundStatusDto): Promise<refunds>;
    getPayslipById(id: string): Promise<paySlip>;
    getPayslipByEmployeeAndPeriod(employeeId: string, payrollRunId: string): Promise<paySlip>;
    listPayslipsByEmployee(employeeId: string): Promise<paySlip[]>;
    getPayslipStatus(id: string): Promise<{
        status: string;
        paymentStatus: string;
    }>;
    getHistoricalSalaryRecords(employeeId: string, startDate?: Date, endDate?: Date): Promise<paySlip[]>;
    generateTaxCertificate(employeeId: string, year: number): Promise<{
        employeeId: string;
        year: number;
        totalGrossSalary: number;
        totalTaxDeductions: number;
        totalNetPay: number;
        payslips: any[];
    }>;
    generateInsuranceCertificate(employeeId: string, year: number): Promise<{
        employeeId: string;
        year: number;
        totalInsuranceContributions: number;
        payslips: any[];
    }>;
    getDepartmentReport(departmentId: string, startDate?: Date, endDate?: Date): Promise<{
        departmentId: string;
        totalEmployees: number;
        totalGrossSalary: number;
        totalDeductions: number;
        totalNetPay: number;
        payrollRuns: any[];
    }>;
    getMonthEndSummary(month: number, year: number): Promise<{
        month: number;
        year: number;
        totalPayrollRuns: number;
        totalEmployees: number;
        totalGrossSalary: number;
        totalDeductions: number;
        totalNetPay: number;
        payrollRuns: any[];
    }>;
    getYearEndSummary(year: number): Promise<{
        year: number;
        totalPayrollRuns: number;
        totalEmployees: number;
        totalGrossSalary: number;
        totalDeductions: number;
        totalNetPay: number;
        monthlyBreakdown: any[];
    }>;
    getTaxReport(startDate?: Date, endDate?: Date): Promise<{
        period: {
            start: Date;
            end: Date;
        };
        totalTaxCollected: number;
        totalEmployees: number;
        breakdown: any[];
    }>;
    getInsuranceReport(startDate?: Date, endDate?: Date): Promise<{
        period: {
            start: Date;
            end: Date;
        };
        totalInsuranceContributions: number;
        totalEmployees: number;
        breakdown: any[];
    }>;
    getBenefitsReport(startDate?: Date, endDate?: Date): Promise<{
        period: {
            start: Date;
            end: Date;
        };
        totalBenefitsPaid: number;
        totalEmployees: number;
        breakdown: any[];
    }>;
}
