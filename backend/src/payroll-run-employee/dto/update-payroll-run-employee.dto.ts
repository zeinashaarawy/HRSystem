import { PartialType } from '@nestjs/mapped-types';
import { CreatePayrollRunEmployeeDto } from './create-payroll-run-employee.dto';

export class UpdatePayrollRunEmployeeDto extends PartialType(CreatePayrollRunEmployeeDto) {}

