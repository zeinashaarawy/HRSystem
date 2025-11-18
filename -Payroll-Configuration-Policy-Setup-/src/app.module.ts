import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollSchema, PayrollSchemaSchema } from './models/PayrollSchema.schema';
import { PayrollSchemaService } from './payroll-schema.service';
import { PayrollSchemaController } from './payroll-schema.controller';
import { CrudTestService } from './crud-test.service';
import { Allowance, AllowanceSchema } from './models/Allowance.schema';
import { ApprovalRequest, ApprovalRequestSchema } from './models/ApprovalRequest.schema';
import { AuditLog, AuditLogSchema } from './models/AuditLog.schema';
import { Deduction, DeductionSchema } from './models/Deduction.schema';
import { InsuranceBracket, InsuranceBracketSchema } from './models/InsuranceBracket.schema';
import { PayGrade, PayGradeSchema } from './models/PayGrade.schema';
import { PayrollArea, PayrollAreaSchema } from './models/PayrollArea.schema';
import { PayrollPolicy, PayrollPolicySchema } from './models/PayrollPolicy.schema';
import { PayType, PayTypeSchema } from './models/PayType.schema';
import { ResignationBenefitRule, ResignationBenefitRuleSchema } from './models/ResignationBenefitRule.schema';
import { SigningBonus, SigningBonusSchema } from './models/SigningBonus.schema';
import { SystemSetting, SystemSettingSchema } from './models/SystemSetting.schema';
import { TaxRule, TaxRuleSchema } from './models/TaxRule.schema';
import { TerminationBenefitRule, TerminationBenefitRuleSchema } from './models/TerminationBenefitRule.schema';

@Module({
  imports: [
    // Use connection string from .env (MONGODB_URI) with a fallback to the previous hardcoded value
    MongooseModule.forRoot(
      process.env.MONGODB_URI ??
        'mongodb+srv://user:mdp067QvT0Tnb5WR@hr-system-cluster.xagcoyo.mongodb.net/',
    ),
    MongooseModule.forFeature([
      { name: PayrollSchema.name, schema: PayrollSchemaSchema },
      { name: Allowance.name, schema: AllowanceSchema },
      { name: ApprovalRequest.name, schema: ApprovalRequestSchema },
      { name: AuditLog.name, schema: AuditLogSchema },
      { name: Deduction.name, schema: DeductionSchema },
      { name: InsuranceBracket.name, schema: InsuranceBracketSchema },
      { name: PayGrade.name, schema: PayGradeSchema },
      { name: PayrollArea.name, schema: PayrollAreaSchema },
      { name: PayrollPolicy.name, schema: PayrollPolicySchema },
      { name: PayType.name, schema: PayTypeSchema },
      { name: ResignationBenefitRule.name, schema: ResignationBenefitRuleSchema },
      { name: SigningBonus.name, schema: SigningBonusSchema },
      { name: SystemSetting.name, schema: SystemSettingSchema },
      { name: TaxRule.name, schema: TaxRuleSchema },
      { name: TerminationBenefitRule.name, schema: TerminationBenefitRuleSchema },
    ]),
  ],
  controllers: [AppController, PayrollSchemaController],
  providers: [AppService, PayrollSchemaService, CrudTestService],
})
export class AppModule {}
