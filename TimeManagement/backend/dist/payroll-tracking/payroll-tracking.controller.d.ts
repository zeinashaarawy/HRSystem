import { PayrollTrackingService } from './payroll-tracking.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimStatusDto } from './dto/update-claim-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeStatusDto } from './dto/update-dispute-status.dto';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundStatusDto } from './dto/update-refund-status.dto';
export declare class PayrollTrackingController {
    private readonly payrollTrackingService;
    constructor(payrollTrackingService: PayrollTrackingService);
    getHealth(): {
        subsystem: string;
        status: string;
        timestamp: string;
    };
    createClaim(dto: CreateClaimDto): Promise<import("./models/claims.schema").claims>;
    getClaimById(id: string): Promise<import("./models/claims.schema").claims>;
    listClaimsByEmployee(employeeId: string): Promise<import("./models/claims.schema").claims[]>;
    updateClaimStatus(id: string, dto: UpdateClaimStatusDto): Promise<import("./models/claims.schema").claims>;
    createDispute(dto: CreateDisputeDto): Promise<import("./models/disputes.schema").disputes>;
    getDisputeById(id: string): Promise<import("./models/disputes.schema").disputes>;
    listDisputesByEmployee(employeeId: string): Promise<import("./models/disputes.schema").disputes[]>;
    updateDisputeStatus(id: string, dto: UpdateDisputeStatusDto): Promise<import("./models/disputes.schema").disputes>;
    createRefund(dto: CreateRefundDto): Promise<import("./models/refunds.schema").refunds>;
    getRefundById(id: string): Promise<import("./models/refunds.schema").refunds>;
    listRefundsByEmployee(employeeId: string): Promise<import("./models/refunds.schema").refunds[]>;
    updateRefundStatus(id: string, dto: UpdateRefundStatusDto): Promise<import("./models/refunds.schema").refunds>;
    getPayslipById(id: string): Promise<import("../payroll-execution/models/payslip.schema").paySlip>;
    listPayslipsByEmployee(employeeId: string): Promise<import("../payroll-execution/models/payslip.schema").paySlip[]>;
    getPayslipStatus(payslipId: string): Promise<{
        status: string;
        paymentStatus: string;
    }>;
    getPayslipByEmployeeAndPeriod(employeeId: string, payrollRunId: string): Promise<import("../payroll-execution/models/payslip.schema").paySlip>;
    getHistoricalSalaryRecords(employeeId: string, startDate?: string, endDate?: string): Promise<import("../payroll-execution/models/payslip.schema").paySlip[]>;
    generateTaxCertificate(employeeId: string, year: string): Promise<{
        employeeId: string;
        year: number;
        totalGrossSalary: number;
        totalTaxDeductions: number;
        totalNetPay: number;
        payslips: any[];
    }>;
    generateInsuranceCertificate(employeeId: string, year: string): Promise<{
        employeeId: string;
        year: number;
        totalInsuranceContributions: number;
        payslips: any[];
    }>;
    getDepartmentReport(departmentId: string, startDate?: string, endDate?: string): Promise<{
        departmentId: string;
        totalEmployees: number;
        totalGrossSalary: number;
        totalDeductions: number;
        totalNetPay: number;
        payrollRuns: any[];
    }>;
    getMonthEndSummary(month: string, year: string): Promise<{
        month: number;
        year: number;
        totalPayrollRuns: number;
        totalEmployees: number;
        totalGrossSalary: number;
        totalDeductions: number;
        totalNetPay: number;
        payrollRuns: any[];
    }>;
    getYearEndSummary(year: string): Promise<{
        year: number;
        totalPayrollRuns: number;
        totalEmployees: number;
        totalGrossSalary: number;
        totalDeductions: number;
        totalNetPay: number;
        monthlyBreakdown: any[];
    }>;
    getTaxReport(startDate?: string, endDate?: string): Promise<{
        period: {
            start: Date;
            end: Date;
        };
        totalTaxCollected: number;
        totalEmployees: number;
        breakdown: any[];
    }>;
    getInsuranceReport(startDate?: string, endDate?: string): Promise<{
        period: {
            start: Date;
            end: Date;
        };
        totalInsuranceContributions: number;
        totalEmployees: number;
        breakdown: any[];
    }>;
    getBenefitsReport(startDate?: string, endDate?: string): Promise<{
        period: {
            start: Date;
            end: Date;
        };
        totalBenefitsPaid: number;
        totalEmployees: number;
        breakdown: any[];
    }>;
}
