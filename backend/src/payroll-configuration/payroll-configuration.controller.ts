import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { PayrollConfigurationService } from './payroll-configuration.service';

class UpdatePayrollConfigDto {
  payload: Record<string, any>;
}

class ApprovePayrollConfigDto {
  approverId: string;
}

@Controller('payroll-configuration')
export class PayrollConfigurationController {
  constructor(
    private readonly payrollConfigurationService: PayrollConfigurationService,
  ) {}

  @Patch(':collection/:configId')
  editConfiguration(
    @Param('collection') collection: string,
    @Param('configId') configId: string,
    @Body() { payload }: UpdatePayrollConfigDto,
  ) {
    return this.payrollConfigurationService.editConfiguration(
      collection,
      configId,
      payload,
    );
  }

  @Patch(':collection/:configId/approve')
  approveConfiguration(
    @Param('collection') collection: string,
    @Param('configId') configId: string,
    @Body() { approverId }: ApprovePayrollConfigDto,
  ) {
    return this.payrollConfigurationService.approveConfiguration(
      collection,
      configId,
      approverId,
    );
  }

  @Delete(':collection/:configId')
  deleteConfiguration(
    @Param('collection') collection: string,
    @Param('configId') configId: string,
  ) {
    return this.payrollConfigurationService.deleteConfiguration(
      collection,
      configId,
    );
  }
}
