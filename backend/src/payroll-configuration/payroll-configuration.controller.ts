import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { PayrollConfigurationService } from './payroll-configuration.service';
import { ConfigStatus } from './enums/payroll-configuration-enums';

class UpdateInsuranceBracketDto {
  payload: Record<string, any>;
}

class ApproveInsuranceBracketDto {
  approverId: string;
}

class RejectInsuranceBracketDto {
  reviewerId: string;
}

@Controller('payroll-configuration')
export class PayrollConfigurationController {
  constructor(
    private readonly payrollConfigurationService: PayrollConfigurationService,
  ) {}

  @Get('insurance-brackets')
  listInsuranceBrackets(@Query('status') status?: string) {
    const normalizedStatus = this.normalizeStatusFilter(status);
    return this.payrollConfigurationService.listInsuranceBrackets(
      normalizedStatus,
    );
  }

  @Get('insurance-brackets/:configId')
  getInsuranceBracket(@Param('configId') configId: string) {
    return this.payrollConfigurationService.getInsuranceBracket(configId);
  }

  @Patch('insurance-brackets/:configId')
  editInsuranceBracket(
    @Param('configId') configId: string,
    @Body() { payload }: UpdateInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.updateInsuranceBracket(
      configId,
      payload,
    );
  }

  @Patch('insurance-brackets/:configId/approve')
  approveInsuranceBracket(
    @Param('configId') configId: string,
    @Body() { approverId }: ApproveInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.approveInsuranceBracket(
      configId,
      approverId,
    );
  }

  @Patch('insurance-brackets/:configId/reject')
  rejectInsuranceBracket(
    @Param('configId') configId: string,
    @Body() { reviewerId }: RejectInsuranceBracketDto,
  ) {
    return this.payrollConfigurationService.rejectInsuranceBracket(
      configId,
      reviewerId,
    );
  }

  @Delete('insurance-brackets/:configId')
  deleteInsuranceBracket(@Param('configId') configId: string) {
    return this.payrollConfigurationService.deleteInsuranceBracket(configId);
  }

  private normalizeStatusFilter(
    rawStatus?: string,
  ): ConfigStatus | undefined {
    if (!rawStatus) {
      return undefined;
    }

    const lowerCased = rawStatus.toLowerCase();
    const allowedStatuses = Object.values(ConfigStatus);
    if (!allowedStatuses.includes(lowerCased as ConfigStatus)) {
      throw new BadRequestException(
        `Unsupported status filter "${rawStatus}". Allowed statuses: ${allowedStatuses.join(
          ', ',
        )}`,
      );
    }

    return lowerCased as ConfigStatus;
  }
}
