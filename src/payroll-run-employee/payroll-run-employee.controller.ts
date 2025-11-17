import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PayrollRunEmployeeService } from './payroll-run-employee.service';
import { CreatePayrollRunEmployeeDto } from './dto/create-payroll-run-employee.dto';
import { UpdatePayrollRunEmployeeDto } from './dto/update-payroll-run-employee.dto';

@Controller('payroll-run-employees')
export class PayrollRunEmployeeController {
  constructor(
    private readonly payrollRunEmployeeService: PayrollRunEmployeeService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreatePayrollRunEmployeeDto) {
    return this.payrollRunEmployeeService.create(createDto);
  }

  @Get()
  findAll(@Query('payrollRunId') payrollRunId?: string, @Query('employeeId') employeeId?: string) {
    if (payrollRunId) {
      return this.payrollRunEmployeeService.findByPayrollRunId(payrollRunId);
    }
    if (employeeId) {
      return this.payrollRunEmployeeService.findByEmployeeId(employeeId);
    }
    return this.payrollRunEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollRunEmployeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePayrollRunEmployeeDto) {
    return this.payrollRunEmployeeService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.payrollRunEmployeeService.remove(id);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  removeAll() {
    return this.payrollRunEmployeeService.removeAll();
  }
}

