import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import all payroll schemas from models
import { Allowance, AllowanceSchema } from '../../models/Allowance.schema';
import { ApprovalRequest, ApprovalRequestSchema } from '../../models/ApprovalRequest.schema';
import { AuditLog, AuditLogSchema } from '../../models/AuditLog.schema';
import { Deduction, DeductionSchema } from '../../models/Deduction.schema';
import { InsuranceBracket, InsuranceBracketSchema } from '../../models/InsuranceBracket.schema';
import { PayGrade, PayGradeSchema } from '../../models/PayGrade.schema';
import { PayrollApproval, PayrollApprovalSchema } from '../../models/PayrollApproval';
import { PayrollArea, PayrollAreaSchema } from '../../models/PayrollArea.schema';
import { PayrollException, PayrollExceptionSchema } from '../../models/PayrollException';
import { PayrollPolicy, PayrollPolicySchema } from '../../models/PayrollPolicy.schema';
import { PayrollRun, PayrollRunSchema } from '../../models/PayrollRun';
import { PayrollRunEmployee, PayrollRunEmployeeSchema } from '../../models/PayrollRunEmployee';
import { PayrollSchema, PayrollSchemaSchema } from '../../models/PayrollSchema.schema';
import { PayType, PayTypeSchema } from '../../models/PayType.schema';
import { ResignationBenefitRule, ResignationBenefitRuleSchema } from '../../models/ResignationBenefitRule.schema';
import { SigningBonus, SigningBonusSchema } from '../../models/SigningBonus.schema';
import { SigningBonusProcessing, SigningBonusProcessingSchema } from '../../models/SigningBonusProcessing';
import { SystemSetting, SystemSettingSchema } from '../../models/SystemSetting.schema';
import { TaxRule, TaxRuleSchema } from '../../models/TaxRule.schema';
import { TerminationBenefitProcessing, TerminationBenefitProcessingSchema } from '../../models/TerminationBenefitProcessing';
import { TerminationBenefitRule, TerminationBenefitRuleSchema } from '../../models/TerminationBenefitRule.schema';
import { PayrollDispute, PayrollDisputeSchema } from '../../models/payroll-dispute.schema';
import { PayrollRefund, PayrollRefundSchema } from '../../models/payroll-refund.schema';
import { Payslip, PayslipSchema } from '../../models/payslip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // Core payroll configuration
      { name: PayrollSchema.name, schema: PayrollSchemaSchema },
      { name: PayrollArea.name, schema: PayrollAreaSchema },
      { name: PayrollPolicy.name, schema: PayrollPolicySchema },
      { name: PayType.name, schema: PayTypeSchema },
      { name: PayGrade.name, schema: PayGradeSchema },
      
      // Tax and insurance
      { name: TaxRule.name, schema: TaxRuleSchema },
      { name: InsuranceBracket.name, schema: InsuranceBracketSchema },
      
      // Allowances and deductions
      { name: Allowance.name, schema: AllowanceSchema },
      { name: Deduction.name, schema: DeductionSchema },
      
      // Payroll runs and processing
      { name: PayrollRun.name, schema: PayrollRunSchema },
      { name: PayrollRunEmployee.name, schema: PayrollRunEmployeeSchema },
      { name: PayrollException.name, schema: PayrollExceptionSchema },
      { name: PayrollApproval.name, schema: PayrollApprovalSchema },
      
      // Payslips (using the more detailed schema from payslip.schema.ts)
      { name: Payslip.name, schema: PayslipSchema },
      
      // Benefits and bonuses
      { name: SigningBonus.name, schema: SigningBonusSchema },
      { name: SigningBonusProcessing.name, schema: SigningBonusProcessingSchema },
      { name: ResignationBenefitRule.name, schema: ResignationBenefitRuleSchema },
      { name: TerminationBenefitRule.name, schema: TerminationBenefitRuleSchema },
      { name: TerminationBenefitProcessing.name, schema: TerminationBenefitProcessingSchema },
      
      // Disputes and refunds
      { name: PayrollDispute.name, schema: PayrollDisputeSchema },
      { name: PayrollRefund.name, schema: PayrollRefundSchema },
      
      // System and workflow
      { name: ApprovalRequest.name, schema: ApprovalRequestSchema },
      { name: AuditLog.name, schema: AuditLogSchema },
      { name: SystemSetting.name, schema: SystemSettingSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class PayrollModule {}

