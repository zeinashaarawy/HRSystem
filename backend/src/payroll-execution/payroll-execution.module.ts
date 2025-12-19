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
    ]),
  ],
  controllers: [PayrollExecutionController],
  providers: [PayrollExecutionService],
  exports: [PayrollExecutionService],
})
export class PayrollExecutionModule { }
