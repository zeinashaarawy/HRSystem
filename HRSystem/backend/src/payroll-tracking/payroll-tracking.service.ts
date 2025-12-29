import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimStatusDto } from './dto/update-claim-status.dto';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeStatusDto } from './dto/update-dispute-status.dto';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundStatusDto } from './dto/update-refund-status.dto';
import { ClaimStatus, DisputeStatus, RefundStatus } from './enums/payroll-tracking-enum';
import { paySlip, PayslipDocument } from '../payroll-execution/models/payslip.schema';
import { payrollRuns, payrollRunsDocument } from '../payroll-execution/models/payrollRuns.schema';
import { employeePayrollDetails, employeePayrollDetailsDocument } from '../payroll-execution/models/employeePayrollDetails.schema';
import {
  claims,
  claimsDocument,
} from './models/claims.schema';
import {
  disputes,
  disputesDocument,
} from './models/disputes.schema';
import {
  refunds,
  refundsDocument,
} from './models/refunds.schema';

@Injectable()
export class PayrollTrackingService {
  constructor(
    @InjectModel(claims.name)
    private readonly claimModel: Model<claimsDocument>,

    @InjectModel(disputes.name)
    private readonly disputeModel: Model<disputesDocument>,

    @InjectModel(refunds.name)
    private readonly refundModel: Model<refundsDocument>,

    @InjectModel(paySlip.name)
    private readonly payslipModel: Model<PayslipDocument>,

    @InjectModel(payrollRuns.name)
    private readonly payrollRunsModel: Model<payrollRunsDocument>,

    @InjectModel(employeePayrollDetails.name)
    private readonly employeePayrollDetailsModel: Model<employeePayrollDetailsDocument>,
  ) { }


  // HEALTH CHECK

  getHealth() {
    return {
      subsystem: 'payroll-tracking',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }


  // CLAIMS

  async createClaim(dto: CreateClaimDto): Promise<claims> {
    // basic sanity: prevent duplicate claimId
    const existing = await this.claimModel.findOne({ claimId: dto.claimId }).lean();
    if (existing) {
      throw new Error(`Claim with id ${dto.claimId} already exists`);
    }

    const created = await this.claimModel.create({
      ...dto,
      employeeId: new Types.ObjectId(dto.employeeId),
      financeStaffId: dto.financeStaffId
        ? new Types.ObjectId(dto.financeStaffId)
        : undefined,
      status: ClaimStatus.UNDER_REVIEW,
    });

    return created;
  }

  async getClaimById(id: string): Promise<claims> {
    const claim = await this.claimModel.findById(id).lean();
    if (!claim) {
      throw new Error('Claim not found');
    }
    return claim as any;
  }

  async listClaimsByEmployee(employeeId: string): Promise<claims[]> {
    return (await this.claimModel
      .find({ employeeId: new Types.ObjectId(employeeId) })
      .lean()) as any;
  }

  async updateClaimStatus(id: string, dto: UpdateClaimStatusDto): Promise<claims> {
    let claim;
    if (Types.ObjectId.isValid(id)) {
      claim = await this.claimModel.findById(id);
    }

    if (!claim) {
      // Try finding by functional ID
      claim = await this.claimModel.findOne({ claimId: id });
    }

    if (!claim) {
      throw new NotFoundException('Claim not found');
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


  // DISPUTES

  async createDispute(dto: CreateDisputeDto): Promise<disputes> {
    const existing = await this.disputeModel.findOne({ disputeId: dto.disputeId }).lean();
    if (existing) throw new Error(`Dispute with id ${dto.disputeId} already exists`);

    let payslipIdObj;
    try {
      payslipIdObj = new Types.ObjectId(dto.payslipId);
    } catch (e) {
      throw new Error(`Invalid Payslip ID format: ${dto.payslipId}`);
    }

    const created = await this.disputeModel.create({
      ...dto,
      employeeId: new Types.ObjectId(dto.employeeId),
      payslipId: payslipIdObj,
      financeStaffId: dto.financeStaffId ? new Types.ObjectId(dto.financeStaffId) : undefined,
      status: DisputeStatus.UNDER_REVIEW,
    });

    return created;
  }

  async getDisputeById(id: string): Promise<disputes> {
    const dispute = await this.disputeModel.findById(id).lean();
    if (!dispute) throw new Error('Dispute not found');
    return dispute as any;
  }

  async listDisputesByEmployee(employeeId: string): Promise<disputes[]> {
    return (await this.disputeModel
      .find({ employeeId: new Types.ObjectId(employeeId) })
      .lean()) as any;
  }

  async updateDisputeStatus(id: string, dto: UpdateDisputeStatusDto): Promise<disputes> {
    let dispute;
    if (Types.ObjectId.isValid(id)) {
      dispute = await this.disputeModel.findById(id);
    }

    if (!dispute) {
      dispute = await this.disputeModel.findOne({ disputeId: id });
    }

    if (!dispute) throw new NotFoundException('Dispute not found');

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


  // REFUNDS

  async createRefund(dto: CreateRefundDto): Promise<refunds> {
    // Relaxed check: Refund does NOT necessarily need to be linked to a claim or dispute if the user leaves them empty.
    // The fields are optional in the UI.

    let linkedClaimId: Types.ObjectId | undefined;
    let linkedDisputeId: Types.ObjectId | undefined;

    const claimIdInput = dto.claimId?.trim();
    if (claimIdInput) {
      // 1. Try to find by functional ID (string)
      const claim = await this.claimModel.findOne({ claimId: claimIdInput });
      if (claim) {
        linkedClaimId = claim._id as Types.ObjectId;
        if (claim.status === ClaimStatus.REJECTED) {
          throw new BadRequestException(`Cannot create refund for rejected claim: ${claimIdInput}`);
        }
      } else {
        // 2. Fallback: Check if it's a valid ObjectId (direct reference)
        if (Types.ObjectId.isValid(claimIdInput)) {
          const claimById = await this.claimModel.findById(claimIdInput);
          if (claimById) {
            linkedClaimId = claimById._id as Types.ObjectId;
            if (claimById.status === ClaimStatus.REJECTED) {
              throw new BadRequestException(`Cannot create refund for rejected claim: ${claimIdInput}`);
            }
          } else {
            throw new NotFoundException(`Linked claim not found (ID: ${claimIdInput})`);
          }
        } else {
          // Not a functional ID and not a valid MongoID -> Not found
          throw new NotFoundException(`Linked claim not found (ID: ${claimIdInput})`);
        }
      }
    }

    const disputeIdInput = dto.disputeId?.trim();
    if (disputeIdInput) {
      // 1. Try to find by functional ID (string)
      const dispute = await this.disputeModel.findOne({ disputeId: disputeIdInput });
      if (dispute) {
        linkedDisputeId = dispute._id as Types.ObjectId;
        if (dispute.status === DisputeStatus.REJECTED) {
          throw new BadRequestException(`Cannot create refund for rejected dispute: ${disputeIdInput}`);
        }
      } else {
        // 2. Fallback: Check if it's a valid ObjectId
        if (Types.ObjectId.isValid(disputeIdInput)) {
          const disputeById = await this.disputeModel.findById(disputeIdInput);
          if (disputeById) {
            linkedDisputeId = disputeById._id as Types.ObjectId;
            if (disputeById.status === DisputeStatus.REJECTED) {
              throw new BadRequestException(`Cannot create refund for rejected dispute: ${disputeIdInput}`);
            }
          } else {
            throw new NotFoundException(`Linked dispute not found (ID: ${disputeIdInput})`);
          }
        } else {
          throw new NotFoundException(`Linked dispute not found (ID: ${disputeIdInput})`);
        }
      }
    }

    const created = await this.refundModel.create({
      claimId: linkedClaimId,
      disputeId: linkedDisputeId,
      employeeId: new Types.ObjectId(dto.employeeId),
      financeStaffId: dto.financeStaffId ? new Types.ObjectId(dto.financeStaffId) : undefined,
      refundDetails: {
        description: dto.refundDetails.description,
        amount: dto.refundDetails.amount,
      },
      status: RefundStatus.PENDING,
    });

    return created;
  }

  async getRefundById(id: string): Promise<refunds> {
    const refund = await this.refundModel.findById(id).lean();
    if (!refund) {
      throw new Error('Refund not found');
    }
    return refund as any;
  }

  async listRefundsByEmployee(employeeId: string): Promise<refunds[]> {
    return (await this.refundModel
      .find({ employeeId: new Types.ObjectId(employeeId) })
      .lean()) as any;
  }

  async updateRefundStatus(id: string, dto: UpdateRefundStatusDto): Promise<refunds> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Refund ID');
    }
    const refund = await this.refundModel.findById(id);
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }

    refund.status = dto.status;

    if (dto.paidInPayrollRunId !== undefined) {
      refund.paidInPayrollRunId = new Types.ObjectId(dto.paidInPayrollRunId);
    }

    await refund.save();
    return refund;
  }



  async getPayslipById(id: string): Promise<paySlip> {
    const payslip = await this.payslipModel
      .findById(id)
      .populate('employeeId')
      .populate('payrollRunId')
      .lean();
    if (!payslip) {
      throw new Error('Payslip not found');
    }
    return payslip as any;
  }

  async getPayslipByEmployeeAndPeriod(
    employeeId: string,
    payrollRunId: string,
  ): Promise<paySlip> {
    const payslip = await this.payslipModel
      .findOne({
        employeeId: new Types.ObjectId(employeeId),
        payrollRunId: new Types.ObjectId(payrollRunId),
      })
      .populate('employeeId')
      .populate('payrollRunId')
      .lean();
    if (!payslip) {
      throw new Error('Payslip not found');
    }
    return payslip as any;
  }

  async listPayslipsByEmployee(employeeId: string): Promise<paySlip[]> {
    let payslips: any[] = [];

    // Try standard Mongoose query (ObjectId)
    try {
      if (Types.ObjectId.isValid(employeeId)) {
        payslips = await this.payslipModel
          .find({ employeeId: new Types.ObjectId(employeeId) })
          .populate('payrollRunId')
          .sort({ createdAt: -1 })
          .lean();
      }
    } catch (e) {
      // Ignore ObjectId casting errors
    }

    // Fallback: Check for String stored IDs (common issue with manual data insertion)
    if (!payslips || payslips.length === 0) {
      console.warn(`[PayslipRetrieval] No payslips found with ObjectId for ${employeeId}. Checking for String IDs...`);
      const stringIdPayslips = await this.payslipModel.collection.find({
        employeeId: employeeId
      }).sort({ createdAt: -1 }).toArray();

      if (stringIdPayslips && stringIdPayslips.length > 0) {
        payslips = stringIdPayslips as any[];
      }
    }

    return payslips as any;
  }

  async getPayslipStatus(id: string): Promise<{ status: string; paymentStatus: string }> {
    const payslip = await this.payslipModel.findById(id).lean();
    if (!payslip) {
      throw new Error('Payslip not found');
    }
    return {
      status: 'available',
      paymentStatus: (payslip as any).paymentStatus,
    };
  }



  async getHistoricalSalaryRecords(
    employeeId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<paySlip[]> {
    const query: any = { employeeId: new Types.ObjectId(employeeId) };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lte = endDate;
    }

    let records = await this.payslipModel
      .find(query)
      .populate('payrollRunId')
      .sort({ createdAt: -1 })
      .lean();

    // Fallback for String IDs
    if (!records || records.length === 0) {
      // Create fallback query replacing ObjectId with String
      const stringQuery = { ...query, employeeId: employeeId };
      const stringIdRecords = await this.payslipModel.collection.find(stringQuery)
        .sort({ createdAt: -1 })
        .toArray();

      if (stringIdRecords && stringIdRecords.length > 0) {
        records = stringIdRecords as any[];
      }
    }

    return records as any;
  }



  async generateTaxCertificate(
    employeeId: string,
    year: number,
  ): Promise<{
    employeeId: string;
    year: number;
    totalGrossSalary: number;
    totalTaxDeductions: number;
    totalNetPay: number;
    payslips: any[];
  }> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const payslips = await this.payslipModel
      .find({
        employeeId: new Types.ObjectId(employeeId),
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .lean();

    let totalGrossSalary = 0;
    let totalTaxDeductions = 0;
    let totalNetPay = 0;

    payslips.forEach((payslip: any) => {
      totalGrossSalary += payslip.totalGrossSalary || 0;
      totalNetPay += payslip.netPay || 0;
      if (payslip.deductionsDetails?.taxes) {
        payslip.deductionsDetails.taxes.forEach((tax: any) => {
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
      payslips: payslips as any[],
    };
  }

  async generateInsuranceCertificate(
    employeeId: string,
    year: number,
  ): Promise<{
    employeeId: string;
    year: number;
    totalInsuranceContributions: number;
    payslips: any[];
  }> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const payslips = await this.payslipModel
      .find({
        employeeId: new Types.ObjectId(employeeId),
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .lean();

    let totalInsuranceContributions = 0;

    payslips.forEach((payslip: any) => {
      if (payslip.deductionsDetails?.insurances) {
        payslip.deductionsDetails.insurances.forEach((insurance: any) => {
          totalInsuranceContributions += insurance.amount || 0;
        });
      }
    });

    return {
      employeeId,
      year,
      totalInsuranceContributions,
      payslips: payslips as any[],
    };
  }



  async getDepartmentReport(
    departmentId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{
    departmentId: string;
    totalEmployees: number;
    totalGrossSalary: number;
    totalDeductions: number;
    totalNetPay: number;
    payrollRuns: any[];
  }> {

    const query: any = {};
    if (startDate || endDate) {
      query.payrollPeriod = {};
      if (startDate) query.payrollPeriod.$gte = startDate;
      if (endDate) query.payrollPeriod.$lte = endDate;
    }

    const payrollRunsList = await this.payrollRunsModel.find(query).lean();


    let totalGrossSalary = 0;
    let totalDeductions = 0;
    let totalNetPay = 0;

    payrollRunsList.forEach((run: any) => {
      totalNetPay += run.totalnetpay || 0;
    });

    return {
      departmentId,
      totalEmployees: payrollRunsList.length > 0 ? payrollRunsList[0].employees || 0 : 0,
      totalGrossSalary,
      totalDeductions,
      totalNetPay,
      payrollRuns: payrollRunsList as any[],
    };
  }

  async getMonthEndSummary(month: number, year: number): Promise<{
    month: number;
    year: number;
    totalPayrollRuns: number;
    totalEmployees: number;
    totalGrossSalary: number;
    totalDeductions: number;
    totalNetPay: number;
    payrollRuns: any[];
  }> {
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

    payrollRunsList.forEach((run: any) => {
      totalNetPay += run.totalnetpay || 0;
      totalEmployees += run.employees || 0;
    });

    // Calculate from payslips
    const payslips = await this.payslipModel
      .find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .lean();

    payslips.forEach((payslip: any) => {
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
      payrollRuns: payrollRunsList as any[],
    };
  }

  async getYearEndSummary(year: number): Promise<{
    year: number;
    totalPayrollRuns: number;
    totalEmployees: number;
    totalGrossSalary: number;
    totalDeductions: number;
    totalNetPay: number;
    monthlyBreakdown: any[];
  }> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const payrollRunsList = await this.payrollRunsModel
      .find({
        payrollPeriod: { $gte: startDate, $lte: endDate },
      })
      .lean();

    const monthlyBreakdown: any[] = [];
    for (let month = 1; month <= 12; month++) {
      const monthSummary = await this.getMonthEndSummary(month, year);
      monthlyBreakdown.push(monthSummary as any);
    }

    let totalGrossSalary = 0;
    let totalDeductions = 0;
    let totalNetPay = 0;
    let totalEmployees = 0;

    payrollRunsList.forEach((run: any) => {
      totalNetPay += run.totalnetpay || 0;
      totalEmployees += run.employees || 0;
    });

    const payslips = await this.payslipModel
      .find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .lean();

    payslips.forEach((payslip: any) => {
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

  async getTaxReport(startDate?: Date, endDate?: Date): Promise<{
    period: { start: Date; end: Date };
    totalTaxCollected: number;
    totalEmployees: number;
    breakdown: any[];
  }> {
    const query: any = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lte = endDate;
    }

    const payslips = await this.payslipModel.find(query).lean();

    let totalTaxCollected = 0;
    const breakdown: any[] = [];

    payslips.forEach((payslip: any) => {
      if (payslip.deductionsDetails?.taxes) {
        payslip.deductionsDetails.taxes.forEach((tax: any) => {
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
      totalEmployees: new Set(payslips.map((p: any) => p.employeeId.toString())).size,
      breakdown,
    };
  }

  async getInsuranceReport(startDate?: Date, endDate?: Date): Promise<{
    period: { start: Date; end: Date };
    totalInsuranceContributions: number;
    totalEmployees: number;
    breakdown: any[];
  }> {
    const query: any = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lte = endDate;
    }

    const payslips = await this.payslipModel.find(query).lean();

    let totalInsuranceContributions = 0;
    const breakdown: any[] = [];

    payslips.forEach((payslip: any) => {
      if (payslip.deductionsDetails?.insurances) {
        payslip.deductionsDetails.insurances.forEach((insurance: any) => {
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
      totalEmployees: new Set(payslips.map((p: any) => p.employeeId.toString())).size,
      breakdown,
    };
  }

  async getBenefitsReport(startDate?: Date, endDate?: Date): Promise<{
    period: { start: Date; end: Date };
    totalBenefitsPaid: number;
    totalEmployees: number;
    breakdown: any[];
  }> {
    const query: any = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate;
      if (endDate) query.createdAt.$lte = endDate;
    }

    const payslips = await this.payslipModel.find(query).lean();

    let totalBenefitsPaid = 0;
    const breakdown: any[] = [];

    payslips.forEach((payslip: any) => {
      if (payslip.earningsDetails?.benefits) {
        payslip.earningsDetails.benefits.forEach((benefit: any) => {
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
      totalEmployees: new Set(payslips.map((p: any) => p.employeeId.toString())).size,
      breakdown,
    };
  }
}
