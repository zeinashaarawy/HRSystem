import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollRunEmployeeController } from './payroll-run-employee.controller';
import { PayrollRunEmployeeService } from './payroll-run-employee.service';
import { PayrollRunEmployeeCrudTestService } from './payroll-run-employee-crud-test.service';
import {
  PayrollRunEmployee,
  PayrollRunEmployeeSchema,
} from '../models/PayrollRunEmployee';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PayrollRunEmployee.name, schema: PayrollRunEmployeeSchema },
    ]),
  ],
  controllers: [PayrollRunEmployeeController],
  providers: [PayrollRunEmployeeService, PayrollRunEmployeeCrudTestService],
  exports: [PayrollRunEmployeeService],
})
export class PayrollRunEmployeeModule {}

