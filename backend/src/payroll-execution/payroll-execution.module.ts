import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollExecutionController } from './payroll-execution.controller';
import { PayrollExecutionService } from './payroll-execution.service';
import { employeePayrollDetails, employeePayrollDetailsSchema } from './models/employeePayrollDetails.schema';
import { employeePenalties, employeePenaltiesSchema } from './models/employeePenalties.schema';
import { employeeSigningBonus, employeeSigningBonusSchema } from './models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation, EmployeeTerminationResignationSchema } from './models/EmployeeTerminationResignation.schema';
import { payrollRuns, payrollRunsSchema } from './models/payrollRuns.schema';
import { paySlip, paySlipSchema } from './models/payslip.schema';
import { signingBonus, signingBonusSchema } from '../payroll-configuration/models/signingBonus.schema';
import { terminationAndResignationBenefits, terminationAndResignationBenefitsSchema } from '../payroll-configuration/models/terminationAndResignationBenefits';
import { EmployeeProfile, EmployeeProfileSchema } from '../employee-profile/models/employee-profile.schema';
import { Contract, ContractSchema } from '../recruitment/models/contract.schema';
import { TerminationRequest, TerminationRequestSchema } from '../recruitment/models/termination-request.schema';
import { ClearanceChecklist, ClearanceChecklistSchema } from '../recruitment/models/clearance-checklist.schema';
import { allowance, allowanceSchema } from '../payroll-configuration/models/allowance.schema';
import { taxRules, taxRulesSchema } from '../payroll-configuration/models/taxRules.schema';
import { insuranceBrackets, insuranceBracketsSchema } from '../payroll-configuration/models/insuranceBrackets.schema';
import { payGrade, payGradeSchema } from '../payroll-configuration/models/payGrades.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: payrollRuns.name, schema: payrollRunsSchema },
      { name: paySlip.name, schema: paySlipSchema },
      { name: employeePayrollDetails.name, schema: employeePayrollDetailsSchema },
      { name: employeeSigningBonus.name, schema: employeeSigningBonusSchema },
      { name: EmployeeTerminationResignation.name, schema: EmployeeTerminationResignationSchema },
      { name: employeePenalties.name, schema: employeePenaltiesSchema },
      { name: signingBonus.name, schema: signingBonusSchema },
      { name: terminationAndResignationBenefits.name, schema: terminationAndResignationBenefitsSchema },
      { name: EmployeeProfile.name, schema: EmployeeProfileSchema },
      { name: Contract.name, schema: ContractSchema },
      { name: TerminationRequest.name, schema: TerminationRequestSchema },
      { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
      { name: allowance.name, schema: allowanceSchema },
      { name: taxRules.name, schema: taxRulesSchema },
      { name: insuranceBrackets.name, schema: insuranceBracketsSchema },
      { name: payGrade.name, schema: payGradeSchema },
    ]),
  ],
  controllers: [PayrollExecutionController],
  providers: [PayrollExecutionService],
  exports: [PayrollExecutionService],
})
export class PayrollExecutionModule { }
