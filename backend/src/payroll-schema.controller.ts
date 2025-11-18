import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PayrollSchemaService } from './payroll-schema.service';
import { PayrollSchema } from './models/PayrollSchema.schema';

@Controller('payroll-schemas')
export class PayrollSchemaController {
  constructor(private readonly payrollSchemaService: PayrollSchemaService) {}

  @Post()
  async create(@Body() createPayrollSchemaDto: Partial<PayrollSchema>) {
    return this.payrollSchemaService.create(createPayrollSchemaDto);
  }

  @Get()
  async findAll() {
    return this.payrollSchemaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.payrollSchemaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayrollSchemaDto: Partial<PayrollSchema>,
  ) {
    return this.payrollSchemaService.update(id, updatePayrollSchemaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.payrollSchemaService.delete(id);
  }
}

