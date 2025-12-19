import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { PayrollConfigurationController } from './payroll-configuration.controller';
import { PayrollConfigurationService } from './payroll-configuration.service';
import {
  CompanyWideSettings,
  CompanyWideSettingsSchema,
} from './models/CompanyWideSettings.schema';
import { allowance, allowanceSchema } from './models/allowance.schema';
import {
  insuranceBrackets,
  insuranceBracketsSchema,
} from './models/insuranceBrackets.schema';
import { payrollPolicies, payrollPoliciesSchema } from './models/payrollPolicies.schema';
import { payType, payTypeSchema } from './models/payType.schema';
import { signingBonus, signingBonusSchema } from './models/signingBonus.schema';
import { taxRules, taxRulesSchema } from './models/taxRules.schema';
import {
  terminationAndResignationBenefits,
  terminationAndResignationBenefitsSchema,
} from './models/terminationAndResignationBenefits';
import { payGrade } from './models/payGrades.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: allowance.name, schema: allowanceSchema },
      { name: signingBonus.name, schema: signingBonusSchema },
      { name: taxRules.name, schema: taxRulesSchema },
      { name: insuranceBrackets.name, schema: insuranceBracketsSchema },
      { name: payType.name, schema: payTypeSchema },
      { name: payrollPolicies.name, schema: payrollPoliciesSchema },
      {
        name: terminationAndResignationBenefits.name,
        schema: terminationAndResignationBenefitsSchema,
      },
      { name: CompanyWideSettings.name, schema: CompanyWideSettingsSchema },
      { name: payGrade.name, schema: payTypeSchema },
    ]),
  ],
  controllers: [PayrollConfigurationController],
  providers: [PayrollConfigurationService, JwtAuthGuard, RolesGuard],
  exports: [PayrollConfigurationService],
})
export class PayrollConfigurationModule {}
