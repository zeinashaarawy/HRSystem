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
exports.PayrollTrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const payroll_tracking_enum_1 = require("./enums/payroll-tracking-enum");
const payslip_schema_1 = require("../payroll-execution/models/payslip.schema");
const payrollRuns_schema_1 = require("../payroll-execution/models/payrollRuns.schema");
const employeePayrollDetails_schema_1 = require("../payroll-execution/models/employeePayrollDetails.schema");
const claims_schema_1 = require("./models/claims.schema");
const disputes_schema_1 = require("./models/disputes.schema");
const refunds_schema_1 = require("./models/refunds.schema");
let PayrollTrackingService = class PayrollTrackingService {
    claimModel;
    disputeModel;
    refundModel;
    payslipModel;
    payrollRunsModel;
    employeePayrollDetailsModel;
    constructor(claimModel, disputeModel, refundModel, payslipModel, payrollRunsModel, employeePayrollDetailsModel) {
        this.claimModel = claimModel;
        this.disputeModel = disputeModel;
        this.refundModel = refundModel;
        this.payslipModel = payslipModel;
        this.payrollRunsModel = payrollRunsModel;
        this.employeePayrollDetailsModel = employeePayrollDetailsModel;
    }
    getHealth() {
        return {
            subsystem: 'payroll-tracking',
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
    async createClaim(dto) {
        const existing = await this.claimModel
            .findOne({ claimId: dto.claimId })
            .lean();
        if (existing) {
            throw new Error(`Claim with id ${dto.claimId} already exists`);
        }
        const created = await this.claimModel.create({
            ...dto,
            employeeId: new mongoose_3.Types.ObjectId(dto.employeeId),
            financeStaffId: dto.financeStaffId
                ? new mongoose_3.Types.ObjectId(dto.financeStaffId)
                : undefined,
            status: payroll_tracking_enum_1.ClaimStatus.UNDER_REVIEW,
        });
        return created;
    }
    async getClaimById(id) {
        const claim = await this.claimModel.findById(id).lean();
        if (!claim) {
            throw new Error('Claim not found');
        }
        return claim;
    }
    async listClaimsByEmployee(employeeId) {
        return (await this.claimModel
            .find({ employeeId: new mongoose_3.Types.ObjectId(employeeId) })
            .lean());
    }
    async updateClaimStatus(id, dto) {
        const claim = await this.claimModel.findById(id);
        if (!claim) {
            throw new Error('Claim not found');
        }
        claim.status = dto.status;
        if (dto.approvedAmount !== undefined) {
            claim.approvedAmount = dto.approvedAmount;
        }
        if (dto.rejectionReason !== undefined) {
            claim.rejectionReason = dto.rejectionReason;
        }
        if (dto.resolutionComment !== undefined) {
            claim.resolutionComment = dto.resolutionComment;
        }
        await claim.save();
        return claim;
    }
    async createDispute(dto) {
        const existing = await this.disputeModel
            .findOne({ disputeId: dto.disputeId })
            .lean();
        if (existing)
            throw new Error(`Dispute with id ${dto.disputeId} already exists`);
        const created = await this.disputeModel.create({
            ...dto,
            employeeId: new mongoose_3.Types.ObjectId(dto.employeeId),
            payslipId: new mongoose_3.Types.ObjectId(dto.payslipId),
            financeStaffId: dto.financeStaffId
                ? new mongoose_3.Types.ObjectId(dto.financeStaffId)
                : undefined,
            status: payroll_tracking_enum_1.DisputeStatus.UNDER_REVIEW,
        });
        return created;
    }
    async getDisputeById(id) {
        const dispute = await this.disputeModel.findById(id).lean();
        if (!dispute)
            throw new Error('Dispute not found');
        return dispute;
    }
    async listDisputesByEmployee(employeeId) {
        return (await this.disputeModel
            .find({ employeeId: new mongoose_3.Types.ObjectId(employeeId) })
            .lean());
    }
    async updateDisputeStatus(id, dto) {
        const dispute = await this.disputeModel.findById(id);
        if (!dispute)
            throw new Error('Dispute not found');
        dispute.status = dto.status;
        if (dto.rejectionReason !== undefined) {
            dispute.rejectionReason = dto.rejectionReason;
        }
        if (dto.resolutionComment !== undefined) {
            dispute.resolutionComment = dto.resolutionComment;
        }
        await dispute.save();
        return dispute;
    }
    async createRefund(dto) {
        if (!dto.claimId && !dto.disputeId) {
            throw new Error('Refund must be linked to either a claim or a dispute.');
        }
        if (dto.claimId) {
            const claim = await this.claimModel.findById(dto.claimId);
            if (!claim)
                throw new Error('Linked claim not found.');
        }
        if (dto.disputeId) {
            const dispute = await this.disputeModel.findById(dto.disputeId);
            if (!dispute)
                throw new Error('Linked dispute not found.');
        }
        const created = await this.refundModel.create({
            claimId: dto.claimId ? new mongoose_3.Types.ObjectId(dto.claimId) : undefined,
            disputeId: dto.disputeId ? new mongoose_3.Types.ObjectId(dto.disputeId) : undefined,
            employeeId: new mongoose_3.Types.ObjectId(dto.employeeId),
            financeStaffId: dto.financeStaffId
                ? new mongoose_3.Types.ObjectId(dto.financeStaffId)
                : undefined,
            refundDetails: {
                description: dto.refundDetails.description,
                amount: dto.refundDetails.amount,
            },
            status: payroll_tracking_enum_1.RefundStatus.PENDING,
        });
        return created;
    }
    async getRefundById(id) {
        const refund = await this.refundModel.findById(id).lean();
        if (!refund) {
            throw new Error('Refund not found');
        }
        return refund;
    }
    async listRefundsByEmployee(employeeId) {
        return (await this.refundModel
            .find({ employeeId: new mongoose_3.Types.ObjectId(employeeId) })
            .lean());
    }
    async updateRefundStatus(id, dto) {
        const refund = await this.refundModel.findById(id);
        if (!refund) {
            throw new Error('Refund not found');
        }
        refund.status = dto.status;
        if (dto.paidInPayrollRunId !== undefined) {
            refund.paidInPayrollRunId = new mongoose_3.Types.ObjectId(dto.paidInPayrollRunId);
        }
        await refund.save();
        return refund;
    }
    async getPayslipById(id) {
        const payslip = await this.payslipModel
            .findById(id)
            .populate('employeeId')
            .populate('payrollRunId')
            .lean();
        if (!payslip) {
            throw new Error('Payslip not found');
        }
        return payslip;
    }
    async getPayslipByEmployeeAndPeriod(employeeId, payrollRunId) {
        const payslip = await this.payslipModel
            .findOne({
            employeeId: new mongoose_3.Types.ObjectId(employeeId),
            payrollRunId: new mongoose_3.Types.ObjectId(payrollRunId),
        })
            .populate('employeeId')
            .populate('payrollRunId')
            .lean();
        if (!payslip) {
            throw new Error('Payslip not found');
        }
        return payslip;
    }
    async listPayslipsByEmployee(employeeId) {
        return (await this.payslipModel
            .find({ employeeId: new mongoose_3.Types.ObjectId(employeeId) })
            .populate('payrollRunId')
            .sort({ createdAt: -1 })
            .lean());
    }
    async getPayslipStatus(id) {
        const payslip = await this.payslipModel.findById(id).lean();
        if (!payslip) {
            throw new Error('Payslip not found');
        }
        return {
            status: 'available',
            paymentStatus: payslip.paymentStatus,
        };
    }
    async getHistoricalSalaryRecords(employeeId, startDate, endDate) {
        const query = { employeeId: new mongoose_3.Types.ObjectId(employeeId) };
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = startDate;
            if (endDate)
                query.createdAt.$lte = endDate;
        }
        return (await this.payslipModel
            .find(query)
            .populate('payrollRunId')
            .sort({ createdAt: -1 })
            .lean());
    }
    async generateTaxCertificate(employeeId, year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        const payslips = await this.payslipModel
            .find({
            employeeId: new mongoose_3.Types.ObjectId(employeeId),
            createdAt: { $gte: startDate, $lte: endDate },
        })
            .lean();
        let totalGrossSalary = 0;
        let totalTaxDeductions = 0;
        let totalNetPay = 0;
        payslips.forEach((payslip) => {
            totalGrossSalary += payslip.totalGrossSalary || 0;
            totalNetPay += payslip.netPay || 0;
            if (payslip.deductionsDetails?.taxes) {
                payslip.deductionsDetails.taxes.forEach((tax) => {
                    totalTaxDeductions += tax.amount || 0;
                });
            }
        });
        return {
            employeeId,
            year,
            totalGrossSalary,
            totalTaxDeductions,
            totalNetPay,
            payslips: payslips,
        };
    }
    async generateInsuranceCertificate(employeeId, year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);
        const payslips = await this.payslipModel
            .find({
            employeeId: new mongoose_3.Types.ObjectId(employeeId),
            createdAt: { $gte: startDate, $lte: endDate },
        })
            .lean();
        let totalInsuranceContributions = 0;
        payslips.forEach((payslip) => {
            if (payslip.deductionsDetails?.insurances) {
                payslip.deductionsDetails.insurances.forEach((insurance) => {
                    totalInsuranceContributions += insurance.amount || 0;
                });
            }
        });
        return {
            employeeId,
            year,
            totalInsuranceContributions,
            payslips: payslips,
        };
    }
    async getDepartmentReport(departmentId, startDate, endDate) {
        const query = {};
        if (startDate || endDate) {
            query.payrollPeriod = {};
            if (startDate)
                query.payrollPeriod.$gte = startDate;
            if (endDate)
                query.payrollPeriod.$lte = endDate;
        }
        const payrollRunsList = await this.payrollRunsModel.find(query).lean();
        const totalGrossSalary = 0;
        const totalDeductions = 0;
        let totalNetPay = 0;
        payrollRunsList.forEach((run) => {
            totalNetPay += run.totalnetpay || 0;
        });
        return {
            departmentId,
            totalEmployees: payrollRunsList.length > 0 ? payrollRunsList[0].employees || 0 : 0,
            totalGrossSalary,
            totalDeductions,
            totalNetPay,
            payrollRuns: payrollRunsList,
        };
    }
    async getMonthEndSummary(month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const payrollRunsList = await this.payrollRunsModel
            .find({
            payrollPeriod: { $gte: startDate, $lte: endDate },
        })
            .lean();
        let totalGrossSalary = 0;
        let totalDeductions = 0;
        let totalNetPay = 0;
        let totalEmployees = 0;
        payrollRunsList.forEach((run) => {
            totalNetPay += run.totalnetpay || 0;
            totalEmployees += run.employees || 0;
        });
        const payslips = await this.payslipModel
            .find({
            createdAt: { $gte: startDate, $lte: endDate },
        })
            .lean();
        payslips.forEach((payslip) => {
            totalGrossSalary += payslip.totalGrossSalary || 0;
            totalDeductions += payslip.totaDeductions || 0;
        });
        return {
            month,
            year,
            totalPayrollRuns: payrollRunsList.length,
            totalEmployees,
            totalGrossSalary,
            totalDeductions,
            totalNetPay,
            payrollRuns: payrollRunsList,
        };
    }
    async getYearEndSummary(year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31, 23, 59, 59);
        const payrollRunsList = await this.payrollRunsModel
            .find({
            payrollPeriod: { $gte: startDate, $lte: endDate },
        })
            .lean();
        const monthlyBreakdown = [];
        for (let month = 1; month <= 12; month++) {
            const monthSummary = await this.getMonthEndSummary(month, year);
            monthlyBreakdown.push(monthSummary);
        }
        let totalGrossSalary = 0;
        let totalDeductions = 0;
        let totalNetPay = 0;
        let totalEmployees = 0;
        payrollRunsList.forEach((run) => {
            totalNetPay += run.totalnetpay || 0;
            totalEmployees += run.employees || 0;
        });
        const payslips = await this.payslipModel
            .find({
            createdAt: { $gte: startDate, $lte: endDate },
        })
            .lean();
        payslips.forEach((payslip) => {
            totalGrossSalary += payslip.totalGrossSalary || 0;
            totalDeductions += payslip.totaDeductions || 0;
        });
        return {
            year,
            totalPayrollRuns: payrollRunsList.length,
            totalEmployees,
            totalGrossSalary,
            totalDeductions,
            totalNetPay,
            monthlyBreakdown,
        };
    }
    async getTaxReport(startDate, endDate) {
        const query = {};
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = startDate;
            if (endDate)
                query.createdAt.$lte = endDate;
        }
        const payslips = await this.payslipModel.find(query).lean();
        let totalTaxCollected = 0;
        const breakdown = [];
        payslips.forEach((payslip) => {
            if (payslip.deductionsDetails?.taxes) {
                payslip.deductionsDetails.taxes.forEach((tax) => {
                    totalTaxCollected += tax.amount || 0;
                    breakdown.push({
                        employeeId: payslip.employeeId,
                        payslipId: payslip._id,
                        taxType: tax.name || 'Unknown',
                        amount: tax.amount || 0,
                    });
                });
            }
        });
        return {
            period: {
                start: startDate || new Date(0),
                end: endDate || new Date(),
            },
            totalTaxCollected,
            totalEmployees: new Set(payslips.map((p) => p.employeeId.toString()))
                .size,
            breakdown,
        };
    }
    async getInsuranceReport(startDate, endDate) {
        const query = {};
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = startDate;
            if (endDate)
                query.createdAt.$lte = endDate;
        }
        const payslips = await this.payslipModel.find(query).lean();
        let totalInsuranceContributions = 0;
        const breakdown = [];
        payslips.forEach((payslip) => {
            if (payslip.deductionsDetails?.insurances) {
                payslip.deductionsDetails.insurances.forEach((insurance) => {
                    totalInsuranceContributions += insurance.amount || 0;
                    breakdown.push({
                        employeeId: payslip.employeeId,
                        payslipId: payslip._id,
                        insuranceType: insurance.name || 'Unknown',
                        amount: insurance.amount || 0,
                    });
                });
            }
        });
        return {
            period: {
                start: startDate || new Date(0),
                end: endDate || new Date(),
            },
            totalInsuranceContributions,
            totalEmployees: new Set(payslips.map((p) => p.employeeId.toString()))
                .size,
            breakdown,
        };
    }
    async getBenefitsReport(startDate, endDate) {
        const query = {};
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = startDate;
            if (endDate)
                query.createdAt.$lte = endDate;
        }
        const payslips = await this.payslipModel.find(query).lean();
        let totalBenefitsPaid = 0;
        const breakdown = [];
        payslips.forEach((payslip) => {
            if (payslip.earningsDetails?.benefits) {
                payslip.earningsDetails.benefits.forEach((benefit) => {
                    totalBenefitsPaid += benefit.amount || 0;
                    breakdown.push({
                        employeeId: payslip.employeeId,
                        payslipId: payslip._id,
                        benefitType: benefit.name || 'Unknown',
                        amount: benefit.amount || 0,
                    });
                });
            }
        });
        return {
            period: {
                start: startDate || new Date(0),
                end: endDate || new Date(),
            },
            totalBenefitsPaid,
            totalEmployees: new Set(payslips.map((p) => p.employeeId.toString()))
                .size,
            breakdown,
        };
    }
};
exports.PayrollTrackingService = PayrollTrackingService;
exports.PayrollTrackingService = PayrollTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(claims_schema_1.claims.name)),
    __param(1, (0, mongoose_1.InjectModel)(disputes_schema_1.disputes.name)),
    __param(2, (0, mongoose_1.InjectModel)(refunds_schema_1.refunds.name)),
    __param(3, (0, mongoose_1.InjectModel)(payslip_schema_1.paySlip.name)),
    __param(4, (0, mongoose_1.InjectModel)(payrollRuns_schema_1.payrollRuns.name)),
    __param(5, (0, mongoose_1.InjectModel)(employeePayrollDetails_schema_1.employeePayrollDetails.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PayrollTrackingService);
//# sourceMappingURL=payroll-tracking.service.js.map